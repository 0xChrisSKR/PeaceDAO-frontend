import { bsc as baseBsc } from "wagmi/chains";
import { http } from "viem";
import { env } from "@/config/env";

const defaultRpcList = baseBsc?.rpcUrls?.default?.http ?? [];
const rpcUrl = env.rpcBsc || defaultRpcList[0] || "https://rpc.ankr.com/bsc";

export const bsc = {
  ...baseBsc,
  rpcUrls: {
    ...baseBsc.rpcUrls,
    default: { http: [rpcUrl] },
    public: { http: [rpcUrl] }
  }
} as const;

export const CHAINS = [bsc] as const;
export const DEFAULT_CHAIN = bsc;

export const transports = {
  [bsc.id]: http(rpcUrl)
};
