import { createConfig, http } from 'wagmi'
import { mainnet, bsc, polygon } from 'wagmi/chains'
import { WagmiAdapter } from '@reown/appkit-wagmi'

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo'
export const chains = [mainnet, bsc, polygon]

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: chains,
})

export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [polygon.id]: http(),
  },
  connectors: wagmiAdapter.connectors,
  ssr: true,
})
