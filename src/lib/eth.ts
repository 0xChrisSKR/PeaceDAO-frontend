export type EIP1193Provider = {
  request: (args: { method: string; params?: any[] | object }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
};

export function getProvider(): EIP1193Provider | null {
  if (typeof window === 'undefined') return null;
  const anyWin = window as any;
  return anyWin.ethereum ?? null;
}

export async function connect(): Promise<string[]> {
  const p = getProvider();
  if (!p) throw new Error('No wallet found');
  const accounts = await p.request({ method: 'eth_requestAccounts' });
  return accounts as string[];
}

export async function currentAccounts(): Promise<string[]> {
  const p = getProvider();
  if (!p) return [];
  return (await p.request({ method: 'eth_accounts' })) as string[];
}

export async function chainIdHex(): Promise<string | null> {
  const p = getProvider();
  if (!p) return null;
  return (await p.request({ method: 'eth_chainId' })) as string;
}

export async function getBalance(address: string): Promise<bigint> {
  const p = getProvider();
  if (!p) throw new Error('No wallet found');
  const hex = await p.request({ method: 'eth_getBalance', params: [address, 'latest'] });
  return BigInt(hex);
}

export async function sendDonation(to: string, valueWei: bigint): Promise<string> {
  const p = getProvider();
  if (!p) throw new Error('No wallet found');
  const tx = await p.request({
    method: 'eth_sendTransaction',
    params: [{ to, value: '0x' + valueWei.toString(16) }]
  });
  return tx as string;
}
