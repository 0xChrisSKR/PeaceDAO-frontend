"use client";

import { useContext } from "react";
import { I18nContext } from "@/providers/i18n";

export function useLocale() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useLocale must be used within an I18nProvider");
  }
  return context;
}
