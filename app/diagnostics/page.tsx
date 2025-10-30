export default async function Diagnostics() {
  const [health, config] = await Promise.all([
    fetch("/api/health", { cache: 'no-store' }).then(r=>r.json()),
    fetch("/api/peace/config", { cache: 'no-store' }).then(r=>r.json()),
  ]);
  return (
    <main style={{padding:24}}>
      <h1>Diagnostics</h1>
      <h2>Health</h2>
      <pre>{JSON.stringify(health, null, 2)}</pre>
      <h2>Config</h2>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </main>
  );
}
