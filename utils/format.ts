export const shortenAddress = (address?: string | null, chars = 4) => {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
};

export const formatTokenAmount = (value: string | number | undefined) => {
  if (!value) return '0';
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 4
  }).format(Number(value));
};
