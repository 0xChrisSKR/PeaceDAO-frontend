'use client';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const FUND = process.env.NEXT_PUBLIC_PEACE_FUND || '';

export default function DonatePage() {
  const copy = async () => {
    if (FUND) await navigator.clipboard.writeText(FUND);
    alert('Address copied');
  };
  return (
    <main>
      <h1>Donate</h1>
      <p>Send BNB to the PeaceFund address on BSC:</p>
      <code style={{display:'block',padding:8,background:'#f7f7f7',borderRadius:6,wordBreak:'break-all'}}>
        {FUND || '(PeaceFund not set)'}
      </code>
      <div style={{marginTop:8,display:'flex',gap:8}}>
        <button onClick={copy} style={{padding:'6px 10px'}}>Copy</button>
        {FUND && (
          <a
            href={`https://bscscan.com/address/${FUND}`}
            target="_blank" rel="noreferrer"
            style={{padding:'6px 10px',border:'1px solid #ddd',borderRadius:6}}
          >Open on BscScan</a>
        )}
      </div>
    </main>
  );
}
