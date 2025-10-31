import { defineChain } from "viem";
import { mainnet, arbitrum, base, bsc, polygon, optimism } from "wagmi/chains";

export function getChainById(id: number) {
  switch (id) {
    case 1: return mainnet;
    case 10: return optimism;
    case 56: return bsc;
    case 137: return polygon;
    case 8453: return base;
    case 42161: return arbitrum;
    default:
      return defineChain({
        id,
        name: `Chain ${id}`,
        network: `chain-${id}`,
        nativeCurrency: { name: "Native", symbol: "NATIVE", decimals: 18 },
        rpcUrls: {
          default: { http: ["https://rpc.ankr.com/eth"] },
          public:  { http: ["https://rpc.ankr.com/eth"] },
        },
      });
  }
}

export function getChainFromEnv() {
  const id = Number(process.env.NEXT_PUBLIC_CHAIN_ID || "56");
  return getChainById(id);
}
