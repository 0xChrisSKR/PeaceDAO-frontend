type EIP1193Provider = {
  request(args: { method: string; params?: unknown[] }): Promise<any>;
  on?(event: string, listener: (...args: any[]) => void): void;
  removeListener?(event: string, listener: (...args: any[]) => void): void;
};

function resolveProvider(): EIP1193Provider | undefined {
  if (typeof window === 'undefined') return undefined;
  const w = window as any;
  return w.ethereum || w.okxwallet || w.bitkeep?.ethereum || w.BinanceChain;
}

export function getWalletProvider(): EIP1193Provider | undefined {
  return resolveProvider();
}

export async function connectWallet() {
  const provider = resolveProvider();
  if (!provider) throw new Error('No wallet found');
  const [account] = await provider.request({ method: 'eth_requestAccounts' });
  return account as string;
}

export async function getAccounts(): Promise<string[]> {
  const provider = resolveProvider();
  if (!provider) return [];
  try {
    const accounts = await provider.request({ method: 'eth_accounts' });
    return Array.isArray(accounts) ? (accounts as string[]) : [];
  } catch (error) {
    console.warn('Failed to fetch accounts', error);
    return [];
  }
}

export async function getChainId(): Promise<number | null> {
  const provider = resolveProvider();
  if (!provider) return null;
  try {
    const chainHex = await provider.request({ method: 'eth_chainId' });
    if (typeof chainHex === 'string') return parseInt(chainHex, 16);
    if (typeof chainHex === 'number') return chainHex;
    return null;
  } catch (error) {
    console.warn('Failed to fetch chain id', error);
    return null;
  }
}

export function watchAccounts(callback: (accounts: string[]) => void) {
  const provider = resolveProvider();
  if (provider && typeof provider.on === 'function') {
    const handler = (accounts: unknown) => {
      if (Array.isArray(accounts)) callback(accounts as string[]);
      else callback([]);
    };
    provider.on('accountsChanged', handler);
    return () => provider.removeListener?.('accountsChanged', handler);
  }
  return () => {};
}

export function watchChainId(callback: (chainId: number) => void) {
  const provider = resolveProvider();
  if (provider && typeof provider.on === 'function') {
    const handler = (chain: unknown) => {
      if (typeof chain === 'string') callback(parseInt(chain, 16));
      else if (typeof chain === 'number') callback(chain);
    };
    provider.on('chainChanged', handler);
    return () => provider.removeListener?.('chainChanged', handler);
  }
  return () => {};
}

export async function switchChain(chainId: number, chainData?: {
  chainName?: string;
  nativeCurrency?: { name: string; symbol: string; decimals: number };
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
}) {
  const provider = resolveProvider();
  if (!provider) throw new Error('No wallet provider found');
  const hexChainId = `0x${chainId.toString(16)}`;
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }],
    });
  } catch (error: any) {
    if ((error?.code === 4902 || error?.code === -32603) && chainData) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: hexChainId,
            chainName: chainData.chainName,
            nativeCurrency: chainData.nativeCurrency,
            rpcUrls: chainData.rpcUrls,
            blockExplorerUrls: chainData.blockExplorerUrls,
          },
        ],
      });
      return;
    }
    throw error;
  }
}

export async function sendTransaction(to: string, amountEth: string, from?: string) {
  const provider = resolveProvider();
  if (!provider) throw new Error('No wallet provider found');
  const [i, f = ''] = amountEth.split('.');
  const wei = (
    BigInt(i || '0') * 10n ** 18n +
    BigInt((f + '000000000000000000').slice(0, 18))
  ).toString(16);
  const tx = await provider.request({
    method: 'eth_sendTransaction',
    params: [{ from, to, value: '0x' + wei }],
  });
  return tx as string;
}
