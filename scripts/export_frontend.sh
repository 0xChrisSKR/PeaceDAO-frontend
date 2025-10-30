#!/usr/bin/env bash
set -euo pipefail

CHAIN_ID="${1:-11155111}" # 預設 Sepolia，可改 1 主網、8453 Base 等
OUT_DIR="../PeaceDAO-frontend/src"
ABIS_DIR="$OUT_DIR/abis"
CFG_DIR="$OUT_DIR/config"
mkdir -p "$ABIS_DIR" "$CFG_DIR"

# 找最新的 broadcast 檔
BROADCAST_JSON=$(ls -t broadcast/*/$CHAIN_ID/run-*.json | head -n1)
[ -z "$BROADCAST_JSON" ] && { echo "找不到 broadcast 檔。請先 forge script --broadcast"; exit 1; }

# 取出地址（合約名 => 地址）
addr() { jq -r ".transactions[] | select(.contractName==\"$1\") | .contractAddress" "$BROADCAST_JSON" | tail -n1; }

DONATION_ADDR=$(addr Donation || true)
TREASURY_ADDR=$(addr Treasury || true)
GOVERN_ADDR=$(addr Governance || true)

# 產生 addresses.local.json
cat > "$CFG_DIR/addresses.local.json" <<JSON
{
  "chainId": $CHAIN_ID,
  "Donation": "$DONATION_ADDR",
  "Treasury": "$TREASURY_ADDR",
  "Governance": "$GOVERN_ADDR"
}
JSON

# 將 ABI 轉成 TS：export const <Name>ABI = [...]
abi_ts () {
  local name="$1"
  local json="./out/${name}.sol/${name}.json"
  [ -f "$json" ] || { echo "缺少 $json，請先 forge build"; return; }
  echo "export const ${name}ABI = " > "$ABIS_DIR/${name}.ts"
  jq '.abi' "$json" >> "$ABIS_DIR/${name}.ts"
  echo ";" >> "$ABIS_DIR/${name}.ts"
}

abi_ts Donation || true
abi_ts Treasury || true
abi_ts Governance || true

# 產生 src/config/contracts.ts（優先讀 NEXT_PUBLIC_*，否則用 addresses.local.json）
cat > "$CFG_DIR/contracts.ts" <<'TS'
/**
 * 前端合約地址設定：
 * 1) 先讀 NEXT_PUBLIC_*（Vercel Variables）
 * 2) 沒設就回退到 addresses.local.json
 */
import local from './addresses.local.json';

type AddrMap = { Donation?: string; Treasury?: string; Governance?: string; chainId?: number };

const env = {
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID ? Number(process.env.NEXT_PUBLIC_CHAIN_ID) : (local.chainId ?? 0),
  Donation: process.env.NEXT_PUBLIC_DONATION_ADDRESS || local.Donation,
  Treasury: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || local.Treasury,
  Governance: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || local.Governance,
} as AddrMap;

export const CONTRACTS = {
  chainId: env.chainId,
  Donation: env.Donation,
  Treasury: env.Treasury,
  Governance: env.Governance,
};
TS

echo "✅ 匯出完成：$CFG_DIR/addresses.local.json、$ABIS_DIR/*.ts、$CFG_DIR/contracts.ts"
