"use client";
import { usePeaceFundAddress } from "@/hooks/usePeaceFundAddress";
export default function FundCard() {
  const { address, mode } = usePeaceFundAddress();
  const label = mode==="env" ? "（ENV 指定）" : mode==="auto" ? "（自動解析）" : "（未設定，顯示預設）";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert("已複製捐贈地址");
    } catch {}
  };
  return (
    <section style={{ border: "1px solid #333", borderRadius: 12, padding: 16 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Peace Fund 地址 {label}</h3>
      <div style={{ fontFamily: "monospace", wordBreak: "break-all", fontSize: 14, opacity: 0.95 }}>{address}</div>
      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <button
          onClick={copy}
          style={{ padding: "6px 10px", border: "1px solid #444", borderRadius: 8, background: "#151515" }}
        >
          複製
        </button>
        <span style={{ opacity: 0.7, fontSize: 12 }}>鏈：依你 RPC/Chain 設定（目前展示用）</span>
      </div>
    </section>
  );
}
