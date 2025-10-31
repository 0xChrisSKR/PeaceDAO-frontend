import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-wagmi'
import { wagmiConfig } from '@/wagmi/config'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo'
const wagmiAdapter = new WagmiAdapter({ wagmiConfig })

export const appKit = typeof window !== 'undefined'
  ? createAppKit({
      adapters: [wagmiAdapter],
      projectId,
    })
  : undefined
