"use client";
import { proposals } from "@/mock/data";
import Link from "next/link";
export default function GovernanceDetail({ id }: { id: string }) {
  const p = proposals.find(x=>x.id===id);
  if (!p) return <div style={{padding:16}}>找不到提案，<Link href="/governance">回列表</Link></div>;
  const Gauge = ({label,val}:{label:string;val:number}) => (
    <div style={{marginBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,opacity:.9}}>
        <span>{label}</span><span>{val}%</span>
      </div>
      <div style={{height:8,background:"#222",borderRadius:999,overflow:"hidden"}}>
        <div style={{height:8,width:`${val}%`,background:"#f1f5f9"}}/>
      </div>
    </div>
  );
  return (
    <main style={{padding:16,display:"grid",gap:16,maxWidth:900,margin:"0 auto"}}>
      <Link href="/governance" style={{opacity:.8,textDecoration:"underline"}}>← 返回治理</Link>
      <h1 style={{fontSize:28,fontWeight:900}}>{p.title}</h1>
      {p.feeBps!==undefined && (
        <div style={{opacity:.9}}>（本提案涉及 Swap 費率：<b>{p.feeBps} bps</b>）</div>
      )}
      <div style={{fontSize:12,opacity:.8}}>作者 {p.author}｜{p.start} → {p.end}｜狀態 {p.status}</div>
      <article style={{whiteSpace:"pre-wrap",lineHeight:1.8,opacity:.95}}>{p.content}</article>
      <section style={{border:"1px solid #333",borderRadius:12,padding:16}}>
        <h3 style={{fontSize:18,fontWeight:800,marginBottom:8}}>投票概況</h3>
        <Gauge label="贊成" val={p.forPct}/>
        <Gauge label="反對" val={p.againstPct}/>
        <Gauge label="棄權" val={p.abstainPct}/>
        <div style={{fontSize:12,opacity:.8,marginTop:6}}>法定門檻（Quorum）：{p.quorumPct}%</div>
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <button disabled title="展示模式，按鈕停用" style={{padding:"8px 12px",border:"1px solid #444",borderRadius:8,opacity:.6}}>贊成</button>
          <button disabled title="展示模式，按鈕停用" style={{padding:"8px 12px",border:"1px solid #444",borderRadius:8,opacity:.6}}>反對</button>
          <button disabled title="展示模式，按鈕停用" style={{padding:"8px 12px",border:"1px solid #444",borderRadius:8,opacity:.6}}>棄權</button>
        </div>
      </section>
    </main>
  );
}
