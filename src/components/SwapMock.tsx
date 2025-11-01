"use client";
export default function SwapMock() {
  return (
    <section style={{border:"1px solid #333",borderRadius:16,padding:16,width:"100%",maxWidth:480,margin:"0 auto"}}>
      <h3 style={{fontSize:20,fontWeight:900,marginBottom:12}}>Swap（展示，停用）</h3>
      <div style={{display:"grid",gap:10}}>
        <label style={{opacity:.85,fontSize:12}}>From</label>
        <input disabled placeholder="0.0" style={{padding:"10px 12px",border:"1px solid #444",borderRadius:10,background:"#111"}}/>
        <label style={{opacity:.85,fontSize:12}}>To</label>
        <input disabled placeholder="0.0" style={{padding:"10px 12px",border:"1px solid #444",borderRadius:10,background:"#111"}}/>
      </div>
      <div style={{marginTop:12,fontSize:12,opacity:.8}}>
        費率（展示）：0.25%（來源：治理提案）
      </div>
      <button disabled title="展示模式，不可操作"
        style={{marginTop:14,width:"100%",padding:"12px 14px",border:"1px solid #444",borderRadius:10,opacity:.6}}>
        Swap
      </button>
    </section>
  );
}
