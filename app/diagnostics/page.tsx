'use client';
const get = (k: string) => (process as any).env?.[k] ?? '(undefined)';
export default function Page() {
  const keys = [
    'NEXT_PUBLIC_WC_PROJECT_ID',
    'NEXT_PUBLIC_RPC_BSC',
    'NEXT_PUBLIC_PEACE_FUND',
    'NEXT_PUBLIC_PEACEDAO_CONFIG_PATH',
    'NEXT_PUBLIC_GOVERNANCE_API',
    'NEXT_PUBLIC_TOKEN',
    'NEXT_PUBLIC_TG_PUBLIC',
    'NEXT_PUBLIC_TG_VERIFIED',
  ];
  const vars = Object.fromEntries(keys.map(k => [k, get(k)]));
  return (
    <main style={{ padding: 24, fontFamily: 'ui-sans-serif,system-ui' }}>
      <h1>Diagnostics</h1>
      <p>這些不能是 (undefined)。</p>
      <pre>{JSON.stringify(vars, null, 2)}</pre>
      <p>Config JSON: <a href="/api/peace/config">/api/peace/config</a></p>
    </main>
  );
}
