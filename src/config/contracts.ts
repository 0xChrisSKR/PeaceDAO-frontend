import localAddresses from "./addresses.local.json";

type AddressKey = "DONATION_ADDRESS" | "TREASURY_ADDRESS" | "GOVERNANCE_ADDRESS";
type AddressBook = Record<string, Partial<Record<AddressKey, string>>>;

const FALLBACKS = localAddresses as AddressBook;
const rawChainId =
  process.env.NEXT_PUBLIC_CHAIN_ID ||
  (typeof window === "undefined" ? process.env.CHAIN_ID : undefined) ||
  "56";

const chainFallback = FALLBACKS[String(rawChainId)] || {};

const addresses = {
  DONATION_ADDRESS:
    process.env.NEXT_PUBLIC_DONATION_ADDRESS ||
    (typeof window === "undefined" ? process.env.DONATION_ADDRESS : undefined) ||
    chainFallback.DONATION_ADDRESS ||
    "",
  TREASURY_ADDRESS:
    process.env.NEXT_PUBLIC_TREASURY_ADDRESS ||
    (typeof window === "undefined" ? process.env.TREASURY_ADDRESS : undefined) ||
    chainFallback.TREASURY_ADDRESS ||
    "",
  GOVERNANCE_ADDRESS:
    process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS ||
    (typeof window === "undefined" ? process.env.GOVERNANCE_ADDRESS : undefined) ||
    chainFallback.GOVERNANCE_ADDRESS ||
    "",
} as const satisfies Record<AddressKey, string>;

export const CONTRACTS = addresses;
