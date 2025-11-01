"use client";
import Nav from "@/components/Nav";
import FundCard from "@/components/FundCard";
import { usePeaceFundAddress } from "@/hooks/usePeaceFundAddress";
export default function DonatePage(){
  const { address } = usePeaceFundAddress();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert("已複製捐贈地址");
    } catch {}
  };
  return (
    <main style={{maxWidth:1100,margin:"0 auto"}}>
      <Nav />
      <div style={{padding:"18px 16px",display:"grid",gap:16,gridTemplateColumns:"1fr 1fr"}}>
        <FundCard/>
        <section style={{border:"1px solid #333",borderRadius:12,padding:16}}>
          <h3 style={{fontSize:18,fontWeight:800,marginBottom:6}}>捐贈方式</h3>
          <p style={{opacity:.9,marginBottom:8}}>將資金匯入上方地址（此頁展示用，不會送交易）。</p>
          <div style={{display:"flex",gap:8}}>
            <button onClick={copy} style={{padding:"6px 10px",border:"1px solid #444",borderRadius:8,background:"#151515"}}>複製地址</button>
            <span style={{fontSize:12,opacity:.7}}>QR 於正式版提供</span>
          </div>
        </section>
      </div>
    </main>
  );
}
