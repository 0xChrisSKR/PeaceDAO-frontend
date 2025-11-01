// Centralized public runtime config pulled from NEXT_PUBLIC_*
// Expose both `env` (default) and named `ENV` for legacy imports.
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
};

// Type helper
export type Env = typeof env;

// Export both styles so existing imports keep working
export default env;
export const ENV = env;
