'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '../lib/wagmi';
import { ensureWeb3Modal } from '../lib/w3m';

const queryClient = new QueryClient();

/** 提供 wagmi + React Query；同時初始化 Web3Modal（若有 projectId） */
export default function Web3Provider({ children }: { children: React.ReactNode }) {
  // 初始化一次（內部已防重複）
  ensureWeb3Modal();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
