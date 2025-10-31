'use client';

import { ReactNode } from 'react';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import { mainnet, bsc, polygon, arbitrum, optimism, sepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/** ============ 環境變數 ============ */
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'demo-project-id';

const RPC: Record<number, string | undefined> = {
  [mainnet.id]: process.env.NEXT_PUBLIC_RPC_MAINNET,
  [bsc.id]: process.env.NEXT_PUBLIC_RPC_BSC,
  [polygon.id]: process.env.NEXT_PUBLIC_RPC_POLYGON,
  [arbitrum.id]: process.env.NEXT_PUBLIC_RPC_ARBITRUM,
  [optimism.id]: process.env.NEXT_PUBLIC_RPC_OPTIMISM,
  [sepolia.id]: process.env.NEXT_PUBLIC_RPC_SEPOLIA
};

/** ！！關鍵：明確標成 tuple，修掉 TS 的 `[Chain, ...Chain[]]` 錯誤 */
const chains: [Chain, ...Chain[]] = [mainnet, bsc, polygon, arbitrum, optimism, sepolia];

const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(RPC[mainnet.id]),
    [bsc.id]: http(RPC[bsc.id]),
    [polygon.id]: http(RPC[polygon.id]),
    [arbitrum.id]: http(RPC[arbitrum.id]),
    [optimism.id]: http(RPC[optimism.id]),
    [sepolia.id]: http(RPC[sepolia.id])
  },
  connectors: [injected(), walletConnect({ projectId, showQrModal: true })]
});

/** 避免「Please call createWeb3Modal…」 */
createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: true,
  themeMode: 'dark'
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
