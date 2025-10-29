import en from "./en";
import zh from "./zh";

export const translations = {
  en,
  zh
} as const;

export type Locale = keyof typeof translations;

type LocaleMap = typeof translations;
type LocaleKeys = keyof LocaleMap;
export type Namespace = keyof LocaleMap[LocaleKeys];

export type TranslationRecord = Record<string, string>;

export function getNamespace(locale: Locale, namespace: Namespace) {
  return translations[locale][namespace] as TranslationRecord | undefined;
}
