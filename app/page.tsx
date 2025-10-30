export default function Home() {
  return (
    <main style={{padding:24}}>
      <h1>Minimal OK</h1>
      <ul>
        <li><a href="/api/health">/api/health</a></li>
        <li><a href="/api/peace/config">/api/peace/config</a></li>
        <li><a href="/diagnostics">/diagnostics</a></li>
      </ul>
    </main>
  );
}
