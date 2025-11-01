"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";

import { useWallet } from "@/hooks/useWallet";
import { useLanguage } from "@/components/LanguageProvider";

function shorten(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function WalletControls() {
  const { dictionary } = useLanguage();
  const { address, connect, disconnect, isConnecting, isConnected } = useWallet();

  const handleConnect = useCallback(async () => {
    try {
      const account = await connect();
      if (!account) {
        toast.error("請安裝支援的錢包");
        return;
      }
      toast.success(dictionary.wallet.connect);
    } catch (error: any) {
      const message = error?.message ?? "Failed to connect";
      toast.error(message);
    }
  }, [connect, dictionary.wallet.connect]);

  const handleDisconnect = useCallback(() => {
    try {
      disconnect();
      toast.success(dictionary.wallet.disconnect);
    } catch (error: any) {
      const message = error?.message ?? "Failed to disconnect";
      toast.error(message);
    }
  }, [disconnect, dictionary.wallet.disconnect]);

  const handleCopy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      toast.success(dictionary.wallet.copied);
    } catch {
      toast.error("Unable to copy");
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm transition hover:bg-white"
        >
          <span>{shorten(address)}</span>
        </button>
        <button
          type="button"
          onClick={handleDisconnect}
          className="rounded-full border border-transparent bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-600"
        >
          {dictionary.wallet.disconnect}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleConnect}
      className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
      disabled={isConnecting}
    >
      {isConnecting ? dictionary.wallet.connecting : dictionary.wallet.connect}
    </button>
  );
}
