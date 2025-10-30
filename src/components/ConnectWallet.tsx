"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

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

export default function ConnectWallet() {
  const { address: wagmiAddress, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [fallbackAddress, setFallbackAddress] = useState<string | null>(null);

  const address = isConnected ? wagmiAddress : fallbackAddress;

  async function connect() {
    if (typeof window === "undefined") return;

    try {
      await open();
      return;
    } catch (error) {
      console.error("Web3Modal connection failed, falling back to direct request", error);
    }

    if (window.BinanceChain) {
      try {
        const accounts = await window.BinanceChain.request<string[]>({ method: "eth_requestAccounts" });
        setFallbackAddress(accounts?.[0] ?? null);
        return;
      } catch (err) {
        console.error("Failed to connect via BinanceChain", err);
      }
    }

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request<string[]>({ method: "eth_requestAccounts" });
        setFallbackAddress(accounts?.[0] ?? null);
        return;
      } catch (err) {
        console.error("Failed to connect via window.ethereum", err);
      }
    }

    alert("請安裝 Binance Web3 或 Metamask 錢包！");
  }

  return (
    <button
      onClick={connect}
      className="rounded-full bg-amber-500 px-5 py-2 font-semibold text-white shadow transition hover:bg-amber-600"
    >
      {address ? `已連結: ${address.slice(0, 6)}...${address.slice(-4)}` : "連結錢包"}
    </button>
  );
}
