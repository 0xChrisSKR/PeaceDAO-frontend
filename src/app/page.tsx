'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import env from "@/config/env";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/wagmi/react";

const tiers = [
  { min: 1_000_000, label: "提案者 Proposer" },
  { min: 200_000,   label: "投票者 Voter" },
  { min: 15_000,    label: "驗證者 Verifier" },
  { min: 0,         label: "訪客 Guest" },
];

export default function Home() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const [tier, setTier] = useState<string>("—");
  const [balance, setBalance] = useState<number>(0);

  // 取得持幣餘額（示範用假資料，日後接合約查詢）
  useEffect(() => {
    if (!isConnected) return;
    // TODO: 實際接 ERC20 balanceOf
    const simulatedBalance = Math.floor(Math.random() * 2_000_000);
    setBalance(simulatedBalance);
    const matched = tiers.find(t => simulatedBalance >= t.min);
    setTier(matched?.label ?? "Guest");
  }, [isConnected]);

  const handleConnect = async () => {
    if (!isConnected) await open();
  };

  return (
    <>
      {/* 上方橫幅 */}
      <div
        style={{
          background:
            "linear-gradient(90deg,#111 0%,#1c1c1c 40%,#252525 100%)",
          color: "#f5f5f5",
          borderRadius: 16,
          padding: "20px 18px",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>
          🌍 WorldPeace DAO
        </h2>
        <p style={{ margin: "6px 0 10px", fontSize: 13, color: "#ccc" }}>
          Decentralized Peace Fundraising & Governance Platform
        </p>

        {!isConnected ? (
          <button
            onClick={handleConnect}
            style={{
              background: "#f0b90b",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🔗 連結錢包 / Connect Wallet
          </button>
        ) : (
          <div style={{ fontSize: 13 }}>
            <div>地址 Address：{address?.slice(0, 6)}…{address?.slice(-4)}</div>
            <div>餘額 Balance：{balance.toLocaleString()} WPD</div>
            <div>等級 Tier：{tier}</div>
            {balance >= 15000 && (
              <p style={{ marginTop: 6 }}>
                👉 <a
                  href="https://t.me/yourchannel"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#f0b90b", fontWeight: 600 }}
                >
                  加入 TG 驗證群組 (> 15000 WPD)
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      {/* 功能卡片 */}
      <div className="card-grid">
        <div className="card">
          <h3>1️⃣ 募款提案 Proposals</h3>
          <p>提出 受贈對象 / 金額 / 理由 （最高 90% 金庫餘額）。</p>
          <p><Link href="/proposals">進入 →</Link></p>
        </div>

        <div className="card">
          <h3>2️⃣ 提案投票 Vote</h3>
          <p>持幣者投票，票權按持幣量加權，鏈上可驗證。</p>
          <p><Link href="/vote">進入 →</Link></p>
        </div>

        <div className="card">
          <h3>3️⃣ 社群決議 Decisions</h3>
          <p>顯示最終決議與鏈上交易連結。</p>
          <p><Link href="/decisions">進入 →</Link></p>
        </div>

        <div className="card">
          <h3>4️⃣ 募款金庫 Treasury</h3>
          <p>安全機制：僅能由決議合約觸發撥款。</p>
          <p><Link href="/treasury">進入 →</Link></p>
        </div>

        <div className="card">
          <h3>5️⃣ Swap （平台造血）</h3>
          <p>手續費 0.5% → 金庫 50% + 創辦人 50%。</p>
          <p><Link href="/swap">進入 →</Link></p>
        </div>

        <div className="card">
          <h3>📜 白皮書 / 關於 DAO</h3>
          <p><Link href="/whitepaper">白皮書</Link> | <Link href="/about">關於 DApp</Link></p>
        </div>
      </div>
    </>
  );
}
