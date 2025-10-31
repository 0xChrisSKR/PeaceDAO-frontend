'use client';

import React, { ReactNode, useEffect } from 'react';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { walletConnectProvider, EIP6963Connector, injected } from '@web3modal/wagmi';

// 環境變數
const PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';
const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'bsctest';

const CHAINS = NETWORK === 'bsc' ? [bsc] : [bscTestnet];

// 建立 wagmi 設定
const wagmiConfig = createConfig({
  chains: CHAINS,
  connectors: [
    injected(),
    new EIP6963Connector({ chains: CHAINS }),
    walletConnectProvider({ projectId: PROJECT_ID }),
  ],
  transports: CHAINS.reduce((acc, chain) => {
    acc[chain.id] = http();
    return acc;
  }, {} as Record<number, ReturnType<typeof http>>),
});

// ✅ 保證 createWeb3Modal 只在 client 呼叫一次
let isInitialized = false;
function initModal() {
  if (!isInitialized) {
    createWeb3Modal({
      wagmiConfig,
      projectId: PROJECT_ID,
      enableAnalytics: true,
      themeMode: 'dark',
      themeVariables: {
        '--w3m-accent': '#f0b90b',
        '--w3m-font-family': 'Roboto, sans-serif',
      },
    });
    isInitialized = true;
  }
}

export default function Web3Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    initModal();
  }, []);

  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
