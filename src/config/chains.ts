import { bsc as baseBsc } from "wagmi/chains";
import { http } from "wagmi";
import env from "@/config/env";

const configuredChainId = Number(env.daoChainId);
const rpcUrl = env.rpcUrl || env.rpcBsc || baseBsc.rpcUrls.default.http[0];

export const bsc = {
  ...baseBsc,
  id: Number.isFinite(configuredChainId) && configuredChainId > 0 ? configuredChainId : baseBsc.id,
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
