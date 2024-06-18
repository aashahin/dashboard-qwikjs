import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { i18n } from "~/shared/constants";
import { routeLoader$ } from "@builder.io/qwik-city";
import info from "~/info";
import { EventSourcePlus } from "event-source-plus";
import { LuHelpCircle } from "@qwikest/icons/lucide";
import articlesData from "./_data/articles.json";
import useLanguage from "~/hooks/use-language";

export const User = routeLoader$(({ sharedMap, cookie, env }) => {
  return {
    user: sharedMap.get("user"),
    apiUrl: env.get("URL_API"),
    accessToken: cookie.get("accessToken")?.value,
  };
});

const svgSuccess = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
  >
    <linearGradient
      id="I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1"
      x1="9.858"
      x2="38.142"
      y1="9.858"
      y2="38.142"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stop-color="#21ad64"></stop>
      <stop offset="1" stop-color="#088242"></stop>
    </linearGradient>
    <path
      fill="url(#I9GV0SozQFknxHSR6DCx5a_70yRC8npwT3d_gr1)"
      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
    ></path>
    <path
      d="M32.172,16.172L22,26.344l-5.172-5.172c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l8,8c0.781,0.781,2.047,0.781,2.828,0l13-13c0.781-0.781,0.781-2.047,0-2.828L35,16.172	C34.219,15.391,32.953,15.391,32.172,16.172z"
      opacity=".05"
    ></path>
    <path
      d="M20.939,33.061l-8-8c-0.586-0.586-0.586-1.536,0-2.121l1.414-1.414c0.586-0.586,1.536-0.586,2.121,0	L22,27.051l10.525-10.525c0.586-0.586,1.536-0.586,2.121,0l1.414,1.414c0.586,0.586,0.586,1.536,0,2.121l-13,13	C22.475,33.646,21.525,33.646,20.939,33.061z"
      opacity=".07"
    ></path>
    <path
      fill="#fff"
      d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0	L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414l-13,13	C22.317,33.098,21.683,33.098,21.293,32.707z"
    ></path>
  </svg>
);

const svgError = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
  >
    <linearGradient
      id="wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1"
      x1="9.858"
      x2="38.142"
      y1="9.858"
      y2="38.142"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset="0" stop-color="#f44f5a"></stop>
      <stop offset=".443" stop-color="#ee3d4a"></stop>
      <stop offset="1" stop-color="#e52030"></stop>
    </linearGradient>
    <path
      fill="url(#wRKXFJsqHCxLE9yyOYHkza_fYgQxDaH069W_gr1)"
      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
    ></path>
    <path
      d="M33.192,28.95L28.243,24l4.95-4.95c0.781-0.781,0.781-2.047,0-2.828l-1.414-1.414	c-0.781-0.781-2.047-0.781-2.828,0L24,19.757l-4.95-4.95c-0.781-0.781-2.047-0.781-2.828,0l-1.414,1.414	c-0.781,0.781-0.781,2.047,0,2.828l4.95,4.95l-4.95,4.95c-0.781,0.781-0.781,2.047,0,2.828l1.414,1.414	c0.781,0.781,2.047,0.781,2.828,0l4.95-4.95l4.95,4.95c0.781,0.781,2.047,0.781,2.828,0l1.414-1.414	C33.973,30.997,33.973,29.731,33.192,28.95z"
      opacity=".05"
    ></path>
    <path
      d="M32.839,29.303L27.536,24l5.303-5.303c0.586-0.586,0.586-1.536,0-2.121l-1.414-1.414	c-0.586-0.586-1.536-0.586-2.121,0L24,20.464l-5.303-5.303c-0.586-0.586-1.536-0.586-2.121,0l-1.414,1.414	c-0.586,0.586-0.586,1.536,0,2.121L20.464,24l-5.303,5.303c-0.586,0.586-0.586,1.536,0,2.121l1.414,1.414	c0.586,0.586,1.536,0.586,2.121,0L24,27.536l5.303,5.303c0.586,0.586,1.536,0.586,2.121,0l1.414-1.414	C33.425,30.839,33.425,29.889,32.839,29.303z"
      opacity=".07"
    ></path>
    <path
      fill="#fff"
      d="M31.071,15.515l1.414,1.414c0.391,0.391,0.391,1.024,0,1.414L18.343,32.485	c-0.391,0.391-1.024,0.391-1.414,0l-1.414-1.414c-0.391-0.391-0.391-1.024,0-1.414l14.142-14.142	C30.047,15.124,30.681,15.124,31.071,15.515z"
    ></path>
    <path
      fill="#fff"
      d="M32.485,31.071l-1.414,1.414c-0.391,0.391-1.024,0.391-1.414,0L15.515,18.343	c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414c0.391-0.391,1.024-0.391,1.414,0l14.142,14.142	C32.876,30.047,32.876,30.681,32.485,31.071z"
    ></path>
  </svg>
);

