// app/whitepaper/page.tsx
'use client';
import { peaceConfig as cfg } from '../../lib/peaceConfig';
import Nav from '../../src/components/Nav';
import { useI18n } from '../../src/lib/i18n';

export default function Whitepaper() {
  const { t } = useI18n();
  return (
    <>
      <Nav active="whitepaper" />
      <main className="container">
        <div className="card">
          <h1 className="h-title">PeaceDAO {t('whitepaper','Whitepaper')}</h1>
          <p className="note">{cfg.branding.pitch}</p>
        </div>

        <section className="card">
          <h2>{t('governanceThresholds','Governance Thresholds')} / 治理門檻</h2>
          <ul className="note">
            <li>Proposer ≥ {cfg.thresholds.proposer.toLocaleString()} {cfg.tokenDisplay}</li>
            <li>Voter ≥ {cfg.thresholds.voter.toLocaleString()} {cfg.tokenDisplay}</li>
            <li><b>Verifier ≥ {cfg.thresholds.verifier.toLocaleString()} {cfg.tokenDisplay}</b></li>
          </ul>
        </section>

        <section className="card">
          <h2>{t('feeGov','Fee Governance')} / 手續費治理</h2>
          <p className="note">
            {t('feeRange','Range')} {cfg.feeBps.min}–{cfg.feeBps.max} bps（{t('default','default')} {cfg.feeBps.default} bps）；Timelock 延遲生效。<br/>
            {t('suggestedSplit','Suggested split')}: LP 60% / Treasury 25% / Buyback & Burn 15%.
          </p>
        </section>

        <section className="card">
          <h2>Treasury / 國庫</h2>
          <p className="note">Network：{cfg.treasury.network}，PeaceFund：<span className="mono">{cfg.treasury.fundAddress}</span></p>
          <a className="btn" href="/treasury">{t('viewTreasury','View Treasury')}</a>
        </section>

        <section className="card">
          <h2>{t('socialAndListings','Community & Listings')}</h2>
          <ul className="note">
            <li>Website：{cfg.community.website}</li>
            <li>X：{cfg.community.x}</li>
            <li>Telegram：{cfg.community.telegram}</li>
            <li>CMC：{cfg.community.cmc}</li>
            <li>CoinGecko：{cfg.community.coingecko}</li>
          </ul>
        </section>
      </main>
    </>
  );
}
