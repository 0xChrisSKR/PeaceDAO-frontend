import { createConfig, http } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'

const NETWORK = (process.env.NEXT_PUBLIC_NETWORK ?? 'bsctest').toLowerCase()
const chains = NETWORK === 'bsc' ? [bsc] : [bscTestnet]

const transports = chains.reduce<Record<number, ReturnType<typeof http>>>((acc, chain) => {
  if (chain.id === bsc.id) {
    acc[chain.id] = process.env.NEXT_PUBLIC_RPC_BSC ? http(process.env.NEXT_PUBLIC_RPC_BSC) : http()
  } else if (chain.id === bscTestnet.id) {
    acc[chain.id] = process.env.NEXT_PUBLIC_RPC_BSC_TEST ? http(process.env.NEXT_PUBLIC_RPC_BSC_TEST) : http()
  } else {
    acc[chain.id] = http()
  }
  return acc
}, {})

export const wagmiConfig = createConfig({
  chains,
  transports,
  ssr: true,
})
