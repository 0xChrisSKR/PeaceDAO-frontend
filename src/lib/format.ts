export function shortAddr(a?: string, left = 6, right = 4) {
  if (!a) return '';
  return a.length > left + right ? `${a.slice(0, left)}…${a.slice(-right)}` : a;
}
export function formatBNB(wei: bigint, decimals = 4) {
  const num = Number(wei) / 1e18;
  return num.toFixed(decimals);
}
