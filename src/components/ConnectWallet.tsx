'use client';
import { useEffect, useState } from 'react';
import { accounts, chainIdHex, connectBsc } from '@/lib/eth';
import { shortAddr } from '@/lib/format';
import { BSC } from '@/lib/chain';

export default function ConnectWallet() {
  const [acct, setAcct] = useState<string>('');
  const [chain, setChain] = useState<string>('');
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const [cid, accs] = await Promise.all([chainIdHex(), accounts()]);
        setChain(cid ?? '');
        setAcct(accs[0] ?? '');
      } catch (e: any) {
        setErr(e?.message || 'init failed');
      }
    })();
  }, []);

  const onConnect = async () => {
    setErr('');
    try {
      const accs = await connectBsc();
      setAcct(accs[0] ?? '');
      const cid = await chainIdHex();
      setChain(cid ?? '');
    } catch (e: any) {
      setErr(e?.message || 'connect failed');
    }
  };

  const onWrong = chain && chain.toLowerCase() !== BSC.chainIdHex;

  return (
    <div className="flex flex-col gap-2">
      {acct ? (
        <div className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white">
          <span>已連線</span>
          <span className="font-mono">{shortAddr(acct)}</span>
          <span className={`rounded px-2 py-0.5 text-xs ${onWrong ? 'bg-red-500/30' : 'bg-black/20'}`}>
            chain {chain}
          </span>
        </div>
      ) : (
        <button onClick={onConnect} className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500">
          連線 BSC 錢包（BNB）
        </button>
      )}
      {onWrong && <p className="text-xs text-red-400">請切換至 BNB Smart Chain (56)。</p>}
      {err && <p className="text-xs text-red-400">{err}</p>}
      <p className="text-xs text-white/60">本站<strong className="text-yellow-300">只接受 BNB</strong> 作為捐款及結算資產。</p>
    </div>
  );
}
