/**
 * Server Component diagnostics page
 * - 不用 "use client"
 * - 只顯示 NEXT_PUBLIC_* 變數，避免洩露機密
 * - 不在客戶端觸碰 process
 */
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
    <main style={{maxWidth: 840, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'}}>
      <h1 style={{fontSize: 32, fontWeight: 700, marginBottom: 16}}>Diagnostics</h1>
      <p style={{marginBottom: 8}}>Public environment variables (NEXT_PUBLIC_* only):</p>
      <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 16}}>
        {env.length === 0 ? (
          <p style={{opacity: .7}}>No NEXT_PUBLIC_* variables detected.</p>
        ) : (
          <ul>
            {env.map(([k, v]) => (
              <li key={k} style={{margin: '6px 0'}}><code>{k}</code> = <code>{v}</code></li>
            ))}
          </ul>
        )}
      </div>

      <div style={{marginTop: 24}}>
        <a href="/api/peace/config" style={{textDecoration: 'underline'}}>Open /api/peace/config</a>
      </div>
    </main>
  );
}
