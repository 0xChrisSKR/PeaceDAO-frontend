'use client';
import { useEffect, useState } from 'react';
import { currentAccounts, getBalance } from '@/lib/eth';
import { formatEth } from '@/lib/format';

export default function AddressBalance() {
  const [addr, setAddr] = useState<string>('');
  const [wei, setWei] = useState<bigint | null>(null);
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const accs = await currentAccounts();
        const a = accs[0];
        if (!a) return;
        setAddr(a);
        const b = await getBalance(a);
        setWei(b);
      } catch (e: any) {
        setErr(e?.message || 'balance failed');
      }
    })();
  }, []);

  if (!addr) return null;
  return (
    <div className="rounded-lg bg-white/5 p-4 text-sm">
      <div className="opacity-70">你的錢包餘額</div>
      <div className="mt-1 text-2xl font-semibold">{wei === null ? '—' : `${formatEth(wei)} ETH`}</div>
      {err && <div className="mt-1 text-red-400">{err}</div>}
    </div>
  );
}
