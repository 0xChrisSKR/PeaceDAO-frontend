'use client';

import { PropsWithChildren, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, base, bsc, optimism, avalanche } from 'wagmi/chains';

function pickChain() {
  const idStr = process.env.NEXT_PUBLIC_CHAIN_ID ?? '';
  const id = Number(idStr);
  const map: Record<number, any> = {
    [mainnet.id]: mainnet,
    [polygon.id]: polygon,
    [arbitrum.id]: arbitrum,
    [base.id]: base,
    [bsc.id]: bsc,
    [optimism.id]: optimism,
    [avalanche.id]: avalanche,
  };
  return map[id] ?? mainnet;
}

export default function Providers({ children }: PropsWithChildren) {
  const [qc] = useState(() => new QueryClient());

  const chain = pickChain();
  const rpc = process.env.NEXT_PUBLIC_RPC_HTTP;
  const config = useMemo(() => {
    return createConfig({
      chains: [chain],
      transports: {
        [chain.id]: rpc ? http(rpc) : http(),
      },
    });
  }, [chain, rpc]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
