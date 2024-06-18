import { component$, useContext, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { menuItems } from "~/routes/[...lang]/(dashboard)/admin/components/data";
import { i18n } from "~/shared/constants";
import { isRtlLang } from "rtl-detect";
import { localizePath } from "qwik-speak";
import { FlPlusOutline } from "@qwikest/icons/flowbite";
import { LuBot } from "@qwikest/icons/lucide";
import { AiModalProvider } from "~/routes/[...lang]/(dashboard)/admin/layout";
import useLanguage from "~/hooks/use-language";

const MenuItem = component$(
  ({ href, label, icon: Icon, subItems, line }: any) => {
    const getPath = localizePath();

    return subItems ? (
      <li aria-label={i18n(label)}>
        <button
          type="button"
          class="group flex w-full items-center rounded-lg p-2 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          aria-controls={label}
          data-collapse-toggle={label}
        >
          <Icon class="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          <span class="ms-3 flex-1 whitespace-nowrap text-start">
            {i18n(label)}
          </span>
          <svg
            aria-hidden="true"
            class="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <ul id={label} class="hidden space-y-2 py-2">
          {subItems.map((subItem: any, key: number) => (
            <li key={key} aria-label={i18n(subItem.label)}>
              <Link
                key={subItem.href}
                href={getPath(subItem.href)}
                class="group flex w-full items-center gap-2 rounded-lg p-2 ps-6 text-base font-medium text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <subItem.icon class="h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                {i18n(subItem.label)}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    ) : line ? (
      <hr class="space-y-2 border-t border-gray-200 dark:border-gray-700" />
    ) : (
      <li aria-label={i18n(label)}>
        <Link
          href={getPath(href)}
          class="group flex items-center rounded-lg p-2 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        >
          <Icon class="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          <span class="ms-3">{i18n(label)}</span>
        </Link>
      </li>
    );
  },
);

const Menu = component$(() => {
  return menuItems.map((item) => (
    <MenuItem key={item.href || item.label} {...item} />
  ));
});

export default component$(({ vendor, user }: any) => {
  const locale = useLanguage();
  const isRtl = isRtlLang(locale);
  const modal = useContext(AiModalProvider);

  useVisibleTask$(() => {
    const aside = document.querySelector("aside") as HTMLElement;
    if (isRtl) {
      aside.style.left = "unset";
      aside.style.right = "0";
      aside.classList.add("translate-x-full");
    } else {
      aside.classList.add("-translate-x-full");
    }
  });

  return (
    <aside
      class={`fixed start-0 top-0 z-40 flex h-screen w-64 flex-col border-e border-gray-200 bg-white pt-14 transition-transform md:translate-x-0 dark:border-gray-700 dark:bg-gray-800`}
      aria-label="Drawer Navigation"
      id="drawer-navigation"
    >
      <ul class="h-full space-y-1 overflow-y-scroll bg-white px-3 py-5 dark:bg-gray-800">
        <button
          data-modal-target="ai-modal"
          data-modal-toggle="ai-modal"
          class="mb-4 flex w-full items-center justify-center gap-x-1.5 rounded-lg border bg-white px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          aria-label={i18n("ai.aiChat@@AI Chat")}
          onClick$={() => (modal.value = true)}
        >
          <LuBot class="h-6 w-6 text-gray-500 dark:text-gray-400" />
          <p class="text-md font-medium text-gray-800 dark:text-gray-200">
            {i18n("ai.aiChat@@AI Chat")}
          </p>
        </button>
        <Menu />
      </ul>
      <div class="z-20 w-full justify-center space-x-4 bg-white p-4 lg:flex dark:bg-gray-800">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown-sidebar"
          class="text-md w-full rounded-lg border bg-transparent px-5 py-2.5 text-center font-medium text-gray-800 hover:text-gray-600 focus:outline-none dark:border-none dark:bg-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
          type="button"
        >
          {user.firstName} {user.lastName}
        </button>

        <div
          id="dropdown-sidebar"
          class="z-10 hidden w-56 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
        >
          {vendor ? (
            <Link
              href="../dashboard"
              class="text-md block rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {vendor.name}
            </Link>
          ) : (
            <Link
              href="../vendors/become"
              class="text-md flex items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              {i18n("becomeVendor@@Become a Vendor")}
              <FlPlusOutline class="h-6 w-6 rounded-full bg-gray-100 p-2 text-gray-500 dark:bg-gray-600 dark:text-gray-400" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
});
