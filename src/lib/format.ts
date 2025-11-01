export function shortAddr(a?: string, left = 6, right = 4) {
  if (!a) return '';
  return a.length > left + right ? `${a.slice(0, left)}…${a.slice(-right)}` : a;
}
export function formatEth(wei: bigint, decimals = 4) {
  const ether = Number(wei) / 1e18;
  return ether.toFixed(decimals);
}
