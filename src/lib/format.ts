function parseUnits(value: string, decimals = 18): bigint {
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("Invalid decimals");
  }

  const trimmed = value.trim();
  if (!trimmed) return 0n;

  const negative = trimmed.startsWith("-");
  if (negative) {
    throw new Error("Negative values are not supported");
  }

  const [wholePart, fractionPart = ""] = trimmed.split(".");
  if (!/^\d*$/.test(wholePart) || !/^\d*$/.test(fractionPart)) {
    throw new Error("Invalid numeric value");
  }

  const whole = wholePart ? BigInt(wholePart) : 0n;
  const fraction = fractionPart
    ? BigInt((fractionPart + "0".repeat(decimals)).slice(0, decimals))
    : 0n;

  return whole * 10n ** BigInt(decimals) + fraction;
}

function formatUnits(value: bigint, decimals = 18): string {
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("Invalid decimals");
  }

  const divisor = 10n ** BigInt(decimals);
  const negative = value < 0n;
  const absolute = negative ? -value : value;
  const whole = absolute / divisor;
  const fraction = absolute % divisor;

  if (decimals === 0) {
    return `${negative ? "-" : ""}${whole.toString()}`;
  }

  const fractionStr = fraction
    .toString()
    .padStart(decimals, "0")
    .replace(/0+$/, "");

  const formatted = fractionStr ? `${whole.toString()}.${fractionStr}` : whole.toString();
  return negative ? `-${formatted}` : formatted;
}

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
