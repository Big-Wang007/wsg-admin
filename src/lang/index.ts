import { nextTick, Ref } from "vue";
import { createI18n, type I18nOptions, type I18n } from "vue-i18n";

const options: I18nOptions = {
  legacy: false,
  locale: "zh",
  fallbackLocale: "zh",
};

export const i18n = createI18n<false, typeof options>(options);

export function setupI18n() {
  setI18nLanguage(i18n, options?.locale ?? "zh");
  return i18n;
}

export function setI18nLanguage(i18n: I18n, locale: string) {
  (i18n.global.locale as Ref<string>).value = locale;
  document.querySelector("html")?.setAttribute("lang", locale);
}

export async function loadLocaleMessages(i18n: I18n, locale: string) {
  const localFilename = locale.split("-")[0];
  const messages = await import(`./locales/${localFilename}.json`);
  i18n.global.setLocaleMessage(locale, { ...messages });

  return nextTick();
}
