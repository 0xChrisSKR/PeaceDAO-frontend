"use client";
import { createPublicClient, createWalletClient, http, custom } from "viem";
import { getChainFromEnv } from "./chain";

const rpc = process.env.NEXT_PUBLIC_RPC_HTTP; // NEXT_PUBLIC 會在 build 被替換，前端安全
const chain = getChainFromEnv();

export function getPublicClient() {
  return createPublicClient({ chain, transport: rpc ? http(rpc) : http() });
}

export async function getWalletClient() {
  if (typeof window === "undefined") throw new Error("No window");
  const eth = (window as any).ethereum;
  if (!eth) throw new Error("No wallet found (window.ethereum)");
  const accounts: string[] = await eth.request({ method: "eth_requestAccounts" });
  return createWalletClient({ chain, account: accounts[0] as `0x${string}`, transport: custom(eth) });
}
