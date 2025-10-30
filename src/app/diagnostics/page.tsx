'use client';
import React from 'react';

const PUBLIC_ENV = {
  NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
  NEXT_PUBLIC_RPC_HTTP: process.env.NEXT_PUBLIC_RPC_HTTP,
  NEXT_PUBLIC_DONATION_ADDRESS: process.env.NEXT_PUBLIC_DONATION_ADDRESS,
  NEXT_PUBLIC_TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS,
  NEXT_PUBLIC_GOVERNANCE_ADDRESS: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS,
};

export default function DiagnosticsPage() {
  const [cfg, setCfg] = React.useState<any>(null);
  const [err, setErr] = React.useState<string>('');

  React.useEffect(() => {
    fetch('/api/peace/config')
      .then(r => r.json())
      .then(setCfg)
      .catch(e => setErr(String(e)));
  }, []);

  return (
    <main style={{maxWidth:980, margin:'40px auto', padding:'0 20px', color:'#eee'}}>
      <h1 style={{fontSize:24, fontWeight:700}}>Diagnostics</h1>

      <h3 style={{marginTop:16}}>Build-time public env (NEXT_PUBLIC_*)</h3>
      <pre style={{background:'#0b0b0b', border:'1px solid #333', padding:12, borderRadius:12}}>
{JSON.stringify(PUBLIC_ENV, null, 2)}
      </pre>

      <h3 style={{marginTop:16}}>/api/peace/config</h3>
      <pre style={{background:'#0b0b0b', border:'1px solid #333', padding:12, borderRadius:12}}>
{JSON.stringify(cfg ?? { error: err || null }, null, 2)}
      </pre>
    </main>
  );
}
