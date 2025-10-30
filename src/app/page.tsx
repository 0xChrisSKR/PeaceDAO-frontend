import Link from 'next/link';

export default function Page() {
  return (
    <main style={{padding:'24px',fontFamily:'ui-sans-serif,system-ui',lineHeight:1.6}}>
      <h1>World Peace DAO</h1>
      <p>Site is live. Quick links:</p>
      <ul>
        <li><Link href="/minimal">/minimal</Link></li>
        <li><Link href="/diagnostics">/diagnostics</Link></li>
        <li><a href="/api/peace/config">/api/peace/config</a></li>
      </ul>
    </main>
  );
}
