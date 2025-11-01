"use client";
import Nav from "@/components/Nav";
import { envSnapshot } from "@/lib/getEnv";
export default function DebugPage(){
  const snap = envSnapshot();
  return (
    <main style={{maxWidth:1100,margin:"0 auto"}}>
      <Nav />
      <div style={{padding:"18px 16px"}}>
        <h1 style={{fontSize:22,fontWeight:800,marginBottom:10}}>Debug / Env</h1>
        <div style={{border:"1px solid #333",borderRadius:8,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead>
              <tr><th style={{textAlign:"left",padding:"10px",borderBottom:"1px solid #333"}}>Key</th><th style={{textAlign:"left",padding:"10px",borderBottom:"1px solid #333"}}>Value</th></tr>
            </thead>
            <tbody>
              {Object.entries(snap).map(([k,v])=>(
                <tr key={k}>
                  <td style={{padding:"8px 10px",borderBottom:"1px dashed #333"}}>{k}</td>
                  <td style={{padding:"8px 10px",borderBottom:"1px dashed #333",wordBreak:"break-all"}}>{v ?? "(empty)"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{marginTop:10,fontSize:12,opacity:.8}}>到 Vercel → Project → Settings → Environment Variables 補值，重佈署後再看。</p>
      </div>
    </main>
  );
}
