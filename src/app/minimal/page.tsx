"use client";
import Link from "next/link";

export default function Minimal() {
  return (
    <main style={{padding:20}}>
      <h1>Minimal</h1>
      <p><Link href="/">Go Home</Link></p>
      <p><Link href="/diagnostics">Diagnostics</Link></p>
    </main>
  );
}
