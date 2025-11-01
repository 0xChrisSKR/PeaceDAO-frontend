import { env } from "@/config/env";
import { DEFAULT_CHAIN } from "@/config/chains";
import { BNB_LOGO, PEACE_LOGO, USDT_LOGO, WBNB_LOGO } from "@/assets/tokens";
import { TOKEN_PLACEHOLDER } from "@/assets/placeholders";
import { isAddress } from "@/lib/address";

type Address = `0x${string}`;

export interface TokenInfo {
  chainId: number;
  address: Address;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  tags?: string[];
}

export interface TokenList {
  name: string;
  logoURI: string;
  keywords: string[];
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  tokens: TokenInfo[];
  metadata: {
    placeholderLogo: string;
    peaceTokenConfigured: boolean;
    routerConfigured: boolean;
  };
}

const BASE_TOKENS: TokenInfo[] = [
  {
    chainId: DEFAULT_CHAIN.id,
    address: "0x0000000000000000000000000000000000000000" as Address,
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
    logoURI: BNB_LOGO,
    tags: ["native"]
  },
  {
    chainId: DEFAULT_CHAIN.id,
    address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c" as Address,
    name: "Wrapped BNB",
    symbol: "WBNB",
    decimals: 18,
    logoURI: WBNB_LOGO
  },
  {
    chainId: DEFAULT_CHAIN.id,
    address: "0x55d398326f99059ff775485246999027b3197955" as Address,
    name: "Tether USD",
    symbol: "USDT",
    decimals: 18,
    logoURI: USDT_LOGO
  }
];

function getPeaceToken(): TokenInfo | null {
  const { peaceToken } = env;
  if (!peaceToken || !isAddress(peaceToken)) {
    return null;
  }
  return {
    chainId: DEFAULT_CHAIN.id,
    address: peaceToken as Address,
    name: "Peace Token",
    symbol: "PEACE",
    decimals: 18,
    logoURI: PEACE_LOGO,
    tags: ["governance"]
  };
}

export function getTokenList(): TokenList {
  const peaceToken = getPeaceToken();
  const tokens = [...BASE_TOKENS];
  if (peaceToken) {
    tokens.push(peaceToken);
  }

  return {
    name: "World Peace DAO Token List",
    logoURI: PEACE_LOGO,
    keywords: ["peace", "dao", "treasury"],
    version: {
      major: 1,
      minor: 0,
      patch: peaceToken ? 0 : 1
    },
    tokens,
    metadata: {
      placeholderLogo: TOKEN_PLACEHOLDER,
      peaceTokenConfigured: Boolean(peaceToken),
      routerConfigured: Boolean(env.peaceSwapRouter && isAddress(env.peaceSwapRouter))
    }
  };
}
