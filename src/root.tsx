import { component$, useVisibleTask$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister, useLocation
} from "@builder.io/qwik-city";


import { RouterHead } from "./components/router-head/router-head";
import "./global.css";
import { useQwikSpeak } from "qwik-speak";
import { config } from "~/speak-config";
import { translationFn } from "~/speak-functions";
import { initFlowbite } from "flowbite";

export default component$(() => {
  // Initialize QwikSpeak
  useQwikSpeak({ config, translationFn });

  // Initialize Flowbite
  useVisibleTask$(() => {
    initFlowbite();
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body>
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
