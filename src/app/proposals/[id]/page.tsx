import ProposalClient from "./ProposalClient";

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="mx-auto max-w-4xl">
      <ProposalClient proposalId={id} />
    </div>
  );
}
