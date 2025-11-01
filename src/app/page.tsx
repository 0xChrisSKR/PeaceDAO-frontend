import Nav from "@/components/Nav";
import FundCard from "@/components/FundCard";
import GovernanceList from "@/components/GovernanceList";

export default function Home() {
  return (
    <main style={{maxWidth:1100,margin:"0 auto"}}>
      <Nav />
      <section style={{padding:"18px 16px"}}>
        <h1 style={{fontSize:34,fontWeight:900,marginBottom:6}}>WorldPeace DAO</h1>
        <p style={{opacity:.9,marginBottom:16}}>
          建立以代幣驗證為核心的社群治理：連結錢包、自動分級、解鎖聊天室與提案權限。以下為展示版 UI。
        </p>
        <div style={{display:"grid",gridTemplateColumns:"1.2fr .8fr",gap:16}}>
          <div><GovernanceList/></div>
          <div><FundCard/></div>
        </div>
      </section>
    </main>
  );
}
