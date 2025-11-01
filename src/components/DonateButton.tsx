'use client';
import { useState } from 'react';
import { sendBNB } from '@/lib/eth';
const TREASURY = process.env.NEXT_PUBLIC_TREASURY || '0x000000000000000000000000000000000000dEaD';

export default function DonateButton() {
  const [tx, setTx] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const onDonate = async () => {
    setErr(''); setTx(''); setLoading(true);
    try {
      const value = BigInt('100000000000000'); // 0.0001 BNB
      const hash = await sendBNB(TREASURY, value);
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
        {loading ? 'Sending…' : 'Donate 0.0001 BNB'}
      </button>
      {tx && <div className="text-xs text-emerald-400 break-all">TX Hash: {tx}</div>}
      {err && <div className="text-xs text-red-400">{err}</div>}
      <div className="text-[12px] text-white/60">所有捐款僅收 <b className="text-yellow-300">BNB</b>，自動送往金庫地址（可於環境變數 NEXT_PUBLIC_TREASURY 設定）。</div>
    </div>
  );
}
