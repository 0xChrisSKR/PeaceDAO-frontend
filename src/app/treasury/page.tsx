'use client';
import React from 'react';
async function load() { return fetch('/api/peace/treasury').then(r=>r.json()); }
export default function TreasuryPage(){
  const [data,setData]=React.useState<any>(null);
  const [err,setErr]=React.useState<string>('');
  React.useEffect(()=>{ load().then(setData).catch(e=>setErr(String(e))) },[]);
  return (
    <main style={{maxWidth:980, margin:'40px auto', padding:'0 20px', color:'#eee'}}>
      <h1 style={{fontSize:24,fontWeight:700}}>Treasury</h1>
      <section style={{marginTop:16, padding:16, border:'1px solid #333', borderRadius:12, background:'#0b0b0b'}}>
        <p>Treasury address (env): <b>{data?.address || '(not set)'}</b></p>
        <pre style={{marginTop:12}}>{JSON.stringify(data ?? { error: err || null }, null, 2)}</pre>
      </section>
    </main>
  );
}
