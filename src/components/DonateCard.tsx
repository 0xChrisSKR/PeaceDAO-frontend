"use client";
import React, { useMemo, useState } from "react";
import { parseEther } from "viem";
import { getWalletClient } from "../lib/viem";
import { CONTRACTS } from "../config/contracts";
// 需要你已經有 src/abis/Donation.ts（上一包離線匯出腳本已產生）
import { DonationABI } from "../abis/Donation";

const explorerByChain: Record<number, string> = {
  1: "https://etherscan.io",
  56: "https://bscscan.com",
  8453: "https://basescan.org",
  42161: "https://arbiscan.io",
};

function getExplorerTx(hash: `0x${string}`) {
  const id = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 56);
  const base = explorerByChain[id] || "";
  return base ? `${base}/tx/${hash}` : `#`;
}

export default function DonateCard() {
  const [amt, setAmt] = useState("0.01");
  const [tx, setTx] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const donation = (CONTRACTS.DONATION_ADDRESS || "") as `0x${string}`;
  const hasDonateFn = useMemo(
    () => Array.isArray(DonationABI) && (DonationABI as any[]).some((f) => f.type === "function" && f.name === "donate"),
    []
  );

  if (!donation) {
    return (
      <div className="p-4 rounded-xl border">
        Donation not configured. Set NEXT_PUBLIC_DONATION_ADDRESS or addresses.local.json
      </div>
    );
  }

  const doDonate = async () => {
    if (!donation) return alert("Donation address 未設定");
    setBusy(true); setTx(null);
    try {
      const wallet = await getWalletClient();
      const value = parseEther(amt as `${number}`);
      let hash: `0x${string}`;

      if (hasDonateFn) {
        hash = await (wallet as any).writeContract({
          address: donation,
          abi: DonationABI as any,
          functionName: "donate",
          value,
        });
      } else {
        hash = await wallet.sendTransaction({ to: donation, value });
      }
      setTx(hash);
    } catch (e: any) {
      console.error(e);
      alert(e?.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ padding: 16, border: "1px solid #444", borderRadius: 12, maxWidth: 420 }}>
      <h3 style={{ margin: 0, marginBottom: 8 }}>Donate</h3>
      <div style={{ fontSize: 12, opacity: 0.8, wordBreak: "break-all", marginBottom: 8 }}>
        To: {donation || "(unset)"}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          placeholder="Amount (ETH/BNB)"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={doDonate} disabled={busy || !donation} style={{ padding: "8px 12px" }}>
          {busy ? "Donating..." : "Donate"}
        </button>
      </div>
      {tx && (
        <div style={{ fontSize: 12 }}>
          Tx:{" "}
          <a href={getExplorerTx(tx as `0x${string}`)} target="_blank" rel="noreferrer">
            查看區塊瀏覽器
          </a>
        </div>
      )}
    </div>
  );
}
