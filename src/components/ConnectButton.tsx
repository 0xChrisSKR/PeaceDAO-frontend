"use client";

import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function ConnectButton() {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <button
      onClick={() => open()}
      className="inline-flex items-center rounded-full border border-amber-300/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-300 transition hover:bg-amber-300/10"
    >
      {isConnected ? `${address?.slice(0, 6)}…${address?.slice(-4)}` : "連接錢包"}
    </button>
  );
}
