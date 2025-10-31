'use client'
import type { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config, chains } from '@/lib/wagmi'

const queryClient = new QueryClient()
let hasInitialized = false

// Init Web3Modal (must run on client)
if (typeof window !== 'undefined' && !hasInitialized) {
  createWeb3Modal({
    wagmiConfig: config,
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
    chains
  })
  hasInitialized = true
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
