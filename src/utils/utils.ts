import { loadLocaleMessages, setI18nLanguage } from "@/lang/index.js";

export async function initI18n(I18n) {
  const lang = "zh";
  if (lang === "zh" || !I18n.global.availableLocales.includes(lang)) {
    await loadLocaleMessages(I18n, lang);
  }
  setI18nLanguage(I18n, lang);
}
