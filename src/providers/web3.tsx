// src/providers/web3.tsx
'use client'

import { ReactNode } from 'react'
import { WagmiProvider, createConfig, http } from 'wagmi'
import type { Chain } from 'wagmi/chains'
import { mainnet, polygon, bsc } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// ← 用 tuple（readonly [Chain, ...Chain[]]）避免你剛剛的 chains 型別錯誤
const chains = [mainnet, polygon, bsc] as const satisfies readonly [Chain, ...Chain[]]

const config = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),                // 可換成你的 RPC
    [polygon.id]: http(),
    [bsc.id]: http(),                    // 也可放自訂 BSC RPC
  },
})

const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
