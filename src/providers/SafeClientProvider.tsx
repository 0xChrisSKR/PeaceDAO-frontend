'use client';
import React from 'react';

function isClient() { return typeof window !== 'undefined'; }
function hasSafeEnv() {
  const pid = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';
  const rpc = process.env.NEXT_PUBLIC_RPC_BSC || '';
  // 沒有有效的 WalletConnect 專案ID或 RPC，就暫時跳過初始化以避免白屏
  return pid.length >= 8 && rpc.startsWith('http');
}

export default function SafeClientProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isClient()) return;
    // 避免某些庫在 SSR 期讀 localStorage
    try {
      // 這裡只做「必要參數檢查」，真正的 web3 / wallet 初始化交給使用到的頁面自行 lazy-load
      if (!hasSafeEnv()) {
        console.warn('[SafeClientProvider] Missing or placeholder envs. Skip wallet init.');
      }
      setReady(true);
    } catch (e: any) {
      console.error('[SafeClientProvider] init error:', e);
      setErr(e?.message ?? String(e));
      setReady(true);
    }
  }, []);

  if (!ready) return null;

  return (
    <>
      {err && (
        <div style={{background:'#291818',color:'#ffe2e2',padding:'8px 12px',fontSize:12}}>
          Client init warning: {err}
        </div>
      )}
      {children}
    </>
  );
}
