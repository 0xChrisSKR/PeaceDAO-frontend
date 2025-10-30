'use client';

const pick = (k: string) => (process as any).env?.[k] ?? '(undefined)';

export default function Page() {
  const vars = [
    'NEXT_PUBLIC_WC_PROJECT_ID',
    'NEXT_PUBLIC_RPC_BSC',
    'NEXT_PUBLIC_PEACE_FUND',
    'NEXT_PUBLIC_PEACEDAO_CONFIG_PATH',
    'NEXT_PUBLIC_GOVERNANCE_API',
    'NEXT_PUBLIC_TOKEN',
    'NEXT_PUBLIC_TG_PUBLIC',
    'NEXT_PUBLIC_TG_VERIFIED',
  ].reduce((acc: any, k) => (acc[k] = pick(k), acc), {});

  return (
    <main style={{ padding: 24, fontFamily: 'ui-sans-serif,system-ui' }}>
      <h1>Diagnostics</h1>
      <p>Check these are not "(undefined)".</p>
      <pre>{JSON.stringify(vars, null, 2)}</pre>
      <p>Config JSON: <a href="/api/peace/config">/api/peace/config</a></p>
    </main>
  );
}
