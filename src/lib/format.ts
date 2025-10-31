import { formatUnits, parseUnits } from "viem";

export function toWei(amount: string | number, decimals = 18) {
  const value = typeof amount === "number" ? amount.toString() : amount;
  return parseUnits(value || "0", decimals);
}

export function fromWei(value: bigint | null | undefined, decimals = 18) {
  const normalized = typeof value === "bigint" ? value : BigInt(0);
  return formatUnits(normalized, decimals);
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
