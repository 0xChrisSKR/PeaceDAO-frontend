'use client';

import { ReactNode } from 'react';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { walletConnect, injected } from 'wagmi/connectors';
import env from '@/config/env';

// 依據環境選鏈
const activeChain = env.NETWORK === 'bsctest' ? bscTestnet : bsc;

// 建立 wagmi 基礎設置
const { chains, publicClient } = configureChains([activeChain], [publicProvider()]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    walletConnect({
      projectId: env.WC_PROJECT_ID,
      showQrModal: true,
    }),
    injected({ shimDisconnect: true }),
  ],
  publicClient,
});

// 只在瀏覽器初始化一次 Web3Modal，避免你看到的錯誤
declare global {
  interface Window {
    __W3M_INITIALIZED__?: boolean;
  }
}
if (typeof window !== 'undefined' && !window.__W3M_INITIALIZED__) {
  createWeb3Modal({
    wagmiConfig,
    projectId: env.WC_PROJECT_ID,
    chains,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#f0b90b',     // 幣安金
      '--w3m-color-mix': '#f0b90b',
    },
  });
  window.__W3M_INITIALIZED__ = true;
}

// 封裝成 Provider
export default function Web3Provider({ children }: { children: ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
