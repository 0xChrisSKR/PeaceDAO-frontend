import { bsc as baseBsc } from "wagmi/chains";
import { http } from "wagmi";
import env from "@/config/env";

const rpcUrl = env.rpcBsc || baseBsc.rpcUrls.default.http[0];

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
