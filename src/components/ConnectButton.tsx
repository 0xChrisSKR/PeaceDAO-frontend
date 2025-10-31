"use client";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

export default function ConnectButton() {
  const { open } = useAppKit();
  const { isConnected, address } = useAccount();
  const label = isConnected && address
    ? `${address.slice(0,6)}...${address.slice(-4)}`
    : "Connect Wallet";
  return (
    <button onClick={() => open()} className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
      {label}
    </button>
  );
}
