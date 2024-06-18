import { inlineTranslate } from "qwik-speak";

export function i18n(key: string, params?: Record<string, string>) {
  const t = inlineTranslate();
  return t(key, params);
}