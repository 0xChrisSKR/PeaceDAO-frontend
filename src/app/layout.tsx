import type { Metadata } from 'next';
import './globals.css';
import Web3Provider from '@/providers/Web3Provider';

export const metadata: Metadata = { title: 'WorldPeace DAO' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
