"use client";
import { useState } from "react";
import { connectWallet } from "@/lib/wallet";

export default function ConnectButton() {
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  async function handleConnect() {
    try {
      setError('');
      const acc = await connectWallet();
      setAccount(acc);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to connect wallet');
    }
  }

  const label = account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet';

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleConnect}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
      >
        {label}
      </button>
      {error && <span className="text-sm text-red-400">{error}</span>}
    </div>
  );
}
