'use client'
import { useAccount, useDisconnect } from 'wagmi'
import { appKit } from '@/lib/appkit'

export default function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  if (!isConnected) {
    return (
      <button
        onClick={() => appKit.open()}
        className="rounded-lg px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow hover:scale-105 transition"
      >
        Connect Wallet
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-mono text-gray-200">
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </span>
      <button
        onClick={() => disconnect()}
        className="rounded-lg px-3 py-1 border border-gray-500 text-gray-300 hover:bg-gray-700"
      >
        Disconnect
      </button>
    </div>
  )
}
