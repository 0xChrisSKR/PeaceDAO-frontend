"use client";

import { useMemo } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { bsc, DEFAULT_CHAIN } from "@/config/chains";

export function NetworkPill() {
  const { chain } = useNetwork();
  const { chains = [], switchNetworkAsync, isLoading, pendingChainId } = useSwitchNetwork();

  const current = useMemo(() => {
    if (chain) return chain;
    if (chains.length) return chains[0];
    return DEFAULT_CHAIN;
  }, [chain, chains]);

  const nextChain = useMemo(() => {
    if (!chains.length) return undefined;
    if (current.id === chains[0].id && chains[1]) return chains[1];
    return chains[0];
  }, [chains, current.id]);

  const label = useMemo(() => {
    if (isLoading && pendingChainId) return "Switching...";
    if (current.id === bsc.id) return "BSC Mainnet";
    return current.name ?? "Unknown";
  }, [current, isLoading, pendingChainId]);

  const handleClick = async () => {
    if (!nextChain || !switchNetworkAsync) return;
    try {
      await switchNetworkAsync(nextChain.id);
    } catch (error) {
      console.error(error);
    }
  };

  const disabled = !nextChain || !switchNetworkAsync || isLoading;

  return (
    <button
      onClick={handleClick}
      type="button"
      disabled={disabled}
      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {label}
    </button>
  );
}
