"use client";
import { ENV } from "@/lib/env";
import Link from "next/link";

export default function DiagnosticsPage() {
  return (
    <main style={{padding:20,fontFamily:"ui-sans-serif,system-ui"}}>
      <h1>Diagnostics</h1>
      <p>Client OK. ENV (public-only) below:</p>
      <pre style={{background:"#111",color:"#0f0",padding:12,borderRadius:8,overflow:"auto"}}>
        {JSON.stringify(ENV, null, 2)}
      </pre>
      <p><Link href="/api/peace/config">Open /api/peace/config</Link></p>
      <p><Link href="/">Back Home</Link></p>
    </main>
  );
}
