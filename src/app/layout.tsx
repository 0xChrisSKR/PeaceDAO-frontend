import './globals.css';
import Providers from '@/components/providers';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'World Peace DAO',
  description: 'A calm, composable DAO frontend scaffold',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{borderBottom: '1px solid rgba(255,255,255,.12)', padding: '12px 16px', position: 'sticky', top: 0, backdropFilter: 'saturate(140%) blur(8px)', background: 'linear-gradient(180deg, rgba(15,23,42,.6), transparent)'}}>
          <nav style={{display: 'flex', gap: 16, maxWidth: 1080, margin: '0 auto'}}>
            <Link className="btn" href="/">Home</Link>
            <Link className="btn" href="/home">Dashboard</Link>
            <Link className="btn" href="/treasury">Treasury</Link>
            <Link className="btn" href="/governance">Governance</Link>
            <Link className="btn" href="/donate">Donate</Link>
            <a className="btn" href="/api/peace/config" target="_blank" rel="noreferrer">API Config</a>
            <Link className="btn" href="/diagnostics">Diagnostics</Link>
          </nav>
        </header>
        <Providers>
          <main style={{maxWidth: 1080, margin: '24px auto', padding: '0 16px'}}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
