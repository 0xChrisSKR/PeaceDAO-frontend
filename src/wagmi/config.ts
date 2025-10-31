import { createConfig, http } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

const NETWORK = (process.env.NEXT_PUBLIC_NETWORK || 'bsctest').toLowerCase()
export const chains = NETWORK === 'bsc' ? [bsc] : [bscTestnet]

const RPC_BSC = process.env.NEXT_PUBLIC_RPC_BSC || undefined
const RPC_BSC_TEST = process.env.NEXT_PUBLIC_RPC_BSC_TEST || undefined

const transports: Record<number, ReturnType<typeof http>> = {}
for (const chain of chains) {
  if (chain.id === bsc.id && RPC_BSC) transports[chain.id] = http(RPC_BSC)
  else if (chain.id === bscTestnet.id && RPC_BSC_TEST) transports[chain.id] = http(RPC_BSC_TEST)
  else transports[chain.id] = http()
}

export const wagmiConfig = createConfig({
  chains,
  transports,
  ssr: true,
})
