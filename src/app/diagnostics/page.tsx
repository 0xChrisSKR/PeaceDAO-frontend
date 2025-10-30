export const dynamic = 'force-static';

function getPublicEnv() {
  const allowedPrefix = 'NEXT_PUBLIC_';
  return Object.entries(process.env)
    .filter(([k]) => k.startsWith(allowedPrefix))
    .map(([k, v]) => [k, String(v ?? '')])
    .sort(([a], [b]) => a.localeCompare(b));
}

export default function DiagnosticsPage() {
  const env = getPublicEnv();
  return (
    <>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Diagnostics</h1>
      <div className="card">
        {env.length === 0 ? <p className="small">No NEXT_PUBLIC_* variables.</p> : (
          <ul style={{margin:0, paddingLeft:18}}>
            {env.map(([k, v]) => (<li key={k} style={{margin:'6px 0'}}><code>{k}</code> = <code>{v}</code></li>))}
          </ul>
        )}
      </div>
      <p style={{marginTop:12}}><a className="btn" href="/api/peace/config" target="_blank" rel="noreferrer">Open /api/peace/config</a></p>
    </>
  );
}
