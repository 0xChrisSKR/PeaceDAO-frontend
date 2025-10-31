'use client';
import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { bsc, bscTestnet, mainnet } from 'wagmi/chains';
import { injected } from '@wagmi/connectors';

// wagmi v2 config
const config = createConfig({
  connectors: [
    injected({ shimDisconnect: true })
  ],
  chains: [bsc, bscTestnet, mainnet],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [mainnet.id]: http()
  },
  ssr: true
});

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}
