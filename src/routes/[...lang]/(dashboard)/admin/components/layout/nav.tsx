import type { Signal } from "@builder.io/qwik";
import {
  component$,
  Resource,
  useResource$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { i18n } from "~/shared/constants";
import { Link } from "@builder.io/qwik-city";
import { useFormatDate } from "qwik-speak";
import { EventSourcePlus } from "event-source-plus";
import {
  FlArrowLeftToBracketOutline,
  FlBellOutline,
  FlBellSolid,
  FlClockOutline,
  FlEyeSolid,
  FlFileLinesOutline,
  FlFilePdfOutline,
  FlFireOutline,
  FlGridSolid,
  FlMessagesOutline,
  FlMoonSolid,
  FlSunSolid,
  FlUserHeadsetOutline,
  FlUserOutline,
} from "@qwikest/icons/flowbite";
import info from "~/info";
import Logo from "~/../public/assets/logo/logo.svg?jsx";
import useLanguage from "~/hooks/use-language";

type Props = {
  accessToken: string;
  apiURL: string;
  userData: any;
};

const changeMyTheme = (theme: Signal<string>) => {
  const mode = localStorage.getItem("theme");
  if (mode === "dark") {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    theme.value = "light";
  } else {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    theme.value = "dark";
  }
};

export default component$(({ accessToken, apiURL, userData }: Props) => {
  const notifications = useSignal(0);
  const theme = useSignal("light");
  const fd = useFormatDate();
  const lang = useLanguage();

  const oldNotifications = useResource$(async ({ track }) => {
    track(() => notifications.value);
    const url = `${apiURL}/notifications/user?lang=${lang}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.json();
  });

  useVisibleTask$( () => {
    const url = `${apiURL}/notifications/updates?lang=${lang}`;
    const eventSource = new EventSourcePlus(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    eventSource.listen({
      onMessage() {
        ++notifications.value;
      },
    });
  });

  useVisibleTask$(() => {
    const mode = localStorage.getItem("theme");
    if (mode) {
      theme.value = mode;
    }
  });

  return (
    <nav class="fixed end-0 start-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex items-center justify-start">
          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            class="me-2 cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
          >
            <svg
              aria-hidden="true"
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              class="hidden h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Toggle sidebar</span>
          </button>
          <Link href={info.url} class="me-4 flex items-center justify-between">
            <div class="me-3 h-8">
              <Logo width="32" height="32" />
            </div>
            <span class="self-center hidden md:block whitespace-nowrap text-2xl font-semibold dark:text-white">
              {info.name}
            </span>
          </Link>
        </div>
        <div class="flex items-center lg:order-2">
          <button
            type="button"
            onClick$={() => changeMyTheme(theme)}
            class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
          >
            <span class="sr-only">{i18n("darkMode@@Dark Mode")}</span>
            {theme.value === "dark" ? (
              <FlSunSolid class="h-5 w-5" />
            ) : (
              <FlMoonSolid class="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            data-dropdown-toggle="notification-dropdown"
            class="relative me-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
          >
            <span class="sr-only">{i18n("notifications@@Notifications")}</span>
            <FlBellSolid class="h-6 w-6" />
            {notifications.value > 0 && (
              <span class="absolute start-7 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500 dark:border-gray-800"></span>
            )}
          </button>
          <div
            class="z-50 my-4 hidden max-w-sm list-none divide-y divide-gray-100 overflow-hidden rounded-xl bg-white text-base shadow-lg dark:divide-gray-600 dark:bg-gray-700"
            id="notification-dropdown"
          >
            <div class="block bg-gray-50 px-4 py-2 text-center text-base font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-300">
              {i18n("notifications@@Notifications")}
            </div>
            <Resource
              value={oldNotifications}
              onPending={() => <li>Loading...</li>}
              onRejected={() => <li>Error fetching notifications</li>}
              onResolved={({ data }) =>
                data.map((notification: any) =>
                  data.length > 0 ? (
                    <Link
                      key={notification.id}
                      href={`../account/notifications/${notification.id}`}
                      class="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      <FlFireOutline
                        class={`h-6 w-6 ${!notification.read ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}
                      />
                      <div class="w-full ps-3">
                        <div class="mb-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                          {notification.message.length > 50
                            ? `${notification.message.slice(0, 50)}...`
                            : notification.message}
                        </div>
                        <div class="text-primary-600 dark:text-primary-500 text-xs font-medium">
                          {fd(notification.createdAt, {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div
                      key={notification.id}
                      class="flex flex-col items-center gap-2 px-8 py-6 text-gray-500 dark:text-gray-400"
                    >
                      <FlBellOutline class="h-6 w-6" />
                      {i18n("noNotifications@@No notifications")}
                    </div>
                  ),
                )
              }
            />
            <Link
              href="../account/notifications"
              class="text-md block bg-gray-50 py-2 text-center font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:hover:underline"
            >
              <div class="inline-flex items-center gap-2">
                <FlEyeSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                {i18n("viewAll@@View All")}
              </div>
            </Link>
          </div>

          <button
            type="button"
            data-dropdown-toggle="apps-dropdown"
            class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
          >
            <span class="sr-only">{i18n("apps@@Apps")}</span>
            <FlGridSolid class="h-5 w-5" />
          </button>
          <div
            class="z-50 my-4 hidden max-w-sm list-none divide-y divide-gray-100 overflow-hidden rounded rounded-xl bg-white text-base shadow-lg dark:divide-gray-600 dark:bg-gray-700"
            id="apps-dropdown"
          >
            <div class="block bg-gray-50 px-4 py-2 text-center text-base font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-300">
              {i18n("apps@@Apps")}
            </div>
            <div class="grid grid-cols-3 gap-2 p-4">
              <a
                target="_blank"
                href={info.accountUrl}
                class="flex flex-col items-center gap-2 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FlUserOutline class="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div class="text-sm text-gray-900 dark:text-white">
                  {i18n("account@@Account")}
                </div>
              </a>
              <a
                target="_blank"
                href={info.supportUrl}
                class="flex flex-col items-center gap-2 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FlUserHeadsetOutline class="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div class="text-sm text-gray-900 dark:text-white">
                  {i18n("support@@Support")}
                </div>
              </a>
              <a
                target="_blank"
                href={info.docsUrl}
                class="flex flex-col items-center gap-2 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FlFilePdfOutline class="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div class="text-sm text-gray-900 dark:text-white">
                  {i18n("documentation@@Documentation")}
                </div>
              </a>
              <a
                target="_blank"
                href={info.blogUrl}
                class="flex flex-col items-center gap-2 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FlFileLinesOutline class="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div class="text-sm text-gray-900 dark:text-white">
                  {i18n("blog@@Blog")}
                </div>
              </a>
              <a
                target="_blank"
                href={info.feedbackUrl}
                class="flex flex-col items-center gap-2 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FlMessagesOutline class="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div class="text-sm text-gray-900 dark:text-white">
                  {i18n("feedback@@Feedback")}
                </div>
              </a>
              <a
                target="_blank"
                href={info.changelogUrl}
                class="flex flex-col items-center gap-2 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FlClockOutline class="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div class="text-sm text-gray-900 dark:text-white">
                  {i18n("changelog@@Changelog")}
                </div>
              </a>
            </div>
          </div>
          <button
            type="button"
            class="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:me-0 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-nav-myaccount"
          >
            <span class="sr-only">
              {userData.firstName} {userData.lastName}
            </span>
            <img
              width="32"
              height="32"
              class="h-8 w-8 rounded-full"
              src={userData.avatarURL || "/assets/bubble-gum-avatar-icon.png"}
              alt="user photo"
            />
          </button>
          <div
            class="z-50 my-4 hidden w-56 list-none divide-y divide-gray-100 rounded rounded-xl bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
            id="dropdown-nav-myaccount"
          >
            <div class="px-4 py-3">
              <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                {userData.firstName} {userData.lastName}
              </span>
              <span class="block truncate text-sm text-gray-900 dark:text-white">
                {userData.email}
              </span>
            </div>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <Link
                  href="../account"
                  class="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {i18n("profile@@Profile")}
                </Link>
              </li>
              <li>
                <Link
                  href="../account/settings"
                  class="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {i18n("settings@@Settings")}
                </Link>
              </li>
            </ul>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <Link
                  href="../account/logout"
                  class="flex items-center px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FlArrowLeftToBracketOutline class="me-2 h-5 w-5" />
                  {i18n("logout@@Logout")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
});
