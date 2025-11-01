'use client';

import { useEffect, useState } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { activeChain } from '../lib/wagmi';
import { useI18n } from '../lib/i18n';

/**
 * 輕量網路偵測器：
 * - 只在錢包連線後運作
 * - 錯鏈時顯示提示與「一鍵切鏈」按鈕
 * - 不依賴 LanguageProvider 或 dictionary，避免型別互相卡死
 */
export default function NetworkWatcher() {
  const { t } = useI18n();
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync, isPending } = useSwitchChain();
  const targetId = activeChain.id;

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setShow(false);
      return;
    }
    setShow(chainId !== undefined && chainId !== targetId);
  }, [isConnected, chainId, targetId]);

  if (!show) return null;

  return (
    <div style={barStyle}>
      <div style={{ fontWeight: 600 }}>
        {t('wrongNetwork', 'Wrong network')}: {chainName(chainId)} → {chainName(targetId)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => switchChainAsync({ chainId: targetId })}
          disabled={isPending}
          style={btnPrimary}
        >
          {isPending ? t('switching', 'Switching...') : t('switchNow', 'Switch now')}
        </button>
        <button onClick={() => setShow(false)} style={btnGhost}>
          {t('dismiss', 'Dismiss')}
        </button>
      </div>
    </div>
  );
}

function chainName(id?: number) {
  if (!id && id !== 0) return 'Unknown';
  switch (id) {
    case 56: return 'BNB Chain';
    case 97: return 'BNB Testnet';
    case 1: return 'Ethereum';
    case 11155111: return 'Sepolia';
    default: return `Chain ${id}`;
  }
}

const barStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: 9999,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  padding: '12px 16px',
  background: 'rgba(255,69,0,0.12)',
  borderTop: '1px solid rgba(255,69,0,0.35)',
  backdropFilter: 'blur(6px)',
  color: '#fff'
};

const btnPrimary: React.CSSProperties = {
  background: '#00bfa5',
  border: 'none',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: 8,
  cursor: 'pointer'
};

const btnGhost: React.CSSProperties = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.35)',
  color: '#fff',
  padding: '8px 14px',
  borderRadius: 8,
  cursor: 'pointer'
};
