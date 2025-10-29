"use client";

import { useMemo } from "react";
import { useLocale } from "@/hooks/useLocale";
import { translateKey } from "@/providers/i18n";
import type { Namespace } from "@/locales";

export function useT(namespace: Namespace) {
  const { locale } = useLocale();

  return useMemo(() => {
    return (key: string, fallback?: string) => translateKey(locale, namespace, key, fallback);
  }, [locale, namespace]);
}
