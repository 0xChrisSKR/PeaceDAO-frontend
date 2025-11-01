"use client";

import { useState } from "react";

import { useWallet } from "@/hooks/useWallet";

export default function ConnectWallet() {
  const { address, connect, isConnecting } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setError(null);
      const account = await connect();
      if (!account) {
        setError("請安裝 Binance Web3 或 MetaMask 錢包！");
      }
    } catch (err: any) {
      console.error("Failed to connect wallet", err);
      setError(err?.message ?? "無法連線錢包");
    }
  };

  const label = address
    ? `已連結: ${address.slice(0, 6)}...${address.slice(-4)}`
    : isConnecting
      ? "連線中…"
      : "連結錢包";

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleConnect}
        className="rounded-full bg-amber-500 px-5 py-2 font-semibold text-white shadow transition hover:bg-amber-600"
        type="button"
        disabled={isConnecting}
      >
        {label}
      </button>
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
