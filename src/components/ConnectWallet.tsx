"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  const label = isConnected && address ? `已連結: ${address.slice(0, 6)}...${address.slice(-4)}` : "連結錢包";

  return (
    <button
      onClick={() => (isConnected ? disconnect() : connect())}
      disabled={isPending}
      className="rounded-full bg-amber-500 px-5 py-2 font-semibold text-white shadow transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "連線中…" : label}
    </button>
  );
}
