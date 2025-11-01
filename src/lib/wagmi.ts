// src/lib/wagmi.ts
import { createConfig, http } from 'wagmi';
import { bsc, bscTestnet, mainnet, sepolia, type Chain } from 'wagmi/chains';

const NET = (process.env.NEXT_PUBLIC_NETWORK || 'bsctest').toLowerCase();

export const projectId = (process.env.NEXT_PUBLIC_WC_PROJECT_ID || '').trim();

const ACTIVE_CHAIN: Chain =
  NET === 'bsc' ? bsc :
  NET === 'mainnet' ? mainnet :
  NET === 'sepolia' ? sepolia :
  bscTestnet;

const RPC = (() => {
  if (ACTIVE_CHAIN.id === bsc.id)
    return process.env.NEXT_PUBLIC_BSC_RPC || process.env.NEXT_PUBLIC_RPC_BSC || 'https://bsc-dataseed.binance.org';
  if (ACTIVE_CHAIN.id === bscTestnet.id)
    return process.env.NEXT_PUBLIC_BSCTEST_RPC || process.env.NEXT_PUBLIC_RPC_BSC_TEST || 'https://data-seed-prebsc-1-s1.binance.org:8545';
  if (ACTIVE_CHAIN.id === mainnet.id)
    return process.env.NEXT_PUBLIC_MAINNET_RPC || 'https://eth.llamarpc.com';
  return process.env.NEXT_PUBLIC_SEPOLIA_RPC || 'https://rpc.sepolia.org';
})();

export const wagmiConfig = createConfig({
  chains: [ACTIVE_CHAIN] as const,
  transports: { [ACTIVE_CHAIN.id]: http(RPC) },
  ssr: true,
});

export { ACTIVE_CHAIN as activeChain };
