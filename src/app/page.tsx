'use client'
import { ConnectButton } from '@/components/ConnectButton'
export default function Page() {
  return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '60vh', gap: 16 }}>
      <h1>PeaceDAO</h1>
      <ConnectButton />
      {/* Web3Modal will attach a button if you prefer: <w3m-button /> */}
    </main>
  )
}
