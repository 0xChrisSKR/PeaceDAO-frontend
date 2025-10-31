'use client'
import React from 'react'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '@/wagmi/config'
import { appKit } from '@/lib/appkit'

export default function Web3Providers({ children }: { children: React.ReactNode }) {
  void appKit
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>
}
