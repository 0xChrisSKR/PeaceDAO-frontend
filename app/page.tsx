// app/page.tsx
'use client';
import { peaceConfig as cfg } from '../lib/peaceConfig';
import Nav from '../src/components/Nav';
import PriceChart from '../src/components/PriceChart';
import { useI18n } from '../src/lib/i18n';

export default function Home() {
  const { t, lang, toggle } = useI18n();
  const links = Object.entries(cfg.community).filter(([, v]) => !!v) as [keyof typeof cfg.community, string][];

  return (
    <>
      <Nav />
      <section className="hero">
        <div className="hero-wrap">
          <div>
            <h1 className="h-title">{t('heroTitle', cfg.branding.hero)}</h1>
            <p className="lead">{t('heroPitch', cfg.branding.pitch)}</p>
            <div style={{marginTop:16, display:'flex', gap:10, flexWrap:'wrap'}}>
              <a className="btn primary" href="/whitepaper">{t('readWhitepaper','Read Whitepaper')}</a>
              <a className="btn" href="/donate">{t('donate','Donate')}</a>
              <a className="btn" href="/treasury">{t('treasury','Treasury')}</a>
              <button className="btn ghost" onClick={toggle}>{lang==='zh'?'EN':'中文'}</button>
            </div>
            <div className="hero-badge">
              <span className="chip">{cfg.tokenDisplay}</span>
              <span className="chip">{t('verifier','Verifier')} ≥ {cfg.thresholds.verifier.toLocaleString()}</span>
              <span className="chip">{t('fee','Fee')} {cfg.feeBps.min}–{cfg.feeBps.max} bps ({t('default','default')} {cfg.feeBps.default})</span>
            </div>
          </div>
          <div className="hero-art"><div className="pulse"/></div>
        </div>
      </section>

      <main className="container">
        <div className="card" style={{marginBottom:20}}>
          <h3>{t('price','Price')}</h3>
          <PriceChart />
        </div>

        <div className="card">
          <h3>{t('officialLinks','Official Links')}</h3>
          <p className="note">{t('linksHint','Website / X / TG / Discord / GitHub / GitBook / CMC / CoinGecko')}</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
            {links.map(([k,href])=>(
              <a key={String(k)} className="btn" href={href} target="_blank" rel="noreferrer">
                <span style={{textTransform:'capitalize'}}>{String(k)}</span>
              </a>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">© {new Date().getFullYear()} PeaceDAO — On-chain Charity</footer>
    </>
  );
}
