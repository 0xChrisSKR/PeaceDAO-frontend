import Link from 'next/link';

export const revalidate = false;

export default function Minimal() {
  return (
    <main style={{maxWidth: 840, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'}}>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Minimal</h1>
      <p style={{marginBottom: 12}}>This is a minimal page.</p>
      <p><Link href="/">← Back to Home</Link></p>
    </main>
  );
}
