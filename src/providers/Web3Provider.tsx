'use client';

import { ReactNode } from 'react';
import { createConfig, WagmiConfig, http } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';

// === 讀 .env ===
const NETWORK = process.env.NEXT_PUBLIC_NETWORK ?? 'bsc'; // 'bsc' | 'bscTestnet'
const PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // WalletConnect
if (!PROJECT_ID) {
  // 方便你在 dev 立刻知道少了什麼
  // eslint-disable-next-line no-console
  console.warn('Missing NEXT_PUBLIC_WC_PROJECT_ID');
}

const CHAINS = NETWORK === 'bsc' ? [bsc] : [bscTestnet];

// wagmi 配置
export const wagmiConfig = createConfig({
  chains: CHAINS,
  transports: CHAINS.reduce((acc, chain) => {
    acc[chain.id] = http(); // 也可換成 http(process.env.NEXT_PUBLIC_RPC_BSC!)
    return acc;
  }, {} as Record<number, ReturnType<typeof http>>),
  multiInjectedProviderDiscovery: true
});

// **關鍵**：在模組頂層呼叫一次
createWeb3Modal({
  wagmiConfig,
  projectId: PROJECT_ID ?? 'demo_project_id',
  enableAnalytics: true,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#f59e0b' // 金色調（可改）
  }
});

export default function Web3Provider({ children }: { children: ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
