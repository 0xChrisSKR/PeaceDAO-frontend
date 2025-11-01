import Head from 'next/head'
import { useEffect, useState } from 'react'

function Nav(){
  return (
    <nav className="nav">
      <div className="logo">
        <img src="/logo.svg" alt="logo" onError={(e)=>{e.currentTarget.style.display='none'}}/>
        <span>PeaceDAO</span>
      </div>
      <div className="sp"/>
      <div className="tabs">
        <a href="/" className="active">Home</a>
        <a href="/whitepaper">Whitepaper</a>
      </div>
      <a className="btn" href="/whitepaper">Docs</a>
    </nav>
  )
}

function SocialBar({ community={} }){
  const entries = Object.entries(community).filter(([,v])=>!!v)
  const Icon = (name) => {
    const svg = {
      x:  <path d="M18.9 2h3.1l-7 8.1 8 11.9h-6.2l-4.8-6.9-5.5 6.9H3.4l7.5-8.9L3 2h6.4l4.3 6.2L18.9 2z"/>,
      telegram:<path d="M9.5 15.7l-.4 5.1c.6 0 .9-.3 1.2-.6l2.9-2.8 6 4.2c1.1.6 1.9.3 2.2-1l4.1-19.3c.4-1.7-.6-2.4-1.8-2L1.3 9.7C-.4 10.4-.4 11.3.9 11.7l5.7 1.8 13.3-8.3c.6-.4 1.1-.2.7.3"/>,
      discord: <path d="M20 4a18 18 0 00-4.5-1.4l-.2.5a16 16 0 00-6.6 0L8.5 2.6A18 18 0 004 4C1.5 7.5 1 11 1.2 14.4A18.4 18.4 0 008 18.2l.9-1.2a10.4 10.4 0 01-1.8-.9l.4-.3c3.4 1.6 7.1 1.6 10.6 0l.4.3c-.6.3-1.2.6-1.8.9l.9 1.2c3-.9 5.5-2.6 6.8-3.8C23 11 22.5 7.5 20 4z"/>,
      github:  <path d="M12 .5A11.5 11.5 0 000 12a11.5 11.5 0 008 10.9c.6.1.8-.2.8-.5v-2c-3.3.8-4-1.4-4-1.4-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.7 1.8-1.1.1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.7.1-3.5 0 0 1-.3 3.4 1.2a11.6 11.6 0 016.2 0C17 2.8 18 .5 18 .5c.6 1.8.2 3.2.1 3.5.8.9 1.2 2 1.2 3.3 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1 .8 2v3c0 .3.2.6.8.5A11.5 11.5 0 0024 12C24 5.6 18.6.5 12 .5z"/>,
      gitbook: <path d="M2 6.5L8.7 3l12.6 3.5-6.7 3.6L2 6.5zm0 3.6l12.6 3.6 6.7-3.6v6.8L14.6 21 2 17V10.1z"/>,
      cmc:     <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm5.6 12.5a3.6 3.6 0 01-7.1.6l-.5-2.2-1.2 3.6H7l2.1-6.4a1.1 1.1 0 012.1 0l1 4.3a1.6 1.6 0 003.2-.3V8.8h2.2z"/>,
      coingecko:<><circle cx="12" cy="12" r="10"/><circle cx="9.5" cy="10" r="1.7" fill="#0b0d10"/></>
    }[name] || <circle cx="12" cy="12" r="10"/>;
    return <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">{svg}</svg>;
  };
  if(!entries.length) return null;
  return (
    <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
      {entries.map(([k,href])=>(
        <a key={k} className="btn" href={href} target="_blank" rel="noreferrer">
          {Icon(k)}<span style={{textTransform:'capitalize'}}>{k}</span>
        </a>
      ))}
    </div>
  )
}

export default function Home(){
  const [cfg,setCfg]=useState(null)
  useEffect(()=>{ fetch('/api/peace/config').then(r=>r.json()).then(setCfg) },[])
  return (
    <>
      <Head>
        <title>PeaceDAO — On-chain Charity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Make World Peace Real — Every swap funds peace." />
        <meta property="og:title" content="PeaceDAO — On-chain Charity" />
        <meta property="og:description" content="Every swap funds peace. Transparent, auditable, unstoppable." />
        <meta property="og:image" content="/og-banner.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Nav/>

      <section className="hero">
        <div className="hero-wrap">
          <div>
            <h1 className="h-title">{cfg?.branding?.hero || 'Make World Peace Real — On-chain Charity'}</h1>
            <p className="lead">{cfg?.branding?.pitch || 'Every swap funds peace. Transparent, auditable, unstoppable.'}</p>
            <div style={{marginTop:16, display:'flex', gap:10, flexWrap:'wrap'}}>
              <a className="btn primary" href="/whitepaper">Read Whitepaper</a>
              <a className="btn ghost" href="#how">How it works</a>
            </div>
            <div className="hero-badge">
              <span className="chip">Verifier ≥ {(cfg?.thresholds?.verifier||15000).toLocaleString()}</span>
              <span className="chip">Fee {(cfg?.feeBps?.min??5)}–{(cfg?.feeBps?.max??40)} bps（預設 {(cfg?.feeBps?.default??25)}）</span>
              <span className="chip">LP 60 / Treasury 25 / Buyback 15</span>
            </div>
          </div>
          <div className="hero-art">
            {/* 有影片橫幅就放 /public/hero.mp4；沒有就用內建動態漸層 */}
            {/* <video autoPlay muted loop playsInline src="/hero.mp4" style={{width:'100%',height:'100%',objectFit:'cover'}}/> */}
            <div className="pulse"></div>
          </div>
        </div>
      </section>

      <main className="container">
        <div id="how" className="grid">
          <div className="card" style={{gridColumn:'span 6'}}>
            <h3>1) 透明國庫</h3>
            <p className="note">所有捐款與分潤統一進入 PeaceFund，多簽 + 時鎖，提款路徑公開。</p>
          </div>
          <div className="card" style={{gridColumn:'span 6'}}>
            <h3>2) 單一治理開關：手續費</h3>
            <p className="note">僅治理 Swap 手續費，範圍 {(cfg?.feeBps?.min??5)}–{(cfg?.feeBps?.max??40)} bps。聚焦可量化 KPI，避免投票疲勞。</p>
          </div>
          <div className="card" style={{gridColumn:'span 6'}}>
            <h3>3) 社群驗證</h3>
            <p className="note">Verifier ≥ {(cfg?.thresholds?.verifier||15000).toLocaleString()} 才能參與內容驗證與審核，杜絕垃圾。</p>
          </div>
          <div className="card" style={{gridColumn:'span 6'}}>
            <h3>4) 行動優先</h3>
            <p className="note">整站行動版優化、輕量無依賴，打開就快。</p>
          </div>
        </div>

        <div className="card" style={{marginTop:20}}>
          <h3>Official Links</h3>
          <p className="note" style={{marginBottom:10}}>下列連結從 <code>/api/peace/config</code> 自動載入：Website / X / Telegram / Discord / GitHub / GitBook / CMC / CoinGecko。</p>
          <SocialBar community={cfg?.community}/>
        </div>
      </main>

      <footer className="footer">© {new Date().getFullYear()} PeaceDAO — On-chain Charity</footer>
    </>
  )
}
