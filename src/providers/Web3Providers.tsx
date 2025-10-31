'use client';
import React from 'react';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { bsc, bscTestnet, mainnet } from 'wagmi/chains';
import { createPublicClient } from 'viem';
import { injected } from 'wagmi/connectors';

// === wagmi v1 style config ===
const chains = [bsc, bscTestnet, mainnet];

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({ chain: bsc, transport: http() }),
  connectors: [
    injected({ shimDisconnect: true })
  ],
  chains
});

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
