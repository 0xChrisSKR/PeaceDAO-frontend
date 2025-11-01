// Centralized public runtime config pulled from NEXT_PUBLIC_*
// Expose both `env` (default) and legacy/named helpers.

export type Network = 'bsc' | 'bsctest';

interface Env {
  PEACE_FUND: string;
  RPC_BSC: string;
  RPC_BSC_TEST: string;
  TOKEN: string;
  TOKEN_ADDRESS: string;
  CONFIG_PATH: string;
  TG_PUBLIC: string;
  TG_VERIFIED: string;
  WC_PROJECT_ID: string;
  WHITEPAPER_URL: string;
  twitter: string;
  NETWORK: Network;
  // camelCase aliases (for chains.ts compatibility)
  rpcBsc: string;
  rpcBscTest: string;
}

const networkFromEnv =
  (process.env.NEXT_PUBLIC_NETWORK ??
    process.env.NEXT_PUBLIC_CHAIN ??
    'bsc') as Network;

export const env: Env = {
  PEACE_FUND: process.env.NEXT_PUBLIC_PEACE_FUND ?? '',
  RPC_BSC: process.env.NEXT_PUBLIC_RPC_BSC ?? '',
  RPC_BSC_TEST: process.env.NEXT_PUBLIC_RPC_BSC_TEST ?? '',
  TOKEN: process.env.NEXT_PUBLIC_TOKEN ?? '',
  TOKEN_ADDRESS: process.env.NEXT_PUBLIC_TOKEN_ADDRESS ?? '',
  CONFIG_PATH: process.env.NEXT_PUBLIC_PEACEDAO_CONFIG_PATH ?? '/api/peace/config',
  TG_PUBLIC: process.env.NEXT_PUBLIC_TG_PUBLIC ?? '',
  TG_VERIFIED: process.env.NEXT_PUBLIC_TG_VERIFIED ?? '',
  WC_PROJECT_ID: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '',
  WHITEPAPER_URL: process.env.NEXT_PUBLIC_WHITEPAPER_URL ?? '',
  twitter: process.env.NEXT_PUBLIC_TWITTER ?? process.env.NEXT_PUBLIC_TWITTER_URL ?? '',
  NETWORK: networkFromEnv,

  // aliases
  rpcBsc: process.env.NEXT_PUBLIC_RPC_BSC ?? '',
  rpcBscTest: process.env.NEXT_PUBLIC_RPC_BSC_TEST ?? '',
};

export type { Env };

// Default export
export default env;

// Legacy named exports / aliases
export const ENV = env;
export const WHITEPAPER_URL = env.WHITEPAPER_URL;
export const TWITTER_URL = env.twitter;
export const NETWORK = env.NETWORK;
