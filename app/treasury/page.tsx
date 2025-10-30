export const dynamic = 'force-dynamic';
export const revalidate = 0;

const FUND = process.env.NEXT_PUBLIC_PEACE_FUND || '';
const TOKEN = process.env.NEXT_PUBLIC_TOKEN || 'WORLDPEACE';

export default function TreasuryPage() {
  return (
    <main>
      <h1>Treasury</h1>
      <p>PeaceFund (BSC) custody address:</p>
      <code style={{display:'block',padding:8,background:'#f7f7f7',borderRadius:6,wordBreak:'break-all'}}>
        {FUND || '(PeaceFund not set)'}
      </code>
      <ul style={{marginTop:12}}>
        {FUND && <li><a href={`https://bscscan.com/address/${FUND}`} target="_blank">BscScan: PeaceFund</a></li>}
        <li><a href="/api/peace/config">/api/peace/config</a></li>
      </ul>
      <p style={{marginTop:16}}><b>Token:</b> {TOKEN}</p>
    </main>
  );
}
