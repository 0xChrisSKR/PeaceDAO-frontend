import Link from 'next/link';
export const revalidate = false;
export default function Minimal() {
  return (
    <>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 12}}>Minimal</h1>
      <p>This is a minimal page.</p>
      <p style={{marginTop: 12}}>
        <Link href="/">← Back to Home</Link>
      </p>
    </>
  );
}
