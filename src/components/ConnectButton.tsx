"use client";
import { useState } from "react";
import { useAccount } from "wagmi";

declare global {
  interface BinanceChainProvider {
    request<T>(args: { method: string; params?: unknown[] }): Promise<T>;
  }

  interface EthereumProvider {
    request<T>(args: { method: string; params?: unknown[] }): Promise<T>;
  }

  interface Window {
    BinanceChain?: BinanceChainProvider;
    ethereum?: EthereumProvider;
  }
}

export default function ConnectButton() {
  const { isConnected, address } = useAccount();
  const [fallbackAddress, setFallbackAddress] = useState<string | null>(null);

  const activeAddress = isConnected ? address : fallbackAddress;
  const label = activeAddress
    ? `${activeAddress.slice(0, 6)}...${activeAddress.slice(-4)}`
    : "Connect Wallet";

  async function handleClick() {
    if (typeof window === "undefined") return;

    if (window.BinanceChain) {
      try {
        const accounts = await window.BinanceChain.request<string[]>({ method: "eth_requestAccounts" });
        setFallbackAddress(accounts?.[0] ?? null);
        return;
      } catch (error) {
        console.error("Failed to connect via BinanceChain", error);
      }
    }

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request<string[]>({ method: "eth_requestAccounts" });
        setFallbackAddress(accounts?.[0] ?? null);
        return;
      } catch (error) {
        console.error("Failed to connect via window.ethereum", error);
      }
    }

    alert("Please install Binance Web3 or Metamask wallet!");
  }

  return (
    <button
      onClick={handleClick}
      className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
    >
      {label}
    </button>
  );
}
