"use client";

import { useChainId, useSwitchChain, useChains } from "wagmi";
import { useMemo } from "react";
import { bsc, bscTestnet, DEFAULT_CHAIN } from "@/config/chains";

export function NetworkPill() {
  const chainId = useChainId();
  const chains = useChains();
  const { switchChainAsync, isPending } = useSwitchChain();

  const current = useMemo(
    () => chains.find((chain) => chain.id === chainId) ?? DEFAULT_CHAIN,
    [chains, chainId]
  );

  const nextChain = useMemo(() => {
    if (!chains.length) return undefined;
    if (current.id === chains[0].id && chains[1]) return chains[1];
    return chains[0];
  }, [chains, current.id]);

  const label = useMemo(() => {
    if (current.id === bsc.id) return "BSC Mainnet";
    if (current.id === bscTestnet.id) return "BSC Testnet";
    return current.name ?? "Unknown";
  }, [current]);

  const handleClick = async () => {
    if (!nextChain) return;
    try {
      await switchChainAsync({ chainId: nextChain.id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      disabled={!nextChain || isPending}
      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Switching..." : label}
    </button>
  );
}
