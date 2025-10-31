import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = { title: 'PeaceDAO', description: 'token-verified chat & governance' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
