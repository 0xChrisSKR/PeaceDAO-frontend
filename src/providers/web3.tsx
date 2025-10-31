'use client'

import React, { useEffect } from 'react'
import { WagmiProvider, createConfig } from 'wagmi'
import { http } from 'viem'
import { mainnet, bsc, bscTestnet } from 'viem/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'

const CHAINS = [mainnet, bsc, bscTestnet] as const

const RPCS: Record<number, string | undefined> = {
  [mainnet.id]: undefined,
  [bsc.id]: process.env.NEXT_PUBLIC_BSC_RPC || process.env.NEXT_PUBLIC_RPC_BSC,
  [bscTestnet.id]:
    process.env.NEXT_PUBLIC_BSCTEST_RPC || process.env.NEXT_PUBLIC_RPC_BSC_TEST
}

export const wagmiConfig = createConfig({
  chains: CHAINS,
  transports: {
    [mainnet.id]: http(RPCS[mainnet.id]),
    [bsc.id]: http(RPCS[bsc.id]),
    [bscTestnet.id]: http(RPCS[bscTestnet.id])
  },
  ssr: true
})

function useInitWeb3ModalOnce() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as any
    if (w.__W3M_INITIALIZED__) return

    const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID
    if (!projectId) {
      console.warn('Missing NEXT_PUBLIC_WC_PROJECT_ID')
      return
    }

    createWeb3Modal({
      wagmiConfig,
      projectId,
      enableAnalytics: false,
      themeMode: 'light'
    })
    w.__W3M_INITIALIZED__ = true
  }, [])
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  useInitWeb3ModalOnce()
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
}
