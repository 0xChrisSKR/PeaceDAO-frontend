import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import QueryProvider from '../src/providers/QueryProvider';

const SafeClientProvider = dynamic(
  () => import('../src/providers/SafeClientProvider'),
  { ssr: false }
);

export const metadata: Metadata = { title: 'World Peace DAO', description: 'PeaceDAO Frontend' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <SafeClientProvider>{children}</SafeClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
