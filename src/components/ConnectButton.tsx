"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import clsx from "clsx";
import toast from "react-hot-toast";

function truncateAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function ConnectButton() {
  const { address, isConnecting, isConnected } = useAccount();
  const { connectAsync, connectors, pendingConnector } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const [open, setOpen] = useState(false);

  const handleConnect = async (id: string) => {
    const connector = connectors.find((c) => c.id === id);
    if (!connector) return;
    try {
      await connectAsync({ connector });
      toast.success("Wallet connected");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.shortMessage ?? error?.message ?? "Failed to connect");
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
      toast.success("Disconnected");
    } catch (error: any) {
      toast.error(error?.shortMessage ?? error?.message ?? "Failed to disconnect");
    }
  };

  if (isConnected) {
    return (
      <button
        onClick={handleDisconnect}
        className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-light"
      >
        {isConnecting ? "Disconnecting..." : truncateAddress(address) || "Disconnect"}
      </button>
    );
  }

  return (
    <div className="relative text-left">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-brand"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-slate-700 bg-slate-900 shadow-lg">
          {connectors.map((connector) => (
            <button
              key={connector.id}
              disabled={!connector.ready}
              onClick={() => handleConnect(connector.id)}
              className={clsx(
                "block w-full px-4 py-2 text-left text-sm hover:bg-slate-800",
                !connector.ready && "cursor-not-allowed opacity-50"
              )}
            >
              {connector.name}
              {pendingConnector?.id === connector.id ? " (connecting)" : ""}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
