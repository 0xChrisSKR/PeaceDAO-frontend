"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/LanguageProvider";
import { connectWallet } from "@/lib/wallet";

function shorten(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
};

function getProvider(): EthereumProvider | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as any).ethereum;
}

export function WalletControls() {
  const { dictionary } = useLanguage();
  const [address, setAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    provider
      .request({ method: "eth_accounts" })
      .then((accounts: string[]) => {
        setAddress(accounts?.[0] ?? "");
      })
      .catch(() => undefined);

    const handleAccountsChanged = (accounts: string[]) => {
      setAddress(accounts?.[0] ?? "");
    };

    provider.on?.("accountsChanged", handleAccountsChanged);
    return () => {
      provider.removeListener?.("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const handleConnect = async () => {
    const provider = getProvider();
    if (!provider) {
      toast.error(dictionary.wallet.noConnector);
      return;
    }
    try {
      setIsConnecting(true);
      const acc = await connectWallet();
      setAddress(acc);
      toast.success(dictionary.wallet.connect);
    } catch (error: any) {
      const message = error?.message ?? "Failed to connect";
      toast.error(message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setAddress("");
    toast.success(dictionary.wallet.disconnect);
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

  if (address) {
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
      className={clsx(
        "inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm transition hover:bg-white",
        isConnecting && "opacity-75"
      )}
      disabled={isConnecting}
    >
      {isConnecting ? dictionary.wallet.connecting : dictionary.wallet.connect}
    </button>
  );
}
