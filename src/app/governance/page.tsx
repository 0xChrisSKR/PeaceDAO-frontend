export const revalidate = false;

export default function GovernancePage() {
  return (
    <>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Governance</h1>
      <div className="card">
        <p className="small">Proposals, voting, and results will be added here.</p>
        <ul style={{marginTop: 8, lineHeight: 1.9}}>
          <li>Create proposal (coming soon)</li>
          <li>Active proposals (coming soon)</li>
          <li>Past results (coming soon)</li>
        </ul>
      </div>
    </>
  );
}
