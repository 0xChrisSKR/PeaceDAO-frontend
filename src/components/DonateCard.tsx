'use client';
import React, { useEffect, useState } from 'react';
import { connectWallet, sendTransaction } from '@/lib/wallet';

const TO = process.env.NEXT_PUBLIC_DONATION_ADDRESS || '0x0000000000000000000000000000000000000000';

export default function DonateCard() {
  const [account, setAccount] = useState<string>('');
  const [amount, setAmount] = useState('0.001');
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const anyWin = window as any;
      if (anyWin.ethereum || anyWin.okxwallet || anyWin.bitkeep?.ethereum) {
        setHasWallet(true);
      }
    }
  }, []);

  async function handleConnect() {
    try {
      setError('');
      const acc = await connectWallet();
      setAccount(acc);
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function handleDonate() {
    try {
      setError('');
      setHash('');
      const tx = await sendTransaction(TO, amount, account);
      setHash(tx);
    } catch (e: any) {
      setError(e.message);
    }
  }

  if (!hasWallet) {
    return (
      <div style={{ background: '#111', color: '#f55', padding: 24, borderRadius: 12, textAlign: 'center' }}>
        <p>
          <b>No wallet found</b>
        </p>
        <p style={{ fontSize: 14, opacity: 0.8 }}>
          請使用 <b>MetaMask</b> 或 <b>OKX Wallet</b> App 開啟此頁面
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'linear-gradient(180deg,#1b1b1b 0%,#000 100%)',
        color: '#fff',
        padding: 24,
        borderRadius: 12,
        maxWidth: 420,
        margin: 'auto',
        boxShadow: '0 0 20px rgba(255,255,255,0.05)',
      }}
    >
      <h2 style={{ marginBottom: 10, textAlign: 'center' }}>🌍 WorldPeace DAO</h2>
      <p style={{ textAlign: 'center', fontSize: 14, opacity: 0.8 }}>
        建立以代幣驗證為核心的社群治理。連結錢包，自動分級，解鎖聊天室與提案權限。
      </p>

      <div style={{ marginTop: 20 }}>
        <label style={{ fontSize: 14, opacity: 0.7 }}>捐款金額 (ETH)</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: '100%',
            padding: 10,
            marginTop: 6,
            borderRadius: 8,
            border: '1px solid #333',
            background: '#111',
            color: '#fff',
          }}
        />
      </div>

      <button
        onClick={account ? handleDonate : handleConnect}
        style={{
          marginTop: 16,
          width: '100%',
          padding: 12,
          borderRadius: 8,
          background: account ? '#0f0' : '#09f',
          border: 'none',
          color: '#000',
          fontWeight: 600,
        }}
      >
        {account ? '🚀 發送交易' : '🔗 連接錢包'}
      </button>

      {account && (
        <p style={{ marginTop: 10, fontSize: 13, opacity: 0.8, textAlign: 'center' }}>
          已連接: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      )}

      {hash && (
        <p style={{ marginTop: 10, fontSize: 13, textAlign: 'center' }}>
          ✅ 成功送出交易
          <br />
          <small>{hash.slice(0, 10)}...</small>
        </p>
      )}

      {error && (
        <p style={{ marginTop: 10, fontSize: 13, color: '#f55', textAlign: 'center' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
