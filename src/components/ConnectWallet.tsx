"use client";

import { useMemo } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

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
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const primaryConnector = useMemo(() => connectors.find((c) => c.ready), [connectors]);

  const label = isConnected && address
    ? `已連結: ${address.slice(0, 6)}...${address.slice(-4)}`
    : primaryConnector
      ? pendingConnector && pendingConnector.id === primaryConnector.id && isLoading
        ? "連線中..."
        : `連結 ${primaryConnector.name}`
      : "請安裝支持的錢包";

  const handleClick = async () => {
    if (isConnected) {
      disconnect();
      return;
    }

    if (primaryConnector) {
      try {
        await connect({ connector: primaryConnector });
        return;
      } catch (error) {
        console.error("Connector connection failed", error);
      }
    }

    if (typeof window === "undefined") return;

    if (window.BinanceChain) {
      try {
        const accounts = await window.BinanceChain.request<string[]>({ method: "eth_requestAccounts" });
        console.warn("請刷新頁面以使用剛連線的錢包", accounts?.[0]);
        return;
      } catch (err) {
        console.error("Failed to connect via BinanceChain", err);
      }
    }

    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request<string[]>({ method: "eth_requestAccounts" });
        console.warn("請刷新頁面以使用剛連線的錢包", accounts?.[0]);
        return;
      } catch (err) {
        console.error("Failed to connect via window.ethereum", err);
      }
    }

    alert("請安裝 Binance Web3 或 Metamask 錢包！");
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isConnected && !primaryConnector}
      className="rounded-full bg-amber-500 px-5 py-2 font-semibold text-white shadow transition hover:bg-amber-600 disabled:opacity-60"
    >
      {label}
    </button>
  );
}
