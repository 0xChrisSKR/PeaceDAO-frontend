import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { mainnet, bsc, polygon } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

const chains = [mainnet, bsc, polygon];
export const config = defaultWagmiConfig({ chains, projectId });

export function ensureWeb3Modal() {
  if (typeof window !== 'undefined') {
    createWeb3Modal({ wagmiConfig: config, projectId });
  }
}
