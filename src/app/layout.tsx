import type { ReactNode } from 'react'
import './globals.css'
export const metadata = { title: 'WorldPeace DAO', description: 'DEX Frontend' }
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  )
}
