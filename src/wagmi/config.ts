import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'

// 若你有特定鏈（如 BSC/OKX X Layer），後續再補進來；先用 mainnet 讓專案可編譯
export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
})
