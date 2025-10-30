# PeaceFund Treasury / 和平基金库

## PeaceFund Treasury (BSC Testnet) / 和平基金库（币安智能链测试网）

- Address / 地址：{{PEACEFUND_BSCTEST}}
- Governance token / 治理代币：$世界和平 (0x4444def5cf226bf50aa4b45e5748b676945bc509)
- Temporary founder receiving wallet (pre-mainnet) / 主网前临时创始人接收地址：0xD05d14e33D34F18731F7658eCA2675E9490A32D3

### Overview / 概述

- EN: The PeaceFund is a donation-only BNB vault. Anyone can send BNB via the `donate(string note)` function or by transferring BNB directly. Each contribution emits an on-chain `Donated` event with an optional plaintext note. Funds remain locked until a governance-controlled executor contract is deployed.
- ZH: PeaceFund 是一个只接受捐赠的 BNB 金库。任何人都可以通过 `donate(string note)` 函数或直接转账 BNB 来捐赠。每笔捐款都会触发链上 `Donated` 事件，并可附加文本备注。资金将在治理控制的执行合约上线前保持锁定。

### Roadmap / 路线图

- EN: Future upgrades will route withdrawals through a multisig or DAO-controlled executor to preserve the donation-only guarantee while enabling transparent grants.
- ZH: 未来升级将通过多签或 DAO 控制的执行合约进行提取，以在启用透明资助的同时维持仅捐赠的安全保证。

## Frontend Integration (Next.js)

Configure the Next.js frontend with these environment variables:

- `NEXT_PUBLIC_WC_PROJECT_ID` = `demo`
- `NEXT_PUBLIC_RPC_BSC` = `https://bsc-dataseed.binance.org/`
- `NEXT_PUBLIC_PEACE_FUND` = `0x071B1baf97D85a70A6Ca786E7Fe90b45f50464e5`
- `NEXT_PUBLIC_PEACEDAO_CONFIG_PATH` = `/config`
- (Optional) `NEXT_PUBLIC_GOVERNANCE_API` = `https://api.<your-domain>`

After updating these values, redeploy your hosting provider (e.g., Vercel) so the refreshed configuration is available to the build and runtime.
