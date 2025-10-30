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
      <h1 style={{fontSize: 32, fontWeight: 700, marginBottom: 12}}>Diagnostics</h1>
      <p>Public env variables (NEXT_PUBLIC_* only):</p>
      <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16, marginTop: 12}}>
        {env.length === 0 ? <p style={{opacity: .7}}>No NEXT_PUBLIC_* variables.</p> : (
          <ul>{env.map(([k, v]) => (<li key={k} style={{margin: '6px 0'}}><code>{k}</code> = <code>{v}</code></li>))}</ul>
        )}
      </div>
      <p style={{marginTop: 16}}><a href="/api/peace/config">Open /api/peace/config</a></p>
    </>
  );
}
