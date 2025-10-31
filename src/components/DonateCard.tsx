"use client";
import { useState } from "react";
import { connectWallet, sendTransaction } from "@/lib/wallet";

export default function DonateCard() {
  const [account, setAccount] = useState<string>('');
  const [amount, setAmount] = useState('0.001');
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');
  const toAddress = process.env.NEXT_PUBLIC_DONATION_ADDRESS || '0x0000000000000000000000000000000000000000';

  async function handleConnect() {
    try {
      setError('');
      const acc = await connectWallet();
      setAccount(acc);
    } catch (err: any) {
      setError(err?.message ?? 'Unable to connect wallet');
    }
  }

  async function handleDonate() {
    try {
      setError('');
      setHash('');
      const tx = await sendTransaction(toAddress, amount, account);
      setHash(tx);
    } catch (err: any) {
      setError(err?.message ?? 'Transaction failed');
    }
  }

  return (
    <div style={{ border: '1px solid #333', padding: 20, borderRadius: 12, maxWidth: 360 }}>
      <h3>PeaceDAO Donation</h3>
      <p>To: {toAddress.slice(0, 6)}…{toAddress.slice(-4)}</p>
      <input
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <button
        onClick={account ? handleDonate : handleConnect}
        style={{ width: '100%', padding: 8 }}
      >
        {account ? 'Send' : 'Connect Wallet'}
      </button>
      {account && <p style={{ marginTop: 8 }}>From: {account.slice(0, 6)}…{account.slice(-4)}</p>}
      {hash && <p style={{ marginTop: 8 }}>Tx: {hash.slice(0, 10)}…</p>}
      {error && <p style={{ marginTop: 8, color: 'red' }}>{error}</p>}
    </div>
  );
}
