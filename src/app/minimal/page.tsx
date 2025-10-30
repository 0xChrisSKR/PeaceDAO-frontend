import Link from 'next/link';

export default function Page(){
  return (
    <main style={{padding:'24px',fontFamily:'ui-sans-serif,system-ui'}}>
      <h1>Minimal OK</h1>
      <ul>
        <li><Link href="/">/</Link></li>
        <li><Link href="/diagnostics">/diagnostics</Link></li>
        <li><a href="/api/peace/config">/api/peace/config</a></li>
      </ul>
    </main>
  );
}
