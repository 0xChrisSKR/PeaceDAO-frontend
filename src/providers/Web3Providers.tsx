'use client'
import React from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '@/wagmi/config'

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
