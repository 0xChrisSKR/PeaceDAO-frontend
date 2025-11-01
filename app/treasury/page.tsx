// app/treasury/page.tsx
'use client';
import Nav from '../../src/components/Nav';
import { useI18n } from '../../src/lib/i18n';
import { usePublicClient } from 'wagmi';
import { formatEther } from 'viem';
import { useEffect, useState } from 'react';
import { peaceConfig as cfg } from '../../lib/peaceConfig';

export default function Treasury() {
  const { t } = useI18n();
  const client = usePublicClient();
  const [bal, setBal] = useState<string>('-');
  const [block, setBlock] = useState<string>('-');

  const addr = process.env.NEXT_PUBLIC_PEACE_FUND || cfg.treasury.fundAddress;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [b, h] = await Promise.all([
          client.getBalance({ address: addr as `0x${string}` }),
          client.getBlockNumber(),
        ]);
        if (!mounted) return;
        setBal(Number(formatEther(b)).toLocaleString());
        setBlock(h.toString());
      } catch {
        if (!mounted) return;
        setBal('N/A'); setBlock('N/A');
      }
    })();
    return () => { mounted = false; };
  }, [addr, client]);

  return (
    <>
      <Nav active="treasury" />
      <main className="container">
        <div className="card">
          <h1 className="h-title">Treasury / 國庫</h1>
          <p className="note">PeaceFund: <span className="mono">{addr}</span></p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',gap:16, marginTop:10}}>
            <div className="card" style={{gridColumn:'span 4'}}>
              <h3>{t('balance','Balance')}</h3>
              <div style={{fontSize:28, fontWeight:700}}>{bal} {t('native','Native')}</div>
              <p className="note">{t('onChain','On-chain via RPC')}</p>
            </div>
            <div className="card" style={{gridColumn:'span 4'}}>
              <h3>{t('lastBlock','Last Block')}</h3>
              <div style={{fontSize:28, fontWeight:700}}>{block}</div>
              <p className="note">{cfg.treasury.network}</p>
            </div>
            <div className="card" style={{gridColumn:'span 4'}}>
              <h3>{t('donate','Donate')}</h3>
              <a className="btn primary" href="/donate">{t('goDonate','Go to Donate')}</a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
