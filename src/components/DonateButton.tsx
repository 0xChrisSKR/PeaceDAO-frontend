'use client';
import { useState } from 'react';
import { sendDonation } from '@/lib/eth';

const DONATION_WEI = BigInt('100000000000000'); // 0.0001 ETH

export default function DonateButton({ to }: { to: string }) {
  const [tx, setTx] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onDonate = async () => {
    setErr(''); setTx(''); setLoading(true);
    try {
      const hash = await sendDonation(to, DONATION_WEI);
      setTx(hash);
    } catch (e: any) {
      setErr(e?.message || 'tx failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        disabled={loading}
        onClick={onDonate}
        className="rounded-md bg-amber-500 px-4 py-2 text-black hover:bg-amber-400 disabled:opacity-60"
      >
        {loading ? 'Sending…' : 'Donate 0.0001 ETH'}
      </button>
      {tx && <a className="text-xs text-emerald-400 break-all" href={`https://etherscan.io/tx/${tx}`} target="_blank">TX: {tx}</a>}
      {err && <div className="text-xs text-red-400">{err}</div>}
    </div>
  );
}
