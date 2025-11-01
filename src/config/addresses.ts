import fs from "fs";
import path from "path";
import { env } from "./env";

// 🔹 JSON 檔案位置
const jsonPath = path.join(process.cwd(), "src/config/addresses.local.json");

// 🔹 預設結構
let ADDR: any = {};
try {
  const raw = fs.readFileSync(jsonPath, "utf-8");
  ADDR = JSON.parse(raw);
} catch (err) {
  console.warn("⚠️  無法讀取 addresses.local.json，使用預設空值");
  ADDR = {};
}

// 🔹 對應 BSC 鏈 ID（主網 56 / 測試網 97）
const MAP: Record<string, keyof typeof ADDR> = {
  bsc: "56",
  bsctest: "97"
};

// 🔹 取對應欄位
export function resolveAddress(
  key: "DONATION_ADDRESS" | "TREASURY_ADDRESS" | "GOVERNANCE_ADDRESS",
  net: "bsc" | "bsctest" = env.NETWORK === "bsc" ? "bsc" : "bsctest"
) {
  const chainId = MAP[net];
  return ADDR[chainId]?.[key] || "0x0000000000000000000000000000000000000000";
}
