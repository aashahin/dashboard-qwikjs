import type { Signal } from "@builder.io/qwik";
import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import Sidebar from "./components/layout/sidebar";
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import auth from "~/routes/middlewares/auth";
import Nav from "./components/layout/nav";
import { initFlowbite } from "flowbite";
import AiModal from "~/routes/[...lang]/(dashboard)/admin/components/ai-modal";

export const onRequest: RequestHandler = async (req) => {
  const user = await auth(req);
  if (!user.roles.includes("admin")) {
    throw req.redirect(302, "/");
  } else {
    req.sharedMap.set("user", user);
  }
};

export const user = routeLoader$((req) => {
  return req.sharedMap.get("user");
});

export const apiData = routeLoader$((req) => {
  return {
    accessToken: req.cookie.get("accessToken")?.value || "",
    apiURL: req.env.get("URL_API") || "",
  };
});

export const vendor = routeLoader$(async (req) => {
  const user = req.sharedMap.get("user");
  const res = await fetch(`${req.env.get("URL_API")}/vendors/user/${user.id}`);
  return res.json();
});

export const AiModalProvider = createContextId<Signal<boolean>>("ai-modal");

export default component$(() => {
  const userData = user().value;
  const vendorData = vendor().value;
  const { accessToken, apiURL } = apiData().value;
  const modal = useSignal(false);
  useContextProvider(AiModalProvider, modal);

  useVisibleTask$(
    $(() => {
      initFlowbite();

      const theme = localStorage.getItem("theme");
      if (theme) {
        document.documentElement.setAttribute("data-theme", theme);
      }
    }),
  );
  return (
    <div class="bg-gray-50 antialiased dark:bg-gray-900">
      <Nav userData={userData} accessToken={accessToken} apiURL={apiURL} />
      <Sidebar vendor={vendorData} user={userData} />
      <main class="h-auto p-4 pt-20 md:ms-64">
        <AiModal
          userData={userData}
          apiURL={apiURL}
          accessToken={accessToken}
        />
        <Slot />
      </main>
    </div>
  );
});
