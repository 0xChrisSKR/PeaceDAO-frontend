import Link from "next/link";

export default function Page() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Minimal OK</h1>
      <ul>
        <li><Link href="/api/health" prefetch={false}>/api/health</Link></li>
        <li><Link href="/api/peace/config" prefetch={false}>/api/peace/config</Link></li>
        <li><Link href="/diagnostics" prefetch={false}>/diagnostics</Link></li>
      </ul>
    </main>
  );
}
