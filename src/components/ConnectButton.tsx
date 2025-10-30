'use client';

import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export default function ConnectButton() {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <button
      onClick={() => open()}
      className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-400"
    >
      {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect"}
    </button>
  );
}
