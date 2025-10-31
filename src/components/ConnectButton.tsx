"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

export default function ConnectButton() {
  const { isConnected, address } = useAccount();
  const [fallbackAddress, setFallbackAddress] = useState<string | null>(null);
  const label = (() => {
    const activeAddress = isConnected && address ? address : fallbackAddress;
    if (!activeAddress) return "Connect Wallet";
    return `${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}`;
  })();

  async function connect() {
    if (typeof window === "undefined") return;

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request<string[]>({ method: "eth_requestAccounts" });
        setFallbackAddress(accounts?.[0] ?? null);
        return;
      } catch (error) {
        console.error("Failed to connect via window.ethereum", error);
      }
    }

    alert("Wallet modal is coming soon. Please install MetaMask or compatible wallet.");
  }

  return (
    <button onClick={connect} className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
      {label}
    </button>
  );
}
