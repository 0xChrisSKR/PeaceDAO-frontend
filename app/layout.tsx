// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Providers from '../src/providers/client';

export const metadata: Metadata = {
  title: 'PeaceDAO — 世界和平',
  description: 'Every swap funds peace. Make World Peace Real.',
  openGraph: { title: 'PeaceDAO — 世界和平', description: 'On-chain Charity', images: [{ url: '/og-banner.png' }] },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
