'use client';
import React from 'react';
import { WagmiConfig, createConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { createPublicClient, http } from 'viem';
import { bsc } from '@/config/chains';

const rpcUrl = bsc.rpcUrls.default.http[0];
const publicClient = createPublicClient({ chain: bsc, transport: http(rpcUrl) });

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains: [bsc] })],
  publicClient,
});

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
