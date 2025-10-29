'use client';

import { ReactNode, useEffect } from 'react';
import { WagmiProvider, createConfig } from 'wagmi';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { cookieStorage, createStorage } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import env from '@/config/env';
import { CHAINS, DEFAULT_CHAIN, transports } from '@/config/chains';

const projectId = env.wcProjectId;

// wagmi 設定
export const wagmiConfig = createConfig({
  chains: CHAINS,
  transports,
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true
});

const queryClient = new QueryClient();

// 只需初始化一次 Web3Modal
let web3ModalInited = false;
function initWeb3Modal() {
  if (web3ModalInited) return;
  if (!projectId) return;
  createWeb3Modal({
    wagmiConfig,
    projectId,
    themeMode: 'light',
    defaultChain: DEFAULT_CHAIN,
    enableAnalytics: false
  });
  web3ModalInited = true;
}

export function Web3Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    initWeb3Modal();
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
