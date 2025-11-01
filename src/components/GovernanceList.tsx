"use client";
import Link from "next/link";
import { proposals } from "@/mock/data";

const statusColor: Record<string,string> = {
  Active:"#2dd4bf", Pending:"#f59e0b", Succeeded:"#22c55e", Defeated:"#ef4444"
};

export default function GovernanceList() {
  return (
    <section>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
        <h3 style={{fontSize:20,fontWeight:800}}>治理提案</h3>
        <Link href="/governance" style={{fontSize:14,opacity:.9,textDecoration:"underline"}}>查看全部</Link>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        {proposals.map(p=>(
          <Link key={p.id} href={`/governance/${p.id}`} style={{border:"1px solid #333",borderRadius:12,padding:14,textDecoration:"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <div style={{fontWeight:800}}>{p.title}</div>
              <span style={{fontSize:12,padding:"2px 8px",borderRadius:999,background:statusColor[p.status] ?? "#444",color:"#000",fontWeight:800}}>
                {p.status}
              </span>
            </div>
            <div style={{fontSize:12,opacity:.85,marginBottom:8}}>作者：{p.author}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,fontSize:12}}>
              <div>贊成 {p.forPct}%</div>
              <div>反對 {p.againstPct}%</div>
              <div>棄權 {p.abstainPct}%</div>
            </div>
            <div style={{fontSize:12,opacity:.7,marginTop:6}}>投票：{p.start} → {p.end}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
