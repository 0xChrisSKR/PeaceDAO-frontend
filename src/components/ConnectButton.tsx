'use client'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (!isConnected) {
    const first = connectors[0]
    return (
      <button onClick={() => first && connect({ connector: first })} disabled={!first || isPending}>
        {isPending ? 'Connecting…' : 'Connect Wallet'}
      </button>
    )
  }
  return <button onClick={() => disconnect()}>Disconnect {address?.slice(0, 6)}…</button>
}
