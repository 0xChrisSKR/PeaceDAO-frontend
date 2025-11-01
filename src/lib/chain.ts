import { defineChain } from "viem";
import { mainnet, bsc, base, arbitrum } from "viem/chains";

export const BSC = {
  chainIdHex: "0x38", // 56
  chainId: 56,
  rpcUrls: ["https://bsc-dataseed.binance.org"],
  chainName: "BNB Smart Chain",
  nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
  blockExplorerUrls: ["https://bscscan.com"],
} as const;

export function getChainFromEnv() {
  const id = Number(process.env.NEXT_PUBLIC_CHAIN_ID || "56");
  switch (id) {
    case 1:
      return mainnet;
    case 56:
      return bsc;
    case 8453:
      return base;
    case 42161:
      return arbitrum;
    default:
      return defineChain({
        id,
        name: `Chain ${id}`,
        nativeCurrency: { name: "Native", symbol: "NATIVE", decimals: 18 },
        rpcUrls: {
          default: { http: [process.env.NEXT_PUBLIC_RPC_HTTP || ""] },
          public: { http: [process.env.NEXT_PUBLIC_RPC_HTTP || ""] },
        },
      });
  }
}
