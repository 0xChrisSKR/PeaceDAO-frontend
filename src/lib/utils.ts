export function shortenAddress(addr: string) {
  if (!addr) return "";
  const normalized = addr.trim();
  if (normalized.length <= 10) {
    return normalized;
  }
  const prefix = normalized.slice(0, 6);
  const suffix = normalized.slice(-4);
  return `${prefix}…${suffix}`;
}
