# PeaceDAO Frontend

Next.js dApp providing wallet connectivity, treasury donations, proposal creation, proposal browsing, and token swaps for the PeaceDAO community.

## Getting started

```bash
npm install
npm run dev
```

Create a `.env.local` file with the contract addresses and RPC endpoint used by the application:

```bash
NEXT_PUBLIC_DAO=0x...
NEXT_PUBLIC_GATE=0x...
NEXT_PUBLIC_FUND=0x...
NEXT_PUBLIC_ROUTER=0x...
NEXT_PUBLIC_TOKEN=0x...
NEXT_PUBLIC_RPC=https://bsc-testnet.publicnode.com
```

## Features

- **Connect wallet** – MetaMask connection with membership check against the configured gate token.
- **Donate BNB** – Send BNB donations to the PeaceDAO treasury address.
- **Create proposal** – Submit governance proposals gated by token ownership.
- **View & vote proposals** – Read proposals via the DAO contract and cast votes.
- **Token swap** – Approve and execute `swapExactTokensForTokensWithFee` via the configured router, including slippage, fee, and deadline controls.

All blockchain interactions rely on the `NEXT_PUBLIC_*` environment variables, allowing the dApp to target different PeaceDAO deployments without code changes.
