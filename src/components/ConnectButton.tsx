"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectButton() {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status } = useConnect();
  const { disconnect } = useDisconnect();

  const short = (a?: `0x${string}`) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : "");

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="rounded-lg px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm"
      >
        {short(address)} · 斷開
      </button>
    );
  }

  const primary = connectors[0];

  return (
    <button
      onClick={() => primary && connect({ connector: primary })}
      disabled={status === "pending" || !primary}
      className="rounded-lg px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-sm disabled:opacity-60"
    >
      {status === "pending" ? "連線中…" : "連接錢包"}
    </button>
  );
}
