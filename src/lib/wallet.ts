export async function connectWallet() {
  if (typeof window === "undefined" || !(window as any).ethereum)
    throw new Error("No wallet found");
  const provider = (window as any).ethereum;
  const [account] = await provider.request({ method: "eth_requestAccounts" });
  return account as string;
}

export async function sendTransaction(to: string, amountEth: string, from?: string) {
  const provider = (window as any).ethereum;
  const [intPart, fracPart = ""] = amountEth.split(".");
  const wei = (
    BigInt(intPart || "0") * 10n ** 18n +
    BigInt((fracPart + "000000000000000000").slice(0, 18))
  ).toString(16);
  const tx = await provider.request({
    method: "eth_sendTransaction",
    params: [{ from, to, value: "0x" + wei }]
  });
  return tx as string;
}
