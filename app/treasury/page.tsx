'use client';

import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { formatEther } from 'viem';
import Nav from '../../src/components/Nav';
import { useI18n } from '../../src/lib/i18n';

// ✅ 這是你的和平基金金庫地址（請換成實際主網地址）
const PEACE_FUND = process.env.NEXT_PUBLIC_TREASURY_ADDRESS_BSC || '0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5';

export default function TreasuryPage() {
  const { t, lang, toggle } = useI18n();
  const client = usePublicClient();

  const [balance, setBalance] = useState<bigint>();
  const [block, setBlock] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!client) return;
      try {
        const b = await client.getBalance({ address: PEACE_FUND as `0x${string}` });
        const blk = await client.getBlockNumber();
        setBalance(b);
        setBlock(Number(blk));
      } catch (err) {
        console.error('Error fetching treasury data:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [client]);

  return (
    <main className="page">
      <Nav active="treasury" />
      <section className="content">
        <h1>{t('treasury')} / 世界和平基金</h1>
        <p>{t('onChain')}：</p>
        <div className="card">
          <p>📜 Address：<code>{PEACE_FUND}</code></p>
          <p>💰 {t('balance')}：{loading ? '讀取中...' : balance ? `${formatEther(balance)} BNB` : '無法取得'}</p>
          <p>⛓️ {t('lastBlock')}：{block ?? '讀取中...'}</p>
        </div>

        <div className="extra">
          <h2>📊 即時基金監控</h2>
          <p>透過區塊鏈 RPC 實時更新，未來將整合捐款紀錄、手續費分潤、自動治理與白皮書提案數據。</p>
        </div>

        <button onClick={toggle} style={{ marginTop: '2rem' }}>
          🌐 切換語言 / Switch to {lang === 'zh' ? 'English' : '中文'}
        </button>
      </section>

      <style jsx>{`
        .page {
          padding: 40px;
          max-width: 900px;
          margin: 0 auto;
          color: #eee;
          font-family: 'Inter', 'Noto Sans TC', sans-serif;
        }
        .content h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .card {
          background: rgba(255, 255, 255, 0.06);
          padding: 20px;
          border-radius: 10px;
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .extra {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        button {
          background: #00bfa5;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
        }
        button:hover {
          background: #009e8e;
        }
      `}</style>
    </main>
  );
}
