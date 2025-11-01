// app/whitepaper/page.tsx
import { peaceConfig as cfg } from '../../lib/peaceConfig';

export default function Whitepaper() {
  const links = Object.entries(cfg.community).filter(([, v]) => !!v) as [keyof typeof cfg.community, string][];

  return (
    <>
      <nav className="nav">
        <div className="logo">
          <img src="/logo.svg" alt="logo"/><span>PeaceDAO</span>
        </div>
        <div className="sp"/>
        <div className="tabs">
          <a href="/">Home</a>
          <a href="/whitepaper" className="active">Whitepaper</a>
        </div>
        <a className="btn" href="/">Home</a>
      </nav>

      <main className="container">
        <header className="hero" style={{border:'none'}}>
          <div className="hero-wrap" style={{padding:'24px 0'}}>
            <div>
              <h1 className="h-title">PeaceDAO Whitepaper</h1>
              <p className="lead">{cfg.branding.pitch}</p>
            </div>
          </div>
        </header>

        <section className="card" style={{marginBottom:18}}>
          <h2>社群 & 上架連結</h2>
          <p className="note">（資料源自 <code>/config</code>，與前端同步）</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:10, marginTop:10}}>
            {links.map(([k,href])=>(
              <a key={String(k)} className="btn" href={href} target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
                <span style={{textTransform:'capitalize',marginLeft:6}}>{String(k)}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="card" style={{marginBottom:18}}>
          <h2>治理門檻</h2>
          <ul className="note">
            <li>Proposer ≥ {cfg.thresholds.proposer.toLocaleString()} {cfg.tokenDisplay}</li>
            <li>Voter ≥ {cfg.thresholds.voter.toLocaleString()} {cfg.tokenDisplay}</li>
            <li><b>Verifier ≥ {cfg.thresholds.verifier.toLocaleString()} {cfg.tokenDisplay}</b></li>
          </ul>
        </section>

        <section className="card" style={{marginBottom:18}}>
          <h2>手續費治理</h2>
          <p className="note">
            範圍 {cfg.feeBps.min}–{cfg.feeBps.max} bps（預設 {cfg.feeBps.default} bps）；Timelock 延遲生效。<br/>
            建議分配：LP 60% / Treasury 25% / Buyback &amp; Burn 15%。
          </p>
        </section>

        <section className="card" style={{marginBottom:18}}>
          <h2>Treasury</h2>
          <p className="note">Network：{cfg.treasury.network}，PeaceFund：<span className="mono">{cfg.treasury.fundAddress}</span></p>
        </section>

        <footer className="footer">© {new Date().getFullYear()} PeaceDAO — Whitepaper (auto-sync)</footer>
      </main>
    </>
  );
}
