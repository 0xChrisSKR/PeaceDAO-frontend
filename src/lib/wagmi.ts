// src/lib/wagmi.ts
'use client';

import { createConfig, http } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

const NETWORK = (process.env.NEXT_PUBLIC_NETWORK || 'bsctest').toLowerCase();
export const chains = NETWORK === 'bsc' ? [bsc] : [bscTestnet];

// 可選：自訂 RPC（留空就用 wagmi 預設）
const RPC_BSC = process.env.NEXT_PUBLIC_RPC_BSC || undefined;
const RPC_BSC_TEST = process.env.NEXT_PUBLIC_RPC_BSC_TEST || undefined;

const transports: Record<number, ReturnType<typeof http>> = {};
for (const c of chains) {
  if (c.id === bsc.id && RPC_BSC) transports[c.id] = http(RPC_BSC);
  else if (c.id === bscTestnet.id && RPC_BSC_TEST) transports[c.id] = http(RPC_BSC_TEST);
  else transports[c.id] = http(); // fallback
}

export const wagmiConfig = createConfig({
  chains,
  connectors: [injected()],
  transports,
  ssr: true,
});
