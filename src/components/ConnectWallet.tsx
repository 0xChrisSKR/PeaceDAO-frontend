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

  // NOTE: Avoid redeclaring global Window to prevent TS ambient-merge conflicts
  // interface Window {
  //   BinanceChain?: BinanceChainProvider;
  //   ethereum?: EthereumProvider;
  // }
}

type AugmentedWindow = Window & {
  BinanceChain?: BinanceChainProvider;
  ethereum?: EthereumProvider;
};

const getAugmentedWindow = (): AugmentedWindow | undefined =>
  typeof window === "undefined" ? undefined : (window as AugmentedWindow);

// local-safe getter to avoid global typing collisions
const getEthereum = (): EthereumProvider | undefined => getAugmentedWindow()?.ethereum;

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

    const augmentedWindow = getAugmentedWindow();

    if (augmentedWindow?.BinanceChain) {
      try {
        const accounts = await augmentedWindow.BinanceChain.request<string[]>({ method: "eth_requestAccounts" });
        setFallbackAddress(accounts?.[0] ?? null);
        return;
      } catch (err) {
        console.error("Failed to connect via BinanceChain", err);
      }
    }

    const ethereum = getEthereum();

    if (ethereum) {
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
