import Link from 'next/link';

export default function Minimal() {
  return (
    <main style={{ padding: 24 }}>
      <h1>PeaceDAO — Minimal</h1>
      <p>
        <Link href="/">← Back to Home</Link>
      </p>
    </main>
  );
}
