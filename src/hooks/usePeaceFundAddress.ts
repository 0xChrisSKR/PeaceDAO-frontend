"use client";
import { getEnv } from "@/lib/getEnv";

export type PeaceFundQueryResult = {
  address: string;
  mode: "env" | "auto" | "unset";
};

// 假資料解析：env 設了用 env；=auto 就給一個 demo 位址；都沒設顯示 Unset
export function usePeaceFundAddress(): PeaceFundQueryResult {
  const envVal = getEnv("PEACE_FUND");
  if (envVal && envVal !== "auto") {
    return { address: envVal, mode: "env" };
  }
  if (envVal === "auto" || !envVal) {
    // 模擬自動解析
    const demo = "0xDEMO-PEACE-FUND-0000000000000000ABCD";
    return { address: demo, mode: envVal ? "auto" : "unset" };
  }
  return { address: "", mode: "unset" };
}
