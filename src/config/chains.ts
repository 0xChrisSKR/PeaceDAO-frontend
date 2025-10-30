import { bsc as baseBsc, bscTestnet as baseBscTestnet } from "wagmi/chains";
import { http } from "wagmi";
import env from "@/config/env";

const configuredChainId = env.chainId ?? baseBsc.id;
const baseChain = configuredChainId === baseBscTestnet.id ? baseBscTestnet : baseBsc;
const rpcUrl = env.rpcBsc || baseChain.rpcUrls.default.http[0];

export const DEFAULT_CHAIN = {
  ...baseChain,
  rpcUrls: {
    ...baseChain.rpcUrls,
    default: { http: [rpcUrl] },
    public: { http: [rpcUrl] }
  }
} as const;

export const CHAINS = [DEFAULT_CHAIN] as const;

export const transports = {
  [DEFAULT_CHAIN.id]: http(rpcUrl)
};
