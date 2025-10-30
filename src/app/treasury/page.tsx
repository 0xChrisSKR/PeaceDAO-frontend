export const revalidate = false;
export default function TreasuryPage() {
  return (
    <>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Treasury</h1>
      <p>This page will show on-chain balances & flows.</p>
      <p style={{marginTop: 12}}>See current app config at <a href="/api/peace/config">/api/peace/config</a>.</p>
      <ul style={{marginTop: 12, lineHeight: 1.9}}>
        <li>DAO vault addresses (coming soon)</li>
        <li>Historical inflows/outflows (coming soon)</li>
        <li>Donor leaderboard (coming soon)</li>
      </ul>
    </>
  );
}
