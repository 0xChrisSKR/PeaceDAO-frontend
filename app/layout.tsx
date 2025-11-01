// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PeaceDAO — 世界和平',
  description: 'Make World Peace Real — Every swap funds peace.',
  openGraph: {
    title: 'PeaceDAO — 世界和平',
    description: 'Every swap funds peace. Transparent, auditable, unstoppable.',
    images: [{ url: '/og-banner.png' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
