'use client';

import { ReactNode } from 'react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { injected, walletConnect } from 'wagmi/connectors';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import env from '@/config/env';

// --- Chains & clients
const { chains, publicClient } = configureChains(
  // 先走測試鏈，再備用主網；依你的 env.NETWORK 之後可動態切
  [bscTestnet, bsc],
  [publicProvider()]
);

// --- Wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId: env.WC_PROJECT_ID,
      showQrModal: true
    })
  ],
  publicClient
});

// --- 確保 Web3Modal 只在瀏覽器初始化一次（解決：Please call createWeb3Modal 之前）
declare global {
  interface Window { __W3M_CREATED__?: boolean }
}
if (typeof window !== 'undefined' && !window.__W3M_CREATED__) {
  createWeb3Modal({
    wagmiConfig,
    projectId: env.WC_PROJECT_ID,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#f0b90b',
      '--w3m-color-mix': '#f0b90b',
      '--w3m-font-family': 'system-ui'
    },
    chains
  });
  window.__W3M_CREATED__ = true;
}

// --- Provider
export default function Web3Provider({ children }: { children: ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
