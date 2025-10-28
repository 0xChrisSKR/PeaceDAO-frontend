"use client";

import { useChainId, useSwitchChain, useChains } from "wagmi";
import { useMemo } from "react";

export function NetworkPill() {
  const chainId = useChainId();
  const chains = useChains();
  const { switchChainAsync, isPending } = useSwitchChain();

  const current = useMemo(() => chains.find((chain) => chain.id === chainId), [chains, chainId]);

  const handleClick = async () => {
    if (!chains.length) return;
    const next = chainId === chains[0].id && chains[1] ? chains[1] : chains[0];
    try {
      await switchChainAsync({ chainId: next.id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200"
    >
      {isPending ? "Switching..." : current?.name ?? "Unknown"}
    </button>
  );
}
