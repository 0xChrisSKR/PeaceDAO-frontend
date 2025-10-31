'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider as _WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, base, bsc, optimism, avalanche } from 'wagmi/chains';

import { ENV } from '@/lib/env';

// ---- TS workaround ----
// 某些 TS 設定下，直接用 <WagmiProvider> 會出現「cannot be used as a JSX component」。
// 用一個明確的 ComponentType 包一層，讓 JSX 判定通過。
type WagmiProviderProps = React.ComponentProps<typeof _WagmiProvider>;
const WagmiProvider =
  _WagmiProvider as unknown as React.ComponentType<WagmiProviderProps>;

function pickChain() {
  const id = ENV.CHAIN_ID;
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

export default function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = React.useState(() => new QueryClient());

  const chain = pickChain();
  const rpc = ENV.RPC_HTTP;
  const config = React.useMemo(() => {
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
