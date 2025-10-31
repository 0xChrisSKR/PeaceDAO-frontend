'use client';

import { ReactNode, useEffect } from 'react';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from '@/lib/wagmi';
import { ensureWeb3Modal } from '@/lib/w3m';

export default function Web3Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // **這一行** 保證在任何 useWeb3Modal 被用到前就先 createWeb3Modal
    ensureWeb3Modal();
  }, []);

  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
