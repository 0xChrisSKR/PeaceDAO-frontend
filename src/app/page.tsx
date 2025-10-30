import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="card" style={{padding: '24px 20px', marginTop: 12}}>
        <h1 style={{fontSize: 40, fontWeight: 800, margin: 0, letterSpacing: .2}}>World Peace DAO</h1>
        <p className="small" style={{marginTop: 10, maxWidth: 720}}>
          Composable governance, transparent treasury, community-led donations — now scaffolded with a stable Next.js app router.
        </p>
        <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop: 14}}>
          <Link className="btn" href="/home">Open Dashboard</Link>
          <Link className="btn" href="/treasury">View Treasury</Link>
          <Link className="btn" href="/governance">Governance</Link>
          <Link className="btn" href="/donate">Donate</Link>
          <a className="btn" href="/api/peace/config" target="_blank" rel="noreferrer">API Config</a>
        </div>
      </section>
    </>
  );
}
