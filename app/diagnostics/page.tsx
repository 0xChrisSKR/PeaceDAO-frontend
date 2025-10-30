/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";

export const dynamic = "force-static";

export default async function Diagnostics() {
  // 這頁是 Server Component，讀環境變數不會觸發 client 端的 process 錯誤
  const env = {
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_RPC_HTTP: process.env.NEXT_PUBLIC_RPC_HTTP,
    NEXT_PUBLIC_DONATION_ADDRESS: process.env.NEXT_PUBLIC_DONATION_ADDRESS,
    NEXT_PUBLIC_TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS,
    NEXT_PUBLIC_GOVERNANCE_ADDRESS: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS,
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Diagnostics</h1>

      <h2>Env (public)</h2>
      <pre>{JSON.stringify(env, null, 2)}</pre>

      <h2>Links</h2>
      <ul>
        <li><Link href="/api/health" prefetch={false}>/api/health</Link></li>
        <li><Link href="/api/peace/config" prefetch={false}>/api/peace/config</Link></li>
        <li><Link href="/" prefetch={false}>/</Link></li>
      </ul>
    </main>
  );
}
