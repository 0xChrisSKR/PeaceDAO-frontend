'use client';

import { ReactNode, useEffect, useState } from 'react';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { walletConnectProvider, EIP6963Connector, injected } from '@web3modal/wagmi';

const PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '';
const NETWORK = process.env.NEXT_PUBLIC_NETWORK || 'bsctest';
const CHAINS = NETWORK === 'bsc' ? [bsc] : [bscTestnet];

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

export default function Web3Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // ✅ 確保只在瀏覽器端呼叫一次
    if (typeof window !== 'undefined') {
      createWeb3Modal({
        wagmiConfig,
        projectId: PROJECT_ID,
        enableAnalytics: false,
        themeMode: 'dark',
        themeVariables: {
          '--w3m-accent': '#f0b90b',
          '--w3m-font-family': 'Roboto, sans-serif',
        },
      });
      setReady(true);
    }
  }, []);

  // 避免 SSR 階段呼叫 useWeb3Modal
  if (!ready) return null;

  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
