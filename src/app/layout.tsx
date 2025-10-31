// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Web3Provider } from '@/providers/web3' // 這行要能對到 src/providers/web3.tsx

export const metadata: Metadata = {
  title: 'PeaceDAO',
  description: 'Toward transparent fundraising & community governance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  )
}
