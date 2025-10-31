'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Web3Provider } from '@/providers/web3'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [qc] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={qc}>
      <Web3Provider>{children}</Web3Provider>
    </QueryClientProvider>
  )
}
