"use client";

import { useTranslation } from "next-i18next";
import { DEFAULT_CHAIN } from "@/config/chains";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import toast from "react-hot-toast";

export function NetworkGuard() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync, isPending } = useSwitchChain();
  const { t } = useTranslation();

  if (!isConnected) return null;
  if (chainId === DEFAULT_CHAIN.id) return null;

  const handleSwitch = async () => {
    try {
      await switchChainAsync({ chainId: DEFAULT_CHAIN.id });
      toast.success(t("networkGuard.toast.switched", { chain: DEFAULT_CHAIN.name }));
    } catch (error: any) {
      toast.error(error?.shortMessage ?? error?.message ?? t("networkGuard.toast.error"));
    }
  };

  return (
    <div className="rounded-lg border border-amber-500 bg-amber-500/20 p-4 text-sm text-amber-100">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>{t("networkGuard.message", { chain: DEFAULT_CHAIN.name })}</p>
        <button
          onClick={handleSwitch}
          disabled={isPending}
          className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-900"
        >
          {isPending
            ? t("networkGuard.button.switching")
            : t("networkGuard.button.switch", { chain: DEFAULT_CHAIN.name })}
        </button>
      </div>
    </div>
  );
}
