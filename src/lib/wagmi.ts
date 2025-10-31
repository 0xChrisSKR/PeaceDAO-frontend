import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, walletConnect, coinbaseWallet } from '@wagmi/connectors'

export const chains = [mainnet]

export const config = createConfig({
  chains,
  transports: { [mainnet.id]: http() },
  connectors: [
    injected(),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! }),
    coinbaseWallet({ appName: 'PeaceDAO' })
  ]
})