export default component$(() => {
  const { user, apiUrl, accessToken } = User().value;
  const lang = useLanguage();
  const health = useSignal({
    uptime: 0,
    memoryUsage: 0,
    freeMemory: 0,
    totalMemory: 0,
    platform: "",
    arch: "",
    nodeVersion: "",
  });
  const storage = useSignal({
    uploads: "",
    logs: "",
    freeSpaceDisk: "",
    totalSpaceDisk: "",
    usedSpaceDisk: "",
  });
  const checkHealth = useSignal({
    status: "ok",
  });

  useVisibleTask$(async () => {
    const eventSource = new EventSourcePlus(`${apiUrl}/health/system`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    eventSource.listen({
      onMessage({ data }) {
        health.value = JSON.parse(data);
      },
    });

    const storageResponse = await fetch(`${apiUrl}/health/storage`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    storage.value = await storageResponse.json();

    const checkHealthResponse = await fetch(`${apiUrl}/health`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    checkHealth.value = await checkHealthResponse.json();
  });

  return (
    <div>
      <div class="mb-4 flex h-fit flex-col gap-3 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
        <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {i18n("adminHome.welcome@@Welcome, {{name}}", {
            name: user.firstName,
          })}
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          {i18n("adminHome.welcomeDesc@@Dashboard")}
        </p>
      </div>
      <div class="mb-4 grid auto-rows-max grid-cols-1 gap-3 lg:grid-cols-3">
        <div class="flex flex-col gap-3 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {i18n("platform@@Platform")}
          </h1>
          <p class="text-gray-500 dark:text-gray-400">
            {i18n("name@@Name")}: {i18n("majna@@Majna")}
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {i18n("version@@Version")}: {info.version}
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {i18n("description@@Description")}:{" "}
            {i18n("majnaDesc@@Majna is a next-generation e-commerce platform")}
          </p>
          <a
            class="text-gray-500 dark:text-gray-400"
            href={info.url}
            target="_blank"
          >
            {i18n("url@@URL")}: {info.url}
          </a>
        </div>

        <div class=" flex flex-col gap-3 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {i18n("system@@System")}
          </h1>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("uptime@@Uptime")}:{" "}
            {health.value.uptime > 60
              ? `${Math.floor(health.value.uptime / 60)} ${i18n("hours@@hours")}`
              : `${health.value.uptime} ${i18n("minutes@@minutes")}`}
          </p>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("nodeVersion@@Node Version")}: {health.value.nodeVersion}
          </p>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("os@@Operating System")}:{" "}
            {health.value.platform === "linux"
              ? i18n("linux@@Linux")
              : health.value.platform}
          </p>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("arch@@Arch")}: {health.value.arch}
          </p>
        </div>

        <div class="flex flex-col gap-3 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {i18n("status@@Status")}
          </h1>

          {checkHealth.value.status === "ok" ? (
            <span class="flex flex-col items-center gap-2 font-bold text-green-500 dark:text-green-400">
              {svgSuccess}
              <p>{i18n("adminHome.everyThingIsGood@@Everything is Good")}</p>
            </span>
          ) : (
            <span class="flex flex-col items-center gap-2 font-bold text-red-500 dark:text-red-400">
              {svgError}
              <p>
                {i18n("adminHome.someSystemsAreDown@@Some systems are down")}
              </p>
              <p class="font-semibold">
                {i18n(
                  "adminHome.someSystemsAreDownDesc@@Some systems are down. Please check logs for more information.",
                )}
              </p>
            </span>
          )}
        </div>

        <div class="col-span-2 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {i18n("adminHome.tipsForYou@@Tips for you")}
          </h1>
          {articlesData
            .filter((e) => e.lang === lang)
            .slice(0, 3)
            .map((article, i) => (
              <ul
                key={i}
                class="divider-gray-200 mt-3 divide-y dark:divide-gray-700"
              >
                <ol class="flex items-center justify-between py-1">
                  <div class="flex flex-col">
                    <a
                      href={article.url}
                      class="text-lg font-semibold text-gray-900 dark:text-gray-200"
                    >
                      {article.title}
                    </a>
                    <p class="text-gray-500 dark:text-gray-400">
                      {article.description}
                    </p>
                  </div>
                </ol>
              </ul>
            ))}
        </div>

        <div class="flex flex-col gap-3 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {i18n("storage@@Storage")}
          </h1>

          <div class="flex gap-1 text-gray-500 dark:text-gray-400">
            {i18n("adminHome.uploadsFolder@@Uploads Folder")}:
            <p>{storage.value.uploads}</p>
            <span
              data-tooltip-target="tooltip-uploads"
              data-tooltip-trigger="click"
              class="cursor-pointer text-gray-500 dark:text-gray-400"
            >
              <LuHelpCircle />
            </span>
          </div>

          <div
            id="tooltip-uploads"
            role="tooltip"
            class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700"
          >
            {i18n("adminHome.uploadsFolderDesc")}
            <div class="tooltip-arrow" data-popper-arrow={true}></div>
          </div>

          <div class="flex gap-1 text-gray-500 dark:text-gray-400">
            {i18n("adminHome.uploadsFolder@@Uploads Folder")}:
            <p>{storage.value.logs}</p>
            <span
              data-tooltip-target="tooltip-logs"
              data-tooltip-trigger="click"
              class="cursor-pointer text-gray-500 dark:text-gray-400"
            >
              <LuHelpCircle />
            </span>
          </div>

          <div
            id="tooltip-logs"
            role="tooltip"
            class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm dark:bg-gray-700"
          >
            {i18n("adminHome.logsFolderDesc")}
            <div class="tooltip-arrow" data-popper-arrow={true}></div>
          </div>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("freeSpace@@Free Space")}: {storage.value.freeSpaceDisk}
          </p>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("totalSpace@@Total Space")}: {storage.value.totalSpaceDisk}
          </p>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("usedSpace@@Used Space")}: {storage.value.usedSpaceDisk}
          </p>
        </div>

        <div class="flex flex-col gap-3 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {i18n("memory@@Memory")}
          </h1>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("memoryUsage@@Memory Usage")}: {health.value.memoryUsage} MB
          </p>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("memoryFree@@Free Memory")}: {health.value.freeMemory} MB
          </p>

          <p class="text-gray-500 dark:text-gray-400">
            {i18n("memoryTotal@@Total Memory")}: {health.value.totalMemory} MB
          </p>
        </div>

        <div class="col-span-2 rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {i18n("events@@Events")}
          </h1>
          {articlesData
            .filter((e) => e.lang === lang)
            .slice(0, 3)
            .map((article, i) => (
              <ul
                key={i}
                class="divider-gray-200 mt-3 divide-y dark:divide-gray-700"
              >
                <ol class="flex items-center justify-between py-1">
                  <div class="flex flex-col">
                    <a
                      href={article.url}
                      class="text-lg font-semibold text-gray-900 dark:text-gray-200"
                    >
                      {article.title}
                    </a>
                    <p class="text-gray-500 dark:text-gray-400">
                      {article.description}
                    </p>
                  </div>
                </ol>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );
});

export const head = () => {
  return {
    title: i18n("adminPanel@@Admin Panel"),
  };
};
