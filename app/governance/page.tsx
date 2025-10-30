export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function GovernancePage() {
  return (
    <main>
      <h1>Governance</h1>
      <p>Token-verified participation (example thresholds):</p>
      <ul>
        <li>Speak (comment): 100 $世界和平</li>
        <li>Vote: 200,000 $世界和平</li>
        <li>Propose: 1,000,000 $世界和平</li>
      </ul>
      <p>Anti-Sybil: cooldowns on proposals; higher scrutiny for large disbursements.</p>
      <p>All donations go through the PeaceFund; verifiers & community managers share ops rewards.</p>
    </main>
  );
}
