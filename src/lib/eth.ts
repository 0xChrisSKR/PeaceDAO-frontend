import { BSC } from './chain';

export type EIP1193Provider = {
  request: (args: { method: string; params?: any[] | object }) => Promise<any>;
  on?: (event: string, handler: (...args: any[]) => void) => void;
  removeListener?: (event: string, handler: (...args: any[]) => void) => void;
};

export function getProvider(): EIP1193Provider | null {
  if (typeof window === 'undefined') return null;
  return (window as any).ethereum ?? null;
}

export async function switchToBsc() {
  const p = getProvider();
  if (!p) throw new Error('No wallet found');
  try {
    await p.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: BSC.chainIdHex }] });
  } catch (e: any) {
    // 若尚未加入鏈，嘗試新增
    if (e?.code === 4902) {
      await p.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: BSC.chainIdHex,
          chainName: BSC.chainName,
          rpcUrls: BSC.rpcUrls,
          nativeCurrency: BSC.nativeCurrency,
          blockExplorerUrls: BSC.blockExplorerUrls
        }]
      });
    } else {
      throw e;
    }
  }
}

export async function connectBsc(): Promise<string[]> {
  const p = getProvider();
  if (!p) throw new Error('No wallet found');
  await switchToBsc();
  const accounts = await p.request({ method: 'eth_requestAccounts' });
  return accounts as string[];
}

export async function accounts(): Promise<string[]> {
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

export async function sendBNB(to: string, valueWei: bigint): Promise<string> {
  const p = getProvider();
  if (!p) throw new Error('No wallet found');
  await switchToBsc();
  const txHash = await p.request({
    method: 'eth_sendTransaction',
    params: [{ to, value: '0x' + valueWei.toString(16) }]
  });
  return txHash as string;
}
