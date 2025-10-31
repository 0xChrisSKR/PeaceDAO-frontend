"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

interface BinanceChainProvider {
  request<T>(args: { method: string; params?: unknown[] }): Promise<T>;
}

interface EthereumProvider {
  request<T>(args: { method: string; params?: unknown[] }): Promise<T>;
}

// Removed: DO NOT re-declare Window here to avoid TS merge conflicts
// interface Window {

// Helper to safely get window.ethereum without global typing conflicts
const getEthereum = (): unknown => {
  if (typeof window === "undefined") return undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).ethereum;
};

const getBinanceChain = (): BinanceChainProvider | undefined => {
  if (typeof window === "undefined") return undefined;
  return (window as typeof window & { BinanceChain?: BinanceChainProvider }).BinanceChain;
};

const isEthereumProvider = (value: unknown): value is EthereumProvider => {
  return (
    typeof value === "object" &&
    value !== null &&
    "request" in value &&
    typeof (value as { request?: unknown }).request === "function"
  );
};

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

    const binanceChain = getBinanceChain();
    if (binanceChain) {
      try {
        const accounts = await binanceChain.request<string[]>({ method: "eth_requestAccounts" });
        setFallbackAddress(accounts?.[0] ?? null);
        return;
      } catch (err) {
        console.error("Failed to connect via BinanceChain", err);
      }
    }

    const ethereum = getEthereum();
    if (isEthereumProvider(ethereum)) {
      try {
        const accounts = await ethereum.request<string[]>({ method: "eth_requestAccounts" });
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
