export const revalidate = false;

export default function HomeDashboard() {
  return (
    <>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Dashboard</h1>
      <div className="card">
        <p className="small">This is a safe placeholder dashboard. Smart-contract widgets will be plugged in next.</p>
        <ul style={{marginTop: 8, lineHeight: 1.9}}>
          <li>TOKEN price / TVL (coming soon)</li>
          <li>Recent proposals (coming soon)</li>
          <li>Latest donations / inflows (coming soon)</li>
        </ul>
      </div>
    </>
  );
}
