import { bsc as baseBsc, bscTestnet as baseBscTestnet } from "wagmi/chains";
import { http } from "wagmi";
import env from "@/config/env";

function withEnvRpc(chain: typeof baseBsc, rpcUrl?: string) {
  if (!rpcUrl) return chain;
  return {
    ...chain,
    rpcUrls: {
      ...chain.rpcUrls,
      default: { http: [rpcUrl] },
      public: { http: [rpcUrl] }
    }
  } as typeof chain;
}

export const bsc = withEnvRpc(baseBsc, env.rpcBsc);
export const bscTestnet = withEnvRpc(baseBscTestnet, env.rpcBscTest);

export const CHAINS = [bsc, bscTestnet];

export const DEFAULT_CHAIN = env.defaultNetwork === "bsc" ? bsc : bscTestnet;

export const transports = {
  [bsc.id]: http(bsc.rpcUrls.default.http[0]),
  [bscTestnet.id]: http(bscTestnet.rpcUrls.default.http[0])
};
