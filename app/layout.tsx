import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'World Peace DAO', description: 'PeaceDAO Frontend' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
