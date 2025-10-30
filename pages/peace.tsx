import Link from 'next/link';

const Logo = () => (
  <svg width="140" height="140" viewBox="0 0 140 140" role="img" aria-label="World Peace DAO logo">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00D1FF"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <circle cx="70" cy="70" r="66" fill="none" stroke="url(#g)" strokeWidth="8"/>
    <path d="M70 20v100M20 70h100" stroke="url(#g)" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);

export default function Peace() {
  return (
    <main style={{minHeight:'100vh',padding:'40px 24px',fontFamily:'Inter, ui-sans-serif, system-ui',background:'linear-gradient(180deg,#0b0f19 0%,#111827 100%)',color:'#fff'}}>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <Logo />
        <div>
          <h1 style={{margin:0,fontSize:28,fontWeight:700}}>World Peace DAO</h1>
          <p style={{margin:'8px 0 0',opacity:.8}}>On-chain donations · Treasury · Governance</p>
        </div>
      </div>

      <section style={{marginTop:24}}>
        <p>Quick links:</p>
        <ul style={{lineHeight:1.8}}>
          <li><Link href="/minimal">/minimal</Link></li>
          <li><Link href="/diagnostics">/diagnostics</Link></li>
          {/* API 路由用 <a> 直接開啟新分頁 */}
          <li><a href="/api/peace/config" target="_blank" rel="noreferrer">/api/peace/config</a></li>
        </ul>
      </section>
    </main>
  );
}
