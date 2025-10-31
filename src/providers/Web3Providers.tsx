'use client'
import type { PropsWithChildren } from 'react'
import Providers from '@/app/providers'

export default function Web3Providers({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>
}
