// src/lib/wagmi.ts
import { createConfig, http } from 'wagmi';
import { bsc, bscTestnet, mainnet, sepolia, type Chain } from 'wagmi/chains';

/** 讀取 .env 的網路選項（bsc | bsctest | mainnet | sepolia），預設 bsctest */
const NET = (process.env.NEXT_PUBLIC_NETWORK || 'bsctest').toLowerCase();

/** 依 NET 選擇鏈，確保一定至少有 1 條（不能空陣列） */
const ACTIVE_CHAIN: Chain =
  NET === 'bsc' ? bsc :
  NET === 'mainnet' ? mainnet :
  NET === 'sepolia' ? sepolia :
  bscTestnet; // 預設

/** RPC 端點（帶 env fallback，不填也有預設公共節點） */
const RPC = (() => {
  if (ACTIVE_CHAIN.id === bsc.id)
    return process.env.NEXT_PUBLIC_BSC_RPC || process.env.NEXT_PUBLIC_RPC_BSC || 'https://bsc-dataseed.binance.org';
  if (ACTIVE_CHAIN.id === bscTestnet.id)
    return process.env.NEXT_PUBLIC_BSCTEST_RPC || process.env.NEXT_PUBLIC_RPC_BSC_TEST || 'https://data-seed-prebsc-1-s1.binance.org:8545';
  if (ACTIVE_CHAIN.id === mainnet.id)
    return process.env.NEXT_PUBLIC_MAINNET_RPC || 'https://eth.llamarpc.com';
  // sepolia
  return process.env.NEXT_PUBLIC_SEPOLIA_RPC || 'https://rpc.sepolia.org';
})();

/** wagmi v2：chains 需要是非空 tuple；transports 用 chain.id 對應 */
export const wagmiConfig = createConfig({
  chains: [ACTIVE_CHAIN] as const,
  transports: { [ACTIVE_CHAIN.id]: http(RPC) },
  ssr: true, // Next.js 14 推薦
});

export { ACTIVE_CHAIN as activeChain };
