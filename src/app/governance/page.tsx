import Nav from "@/components/Nav";
import GovernanceList from "@/components/GovernanceList";
export default function GovernancePage(){
  return (
    <main style={{maxWidth:1100,margin:"0 auto"}}>
      <Nav />
      <div style={{padding:"18px 16px"}}>
        <GovernanceList/>
      </div>
    </main>
  );
}
