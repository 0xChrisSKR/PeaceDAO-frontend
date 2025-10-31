import { createAppKit } from '@reown/appkit'
import { wagmiAdapter, projectId } from '@/wagmi/config'

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
})
