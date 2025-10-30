import Providers from '@/components/providers';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'World Peace DAO',
  description: 'World Peace DAO frontend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'}}>
        <header style={{borderBottom: '1px solid #eee', padding: '12px 16px'}}>
          <nav style={{display: 'flex', gap: 16, maxWidth: 960, margin: '0 auto'}}>
            <Link href="/">Home</Link>
            <Link href="/home">Dashboard</Link>
            <Link href="/treasury">Treasury</Link>
            <Link href="/governance">Governance</Link>
            <Link href="/donate">Donate</Link>
            <a href="/api/peace/config" target="_blank" rel="noreferrer">API Config</a>
            <Link href="/diagnostics">Diagnostics</Link>
          </nav>
        </header>
        <Providers>
          <main style={{maxWidth: 960, margin: '24px auto', padding: '0 16px'}}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
