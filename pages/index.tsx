import Link from "next/link";

export default function Home() {
  return (
    <main style={{padding:20,fontFamily:"ui-sans-serif,system-ui"}}>
      <h1>PeaceDAO Frontend</h1>
      <ul>
        <li><Link href="/diagnostics">Diagnostics</Link></li>
        <li><a href="/api/peace/config">/api/peace/config</a></li>
      </ul>
    </main>
  );
}
