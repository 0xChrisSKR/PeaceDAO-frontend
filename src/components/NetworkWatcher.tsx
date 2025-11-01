"use client";

import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { DEFAULT_CHAIN } from "@/config/chains";
import { useLanguage } from "@/components/LanguageProvider";
import { useWallet } from "@/hooks/useWallet";

const TOAST_ID = "network-mismatch";

export function NetworkWatcher() {
  const { dictionary } = useLanguage();
  const { isConnected, chainId, switchToDefaultChain } = useWallet();
  const [isSwitching, setSwitching] = useState(false);

  const handleSwitch = useCallback(async () => {
    try {
      setSwitching(true);
      await switchToDefaultChain();
      toast.success(`${dictionary.wallet.switch} ${DEFAULT_CHAIN.name}`);
      toast.dismiss(TOAST_ID);
    } catch (error: any) {
      const message = error?.message ?? "Failed to switch";
      toast.error(message);
    } finally {
      setSwitching(false);
    }
  }, [dictionary.wallet.switch, switchToDefaultChain]);

  useEffect(() => {
    if (!isConnected || chainId == null || chainId === DEFAULT_CHAIN.id) {
      toast.dismiss(TOAST_ID);
      return;
    }

    toast.custom(
      () => (
        <div className="flex max-w-sm flex-col gap-3 rounded-2xl bg-white/90 p-4 text-slate-900 shadow-xl">
          <p className="text-sm font-medium">{dictionary.wallet.wrongNetwork}</p>
          <button
            type="button"
            onClick={handleSwitch}
            disabled={isSwitching}
            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSwitching ? dictionary.common.loading : `${dictionary.wallet.switch} ${DEFAULT_CHAIN.name}`}
          </button>
        </div>
      ),
      { id: TOAST_ID, duration: Infinity }
    );

    return () => {
      toast.dismiss(TOAST_ID);
    };
  }, [chainId, dictionary.common.loading, dictionary.wallet.switch, dictionary.wallet.wrongNetwork, handleSwitch, isConnected, isSwitching]);

  return null;
}
