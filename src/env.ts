// Centralized, typed env access for both server & client
// Only expose NEXT_PUBLIC_* to the browser
export const env = {
  PEACE_FUND: process.env.NEXT_PUBLIC_PEACE_FUND ?? "auto",
  GOVERNANCE_API_BASE: process.env.NEXT_PUBLIC_GOVERNANCE_API_BASE ?? "",
} as const;

export type Env = typeof env;
