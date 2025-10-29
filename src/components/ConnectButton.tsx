"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import clsx from "clsx";
import toast from "react-hot-toast";

function truncateAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function ConnectButton() {
  const { address, isConnecting, isConnected } = useAccount();
  const { connectAsync, connectors, isPending, variables } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const hasInjectedProvider = useMemo(() => {
    if (typeof window === "undefined") return false;
    return Boolean((window as typeof window & { ethereum?: unknown }).ethereum);
  }, []);

  type ConnectorOption = (typeof connectors)[number];
  type ConnectorWithId = Extract<ConnectorOption, { id: string }>;
  const availableConnectors = connectors.filter(
    (connector): connector is ConnectorWithId => typeof connector !== "function"
  );

  const handleConnect = async (id: string) => {
    const connector = availableConnectors.find((c) => c.id === id);
    if (!connector) return;
    try {
      await connectAsync({ connector });
      toast.success(t("connectButton.toast.connected"));
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.shortMessage ?? error?.message ?? t("connectButton.toast.connectError"));
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
      toast.success(t("connectButton.toast.disconnected"));
    } catch (error: any) {
      toast.error(error?.shortMessage ?? error?.message ?? t("connectButton.toast.disconnectError"));
    }
  };

  if (isConnected) {
    return (
      <button
        onClick={handleDisconnect}
        className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-light"
      >
        {isConnecting ? t("connectButton.button.disconnecting") : truncateAddress(address) || t("connectButton.button.disconnect")}
      </button>
    );
  }

  return (
    <div className="relative text-left">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-brand"
      >
        {isConnecting ? t("connectButton.button.connecting") : t("connectButton.button.connect")}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-slate-700 bg-slate-900 shadow-lg p-2 space-y-2">
          {availableConnectors.map((connector) => {
            const pendingId = (variables?.connector as { id?: string } | undefined)?.id;
            const isConnectorPending = isPending && pendingId === connector.id;

            return (
              <button
                key={connector.id}
                disabled={!connector.ready}
                onClick={() => handleConnect(connector.id)}
                className={clsx(
                  "block w-full rounded-md px-4 py-2 text-left text-sm hover:bg-slate-800",
                  !connector.ready && "cursor-not-allowed opacity-50"
                )}
              >
                {connector.name}
                {isConnectorPending ? ` ${t("connectButton.button.connectorPending")}` : ""}
              </button>
            );
          })}
          {!hasInjectedProvider && (
            <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-100">
              <p className="font-medium">{t("connectButton.warning")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
