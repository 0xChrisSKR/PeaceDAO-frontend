"use client";

import { DEFAULT_CHAIN } from "@/config/chains";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import toast from "react-hot-toast";

export function NetworkGuard() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync, isPending } = useSwitchChain();

  if (!isConnected) return null;
  if (chainId === DEFAULT_CHAIN.id) return null;

  const handleSwitch = async () => {
    try {
      await switchChainAsync({ chainId: DEFAULT_CHAIN.id });
      toast.success(`Switched to ${DEFAULT_CHAIN.name}`);
    } catch (error: any) {
      toast.error(error?.shortMessage ?? error?.message ?? "Failed to switch network");
    }
  };

  return (
    <div className="rounded-lg border border-amber-500 bg-amber-500/20 p-4 text-sm text-amber-100">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>
          You are connected to the wrong network. Please switch to {DEFAULT_CHAIN.name} to continue.
        </p>
        <button
          onClick={handleSwitch}
          disabled={isPending}
          className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-900"
        >
          {isPending ? "Switching..." : `Switch to ${DEFAULT_CHAIN.name}`}
        </button>
      </div>
    </div>
  );
}
