import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const SafeClientProvider = dynamic(
  () => import('../src/providers/SafeClientProvider'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'World Peace DAO',
  description: 'PeaceDAO Frontend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SafeClientProvider>{children}</SafeClientProvider>
      </body>
    </html>
  );
}
