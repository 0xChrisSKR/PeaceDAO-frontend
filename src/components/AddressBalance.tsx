'use client';
import { useEffect, useState } from 'react';
import { accounts, getBalance } from '@/lib/eth';
import { formatBNB } from '@/lib/format';

export default function AddressBalance() {
  const [addr, setAddr] = useState<string>('');
  const [wei, setWei] = useState<bigint | null>(null);
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const accs = await accounts();
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
      <div className="opacity-70">你的 BNB 餘額</div>
      <div className="mt-1 text-2xl font-semibold">{wei === null ? '—' : `${formatBNB(wei)} BNB`}</div>
      {err && <div className="mt-1 text-red-400">{err}</div>}
    </div>
  );
}
