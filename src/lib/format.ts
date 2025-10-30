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

export function formatTokenAmount(
  value: bigint | undefined,
  decimals = 18,
  maximumFractionDigits = 2
) {
  if (typeof value === "undefined") return "0";
  const formatted = formatUnits(value, decimals);
  const [integerPart, fractionPart] = formatted.split(".");
  const withThousands = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (!fractionPart || Number.parseInt(fractionPart, 10) === 0) {
    return withThousands;
  }
  const trimmedFraction = fractionPart.slice(0, maximumFractionDigits).replace(/0+$/, "");
  return trimmedFraction ? `${withThousands}.${trimmedFraction}` : withThousands;
}
