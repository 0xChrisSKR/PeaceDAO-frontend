import type { UserConfig } from "next-i18next";

export const LOCALES = ["en", "zh"] as const;

const i18nConfig: UserConfig = {
  defaultLocale: LOCALES[0],
  locales: [...LOCALES],
  localeDetection: true,
  fallbackLng: "en",
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false
  }
};

export default i18nConfig;
export type Locale = (typeof LOCALES)[number];
export const SUPPORTED_LOCALES: Locale[] = [...LOCALES];
