"use client";
import React, { useState } from "react";

import { CONTRACTS } from "../config/contracts";
import { ENV } from "@/lib/env";
import { useWallet } from "@/hooks/useWallet";
import { sendTransaction } from "@/lib/wallet";

const explorerByChain: Record<number, string> = {
  1: "https://etherscan.io",
  56: "https://bscscan.com",
  8453: "https://basescan.org",
  42161: "https://arbiscan.io",
};

function getExplorerTx(hash: `0x${string}`) {
  const id = ENV.CHAIN_ID;
  const base = explorerByChain[id] || "";
  return base ? `${base}/tx/${hash}` : `#`;
}

export default function DonateCard() {
  const [amt, setAmt] = useState("0.01");
  const [tx, setTx] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const donation = (CONTRACTS.DONATION_ADDRESS || "") as `0x${string}`;
  const { address, connect, isConnecting } = useWallet();

  const doDonate = async () => {
    if (!donation) {
      alert("Donation address 未設定");
      return;
    }

    setBusy(true);
    setTx(null);

    try {
      const numericAmount = Number(amt);
      if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
        throw new Error("請輸入有效的捐款金額");
      }

      let from = address;
      if (!from) {
        from = await connect();
      }
      if (!from) {
        throw new Error("請先連接錢包");
      }
      const hash = await sendTransaction(donation, amt, from);
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
        <button onClick={doDonate} disabled={busy || isConnecting || !donation} style={{ padding: "8px 12px" }}>
          {busy ? "Donating..." : isConnecting ? "Connecting..." : "Donate"}
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
