export interface TokenInfo {
  chainId: number;
  address: `0x${string}` | string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  isNative?: boolean;
}

export interface TokenList {
  name: string;
  timestamp?: string;
  version?: {
    major: number;
    minor: number;
    patch: number;
  };
  tokens: TokenInfo[];
}
