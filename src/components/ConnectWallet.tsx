'use client';
import { useEffect, useState } from 'react';
import { connect, currentAccounts, chainIdHex, getProvider } from '@/lib/eth';
import { shortAddr } from '@/lib/format';

export default function ConnectWallet() {
  const [acct, setAcct] = useState<string>('');
  const [chain, setChain] = useState<string>('');
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const [id, accs] = await Promise.all([chainIdHex(), currentAccounts()]);
        setChain(id ?? '');
        setAcct(accs[0] ?? '');
      } catch (e: any) {
        setErr(e?.message || 'Wallet init failed');
      }
    })();

    const p = getProvider();
    const onAcc = (accs: string[]) => setAcct(accs[0] ?? '');
    const onChain = (id: string) => setChain(id);
    if (p?.on) {
      p.on('accountsChanged', onAcc);
      p.on('chainChanged', onChain);
      return () => {
        p.removeListener?.('accountsChanged', onAcc);
        p.removeListener?.('chainChanged', onChain);
      };
    }
  }, []);

  const handleConnect = async () => {
    setErr('');
    try {
      const accs = await connect();
      setAcct(accs[0] ?? '');
    } catch (e: any) {
      setErr(e?.message || 'Connect failed');
    }
  };

  const installed = typeof window !== 'undefined' && !!getProvider();

  return (
    <div className="flex flex-col gap-2">
      {acct ? (
        <div className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white">
          <span>已連線</span>
          <span className="font-mono">{shortAddr(acct)}</span>
          {chain && <span className="rounded bg-black/20 px-2 py-0.5 text-xs">chain {chain}</span>}
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500 active:scale-[.99]"
        >
          Connect Wallet
        </button>
      )}
      {!installed && <p className="text-sm text-red-400">No wallet found</p>}
      {err && <p className="text-sm text-red-400">{err}</p>}
    </div>
  );
}
