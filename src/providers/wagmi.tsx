'use client';

import { ReactNode, useEffect } from 'react';
import { WagmiProvider, createConfig } from 'wagmi';
import { cookieStorage, createStorage } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import env from '@/config/env';
import { CHAINS, DEFAULT_CHAIN, transports } from '@/config/chains';

const projectId = env.wcProjectId;

const connectors = [
  injected({ shimDisconnect: true })
];

if (projectId) {
  connectors.push(
    walletConnect({
      projectId,
      metadata: {
        name: 'World Peace DAO',
        description: 'Governance and treasury interface for World Peace DAO on BNB Smart Chain.',
        url: 'https://peace.world',
        icons: ['https://raw.githubusercontent.com/PeaceDAO/PeaceDAO-frontend/main/public/assets/ui/hero-banner.png']
      },
      showQrModal: false
    })
  );
}

// wagmi 設定
export const wagmiConfig = createConfig({
  chains: CHAINS,
  transports,
  connectors,
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
    chains: CHAINS,
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
