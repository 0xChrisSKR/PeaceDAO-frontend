"use client";
import React, { useState } from "react";
import { parseEther } from "viem";
import { getWalletClient } from "../lib/viem";

const explorers: Record<number, string> = {
  1:"https://etherscan.io",
  56:"https://bscscan.com",
  8453:"https://basescan.org",
  42161:"https://arbiscan.io",
};
const CHAIN_ID = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 56);
const EXPLORER = explorers[CHAIN_ID] || "";

export default function DonateCard() {
  const [amt, setAmt] = useState("0.01");
  const [hash, setHash] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const to = (process.env.NEXT_PUBLIC_DONATION_ADDRESS || "") as `0x${string}`;

  async function donate() {
    if (!to) return alert("Donation address 未設定");
    setBusy(true); setHash(null);
    try {
      const wallet = await getWalletClient();
      const tx = await wallet.sendTransaction({ to, value: parseEther(amt as `${number}`) });
      setHash(tx);
    } catch (e:any) {
      console.error(e); alert(e?.message || String(e));
    } finally { setBusy(false); }
  }

  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Donate</h3>
      <div className="small mono" style={{wordBreak:"break-all"}}>To: {to || "(unset)"}</div>
      <div className="row" style={{marginTop:8}}>
        <input value={amt} onChange={e=>setAmt(e.target.value)} className="mono"
               placeholder="Amount (ETH/BNB)" style={{flex:1,padding:10,borderRadius:10,border:"1px solid #2a2a2a",background:"#0d0f15",color:"#fff"}}/>
        <button className="btn" onClick={donate} disabled={busy || !to}>{busy?"Donating...":"Donate"}</button>
      </div>
      {hash && <div className="small mono" style={{marginTop:8}}>
        Tx: {EXPLORER ? <a href={`${EXPLORER}/tx/${hash}`} target="_blank" rel="noreferrer">在瀏覽器查看</a> : hash}
      </div>}
    </div>
  );
}
