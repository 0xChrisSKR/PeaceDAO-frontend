import Nav from "@/components/Nav";
import GovernanceDetail from "@/components/GovernanceDetail";
type Params = { params: { id: string } };
export default function ProposalDetailPage({ params }: Params){
  return (
    <main style={{maxWidth:1100,margin:"0 auto"}}>
      <Nav />
      <GovernanceDetail id={params.id}/>
    </main>
  );
}
