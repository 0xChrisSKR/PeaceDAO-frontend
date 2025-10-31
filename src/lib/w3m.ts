'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { config, chains } from './wagmi'

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID!
let created = false

export function ensureWeb3Modal() {
  if (created || typeof window === 'undefined') return

  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    chains,
    enableAnalytics: false,
    themeMode: 'dark',
    themeVariables: {
      '--w3m-accent': '#f0b90b'
    }
  })

  created = true
}
