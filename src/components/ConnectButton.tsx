"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="rounded-lg border border-neutral-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        Disconnect {address?.slice(0, 6)}…{address?.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connect()}
      disabled={isPending}
      className="rounded-lg border border-neutral-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Connecting…" : "Connect Wallet (Injected)"}
    </button>
  );
}
