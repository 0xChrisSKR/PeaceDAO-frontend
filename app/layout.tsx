import type { Metadata } from 'next';
import Link from 'next/link';
import QueryProvider from './providers/QueryProvider';

export const metadata: Metadata = {
  title: 'World Peace DAO',
  description: 'BSC token-verified governance prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{margin:0,fontFamily:'ui-sans-serif,system-ui'}}>
        <header style={{padding:'12px 16px',borderBottom:'1px solid #eee',display:'flex',gap:16,alignItems:'center'}}>
          <strong>World Peace DAO</strong>
          <nav style={{display:'flex',gap:12}}>
            <Link href="/">Home</Link>
            <Link href="/donate">Donate</Link>
            <Link href="/treasury">Treasury</Link>
            <Link href="/governance">Governance</Link>
            <Link href="/diagnostics">Diagnostics</Link>
          </nav>
        </header>
        <QueryProvider>
          <div style={{padding:'20px 16px'}}>{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
