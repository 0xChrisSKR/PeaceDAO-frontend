"use client";

import { useMemo, useState } from "react";

import { DEFAULT_CHAIN } from "@/config/chains";
import { useWallet } from "@/hooks/useWallet";

export function NetworkPill() {
  const { chainId, switchToDefaultChain, isConnected } = useWallet();
  const [isSwitching, setSwitching] = useState(false);

  const isOnDefaultChain = useMemo(() => {
    if (!chainId) return false;
    return chainId === DEFAULT_CHAIN.id;
  }, [chainId]);

  const handleSwitch = async () => {
    try {
      setSwitching(true);
      await switchToDefaultChain();
    } catch (error) {
      console.error("Failed to switch chain", error);
    } finally {
      setSwitching(false);
    }
  };

  return (
    <button
      onClick={handleSwitch}
      type="button"
      disabled={!isConnected || isOnDefaultChain || isSwitching}
      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSwitching ? "Switching..." : isOnDefaultChain ? DEFAULT_CHAIN.name : `Switch to ${DEFAULT_CHAIN.name}`}
    </button>
  );
}
