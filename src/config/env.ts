// Centralized public runtime config pulled from NEXT_PUBLIC_*
// Expose both `env` (default) and legacy/named helpers.

export type Network = 'bsc' | 'bsctest';

const _network =
  (process.env.NEXT_PUBLIC_NETWORK ??
    process.env.NEXT_PUBLIC_CHAIN ??
    'bsc') as Network;

export const env = {
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
  // social links
  twitter: process.env.NEXT_PUBLIC_TWITTER ?? process.env.NEXT_PUBLIC_TWITTER_URL ?? '',
  // typed network
  NETWORK: _network,

  // ---- camelCase aliases for compatibility (chains.ts expects these) ----
  rpcBsc: process.env.NEXT_PUBLIC_RPC_BSC ?? '',
  rpcBscTest: process.env.NEXT_PUBLIC_RPC_BSC_TEST ?? '',
};

export type Env = typeof env;

// Default export
export default env;

// Legacy named exports / aliases
export const ENV = env;
export const WHITEPAPER_URL = env.WHITEPAPER_URL;
export const TWITTER_URL = env.twitter;
export const NETWORK = env.NETWORK;
