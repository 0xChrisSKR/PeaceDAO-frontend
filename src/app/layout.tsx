import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientProviders from '@/providers/client'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PeaceDAO',
  description: 'World Peace DApp'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
