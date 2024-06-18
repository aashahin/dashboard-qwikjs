import type { SpeakConfig } from "qwik-speak";

export const config: SpeakConfig = {
  defaultLocale: {
    lang: "en",
    currency: "USD",
    timeZone: "America/Los_Angeles",
  },
  supportedLocales: [
    { lang: "ar", currency: "EGP", timeZone: "Africa/Cairo" },
    { lang: "en", currency: "USD", timeZone: "America/Los_Angeles" },
  ],
  // Translations with dynamic keys available in the whole app
  runtimeAssets: ["runtime"],
  domainBasedRouting: {
    prefix: "as-needed",
  },
  showDebugMessagesLocally: false,
};
