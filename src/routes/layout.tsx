

import { component$, Slot } from "@builder.io/qwik";
import useLanguage from "~/hooks/use-language";
import { Toaster } from "qwik-sonner";

export default component$(() => {
  const locale = useLanguage();

  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"} data-theme="none">
      <Slot />
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          style: {
            direction: locale === "ar" ? "rtl" : "ltr",
          },
        }}
      />
    </main>
  );
});
