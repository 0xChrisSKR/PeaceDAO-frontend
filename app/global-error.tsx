'use client';

/* eslint-disable @next/next/no-html-link-for-pages */

import Link from "next/link";
import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ padding: "2rem" }}>
        <h1>We hit a client-side error</h1>
        <pre style={{ background: "#111", color: "#fff", padding: "1rem", borderRadius: 8 }}>
          {String(error?.message || "Unknown error")}
        </pre>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <button onClick={() => reset()}>Reload</button>
          <Link href="/diagnostics" prefetch={false}>Diagnostics</Link>
          <Link href="/api/peace/config" prefetch={false}>/api/peace/config</Link>
        </div>
      </body>
    </html>
  );
}
