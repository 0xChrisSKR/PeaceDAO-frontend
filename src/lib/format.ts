import { formatUnits, parseUnits } from "viem";

export function toWei(amount: string | number, decimals = 18) {
  const value = typeof amount === "number" ? amount.toString() : amount;
  return parseUnits(value || "0", decimals);
}

export function fromWei(value: bigint, decimals = 18) {
  return formatUnits(value ?? 0n, decimals);
}

export function parseByDecimals(value: string, decimals: number) {
  return parseUnits(value || "0", decimals);
}

export function formatNumber(value: string | number | bigint, maximumFractionDigits = 4) {
  const numeric = typeof value === "bigint" ? Number(value) : Number(value);
  if (Number.isNaN(numeric)) return "0";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: 0
  }).format(numeric);
}

export function shortenAddress(address: string | undefined, chars = 4) {
  if (!address) return "-";
  if (address.startsWith("0x") && address.length > 2 + chars * 2) {
    return `${address.slice(0, 2 + chars)}…${address.slice(-chars)}`;
  }
  if (address.length > chars * 2) {
    return `${address.slice(0, chars)}…${address.slice(-chars)}`;
  }
  return address;
}
