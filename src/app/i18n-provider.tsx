"use client";

import { appWithTranslation } from "next-i18next";

// Touch the helper to ensure Next.js includes translation context.
appWithTranslation;

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
