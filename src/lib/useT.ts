"use client";

import { useMemo } from "react";
import zhCommon from "../../public/locales/zh/common.json";
import enCommon from "../../public/locales/en/common.json";

export function useT(lng?: string) {
  const lang =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("lng") ||
        document.cookie.match(/(?:^|; )lng=([^;]+)/)?.[1] ||
        "zh"
      : lng || "zh";

  const dict = useMemo(() => (lang === "en" ? enCommon : zhCommon), [lang]);
  return (key: string, fallback?: string) => (dict as Record<string, string | undefined>)[key] ?? fallback ?? key;
}
