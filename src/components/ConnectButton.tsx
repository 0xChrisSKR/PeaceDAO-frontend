'use client';

import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export default function ConnectButton() {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <button
      onClick={() => open()}
      className="px-3 py-2 rounded-md bg-black text-white text-sm"
    >
      {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : '連接錢包'}
    </button>
  );
}
