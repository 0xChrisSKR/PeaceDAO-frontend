export const dynamic = "force-static";
export const revalidate = 0; // 不快取，方便你看即時 ENV

import CONTRACTS from "@/config/contracts";

function redact(v: string | undefined) {
  if (!v) return "";
  if (v.length <= 8) return v;
  return v.slice(0, 4) + "…" + v.slice(-4);
}

export default function Diagnostics() {
  const env = {
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_RPC_HTTP: redact(process.env.NEXT_PUBLIC_RPC_HTTP),
    NEXT_PUBLIC_DONATION_ADDRESS: process.env.NEXT_PUBLIC_DONATION_ADDRESS,
    NEXT_PUBLIC_TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS,
    NEXT_PUBLIC_GOVERNANCE_ADDRESS: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS,
  };
  return (
    <div
      style={{
        padding: 24,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
      }}
    >
      <h1 style={{ fontSize: 24, marginBottom: 12 }}>Diagnostics</h1>
      <pre
        style={{
          background: "#111",
          color: "#0f0",
          padding: 16,
          borderRadius: 8,
          overflow: "auto",
        }}
      >
        {JSON.stringify({ env, contracts: CONTRACTS }, null, 2)}
      </pre>
      <p style={{ opacity: 0.7, marginTop: 12 }}>
        This page renders on the server to safely read process.env.
      </p>
    </div>
  );
}
