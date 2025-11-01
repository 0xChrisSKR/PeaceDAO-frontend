'use client';

import { PropsWithChildren, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig, type Config } from 'wagmi';

import { wagmiConfig } from '@/lib/wagmi';

export default function Providers({ children }: PropsWithChildren) {
  const [qc] = useState(() => new QueryClient());

  const config = useMemo(() => wagmiConfig as unknown as Config, []);

  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    </WagmiConfig>
  );
}
