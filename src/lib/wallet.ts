export async function connectWallet() {
  if (typeof window === 'undefined') throw new Error('Window not ready');
  const anyWin = window as any;
  const provider = anyWin.ethereum || anyWin.okxwallet || anyWin.bitkeep?.ethereum;
  if (!provider) throw new Error('No wallet found');
  const [account] = await provider.request({ method: 'eth_requestAccounts' });
  return account;
}

export async function sendTransaction(to: string, amountEth: string, from?: string) {
  const anyWin = window as any;
  const provider = anyWin.ethereum || anyWin.okxwallet || anyWin.bitkeep?.ethereum;
  if (!provider) throw new Error('No wallet provider found');
  const [int, frac = ''] = amountEth.split('.');
  const wei = (
    BigInt(int || '0') * 10n ** 18n +
    BigInt((frac + '000000000000000000').slice(0, 18))
  ).toString(16);
  const tx = await provider.request({
    method: 'eth_sendTransaction',
    params: [{ from, to, value: '0x' + wei }],
  });
  return tx;
}
