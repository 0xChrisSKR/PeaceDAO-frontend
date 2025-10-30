# PeaceDAO-frontend

Frontend for World Peace DAO on BNB Smart Chain.

## Overview (English)
- Three staking tiers gate on-chain actions: propose (1,000,000 PEACE), vote (200,000 PEACE), and validator like/dislike (15,000 PEACE).
- Every proposal has a 24-hour voting window; PEACE used to vote or validate is locked until the window closes and can be reclaimed afterwards.
- Validator feedback (like/dislike) requires the validator threshold and is tracked alongside total voting power.
- The Treasury cannot be withdrawn manually—funds are released only through governance-approved payouts executed from this interface.
- WalletConnect and injected wallets are supported on BNB Smart Chain mainnet (56) or testnet (97) as configured in the environment.

## 概要（中文）
- 鏈上操作採三層質押門檻：提案需 1,000,000 顆 PEACE、投票需 200,000 顆、驗證按讚／倒讚需 15,000 顆。
- 每筆提案的投票時段為 24 小時，期間鎖定的 PEACE 在結束後即可透過「領回質押」功能取回。
- 驗證者需達到門檻才能送出按讚／倒讚評價，並與總投票權重一同展示。
- 金庫資金無人工提款通道，只能依治理決議在此執行撥款。
- 支援 WalletConnect 與瀏覽器錢包，可依環境設定選擇 BNB 主網（56）或測試網（97）。

## Quick Start

```bash
npm i
cp .env.example .env.local
# Fill in chain id, Treasury, Governance, WalletConnect project id, etc.
npm run dev
```

## Environment Variables
Set the following keys in `.env.local` (or in your hosting provider):

- `NEXT_PUBLIC_CHAIN_ID` (56 for mainnet, 97 for testnet)
- `NEXT_PUBLIC_RPC_BSC` (optional override for RPC endpoint)
- `NEXT_PUBLIC_TREASURY_ADDRESS`
- `NEXT_PUBLIC_GOVERNANCE_ADDRESS`
- `NEXT_PUBLIC_TOKEN_ADDRESS`
- `NEXT_PUBLIC_WC_PROJECT_ID`
- Optional links: `NEXT_PUBLIC_PEACE_SWAP_ROUTER`, `NEXT_PUBLIC_GUILD_LINK`, `NEXT_PUBLIC_TG_PUBLIC`, `NEXT_PUBLIC_TG_VERIFIED`, `NEXT_PUBLIC_TWITTER`

## Deploy to Vercel

1. Import this repository into Vercel.
2. In **Project Settings → Environment Variables**, add every key listed above.
3. Redeploy so the new environment variables are available during build and runtime.
4. After deployment:
   - Open `/api/health` on your deployed domain and confirm the JSON response includes `{ "ok": true }`.
   - Connect a wallet via WalletConnect (Binance Web3) to verify the connection flow.
   - Ensure the treasury address is set—the Donate and Treasury pages rely on it to enable transactions and show balances.

## Governance & Treasury Workflow
- Stake PEACE via your wallet to propose, vote, or deliver validator feedback. Thresholds are enforced client-side and on-chain.
- After voting or validator staking, return to the proposal once the 24-hour window ends to claim back locked PEACE.
- When a proposal succeeds, enter its id on the Treasury page and execute the payout. Only governance-approved proposals will succeed on-chain.
