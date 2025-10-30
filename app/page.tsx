export const dynamic = 'force-dynamic';
export const revalidate = 0;

const FUND = process.env.NEXT_PUBLIC_PEACE_FUND || '(unset)';
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || 'WORLDPEACE';

export default function Page() {
  return (
    <main>
      <h1>World Peace DAO</h1>
      <p>This demo is live on Vercel.</p>
      <ul>
        <li><a href="/donate">Donate</a> – send BNB to PeaceFund</li>
        <li><a href="/treasury">Treasury</a> – see fund address & links</li>
        <li><a href="/governance">Governance</a> – thresholds & flow</li>
        <li><a href="/diagnostics">Diagnostics</a></li>
      </ul>
      <div style={{marginTop:16,padding:12,border:'1px solid #eee',borderRadius:8}}>
        <div><b>Token:</b> {TOKEN}</div>
        <div><b>PeaceFund:</b> {FUND}</div>
      </div>
    </main>
  );
}
