import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#0b0b0e", color: "#e6e6e6" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "64px 24px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>PeaceDAO</h1>
        <p style={{ opacity: 0.8, marginBottom: 24 }}>Minimal DApp shell is ready.</p>
        <div style={{ display: "flex", gap: 12 }}>
          <Link
            href="/diagnostics"
            style={{
              padding: "10px 14px",
              background: "#222",
              borderRadius: 8,
              textDecoration: "none",
              color: "#fff",
            }}
          >
            Diagnostics
          </Link>
          <Link
            href="/minimal"
            style={{
              padding: "10px 14px",
              background: "#222",
              borderRadius: 8,
              textDecoration: "none",
              color: "#fff",
            }}
          >
            Minimal
          </Link>
          <a
            href="/api/peace/config"
            style={{
              padding: "10px 14px",
              background: "#222",
              borderRadius: 8,
              textDecoration: "none",
              color: "#fff",
            }}
          >
            Config API
          </a>
        </div>
      </div>
    </main>
  );
}
