"use client";

import { useWallet } from "@/hooks/useWallet";

export default function ConnectButton() {
  const { address, connect, isConnecting } = useWallet();
  const label = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : isConnecting
      ? "Connecting…"
      : "Connect Wallet";

  return (
    <button
      onClick={() => connect()}
      className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={isConnecting}
      type="button"
    >
      {label}
    </button>
  );
}
