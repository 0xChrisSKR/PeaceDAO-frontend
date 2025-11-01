export function isAddress(value: unknown): value is `0x${string}` {
  if (typeof value !== "string") return false;
  return /^0x[0-9a-fA-F]{40}$/.test(value);
}
