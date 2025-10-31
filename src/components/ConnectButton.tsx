"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectButton() {
  const { isConnected, address } = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    const short = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "Connected";
    return (
      <button
        onClick={() => disconnect()}
        className="rounded-lg px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white"
      >
        {short} · 斷開
      </button>
    );
  }

  // 優先用第一個連接器（Injected: OKX / MetaMask 等）
  const primary = connectors[0];
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => connect({ connector: primary })}
        disabled={status === "pending"}
        className="rounded-lg px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white disabled:opacity-60"
      >
        {status === "pending" ? "連線中…" : "連接錢包（Injected）"}
      </button>
      {connectors.length > 1 && (
        <button
          onClick={() => connect({ connector: connectors[1] })}
          className="rounded-lg px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white"
        >
          用 WalletConnect 掃碼
        </button>
      )}
      {error && <span className="text-red-400 text-sm">{String(error.message || error)}</span>}
    </div>
  );
}
