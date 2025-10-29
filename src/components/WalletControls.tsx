"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useLanguage } from "@/components/LanguageProvider";

function shorten(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function WalletControls() {
  const { dictionary } = useLanguage();
  const { address, isConnecting, isConnected } = useAccount();
  const { connectAsync, connectors, isPending, variables } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const [open, setOpen] = useState(false);

  const availableConnectors = useMemo(() => connectors.filter((connector) => connector.id), [connectors]);

  const handleConnect = async (id: string) => {
    const connector = availableConnectors.find((item) => item.id === id);
    if (!connector) return;

    try {
      await connectAsync({ connector });
      toast.success(dictionary.wallet.connect);
      setOpen(false);
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to connect";
      toast.error(message);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
      toast.success(dictionary.wallet.disconnect);
    } catch (error: any) {
      const message = error?.shortMessage ?? error?.message ?? "Failed to disconnect";
      toast.error(message);
    }
  };

  const handleCopy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      toast.success(dictionary.wallet.copied);
    } catch {
      toast.error("Unable to copy");
    }
  };

  if (isConnected) {
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
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm transition hover:bg-white"
      >
        {isConnecting ? dictionary.wallet.connecting : dictionary.wallet.connect}
      </button>
      {open ? (
        <div className="absolute right-0 z-50 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          <div className="flex flex-col gap-2">
            {availableConnectors.map((connector) => {
              const isCurrent = (variables?.connector as { id?: string } | undefined)?.id === connector.id;
              return (
                <button
                  key={connector.id}
                  type="button"
                  onClick={() => handleConnect(connector.id)}
                  disabled={!connector.ready}
                  className={clsx(
                    "rounded-xl border border-slate-200 px-4 py-2 text-left text-sm font-medium text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50",
                    (!connector.ready || (isPending && isCurrent)) && "opacity-60"
                  )}
                >
                  {connector.name}
                  {isPending && isCurrent ? "…" : ""}
                </button>
              );
            })}
            {availableConnectors.length === 0 ? (
              <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                {dictionary.wallet.noConnector}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
