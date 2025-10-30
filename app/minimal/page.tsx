export default function Page() {
  return (
    <main style={{padding:'24px',fontFamily:'ui-sans-serif,system-ui'}}>
      <h1>Minimal OK</h1>
      <ul>
        <li><a href="/api/health">/api/health</a></li>
        <li><a href="/config">/config</a></li>
        <li><a href="/diagnostics">/diagnostics</a></li>
      </ul>
    </main>
  );
}
