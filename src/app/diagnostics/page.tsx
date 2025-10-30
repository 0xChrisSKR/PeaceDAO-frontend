'use client';

const vars = {
  NEXT_PUBLIC_WC_PROJECT_ID: process.env.NEXT_PUBLIC_WC_PROJECT_ID,
  NEXT_PUBLIC_RPC_BSC: process.env.NEXT_PUBLIC_RPC_BSC,
  NEXT_PUBLIC_PEACE_FUND: process.env.NEXT_PUBLIC_PEACE_FUND,
  NEXT_PUBLIC_PEACEDAO_CONFIG_PATH: process.env.NEXT_PUBLIC_PEACEDAO_CONFIG_PATH,
  NEXT_PUBLIC_GOVERNANCE_API: process.env.NEXT_PUBLIC_GOVERNANCE_API,
};

export default function Page() {
  return (
    <main style={{padding:'24px',fontFamily:'ui-sans-serif,system-ui'}}>
      <h1>Diagnostics</h1>
      <pre>{JSON.stringify(vars, null, 2)}</pre>
    </main>
  );
}
