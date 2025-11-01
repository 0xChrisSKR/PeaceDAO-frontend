// app/donate/page.tsx
'use client';
import Nav from '../../src/components/Nav';
import { useI18n } from '../../src/lib/i18n';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { useState } from 'react';
import { peaceConfig as cfg } from '../../lib/peaceConfig';

export default function Donate() {
  const { t } = useI18n();
  const { address: user } = useAccount();
  const [amt, setAmt] = useState('0.01');
  const to = process.env.NEXT_PUBLIC_PEACE_FUND || cfg.treasury.fundAddress;
  const { sendTransaction, isPending } = useSendTransaction();

  return (
    <>
      <Nav active="donate" />
      <main className="container">
        <div className="card">
          <h1 className="h-title">{t('donate','Donate')} / 捐款</h1>
          <p className="note">{t('donateDesc','Send native token directly to the Peace Fund (on-chain).')}</p>
          <div style={{display:'flex', gap:12, marginTop:10}}>
            <input value={amt} onChange={(e)=>setAmt(e.target.value)} className="btn" style={{minWidth:120}} />
            <button
              className="btn primary"
              disabled={!user || isPending}
              onClick={() => sendTransaction({ to: to as `0x${string}`, value: parseEther(amt) })}
            >
              {isPending ? t('sending','Sending...') : t('send','Send')}
            </button>
          </div>
          <p className="note" style={{marginTop:10}}>PeaceFund: <span className="mono">{to}</span></p>
        </div>
      </main>
    </>
  );
}
