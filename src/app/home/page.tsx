export const revalidate = false;
export default function HomeDashboard() {
  return (
    <>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Dashboard</h1>
      <p>This is a safe placeholder dashboard. Smart-contract widgets will be plugged in next.</p>
      <ul style={{marginTop: 12, lineHeight: 1.9}}>
        <li>TOKEN price / TVL (coming soon)</li>
        <li>Recent proposals (coming soon)</li>
        <li>Latest donations / inflows (coming soon)</li>
      </ul>
    </>
  );
}
