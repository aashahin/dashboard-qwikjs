import {
  LuArrowLeftRight,
  LuBanknote,
  LuBell,
  LuBlocks,
  LuBoxes,
  LuCable,
  LuCog,
  LuCoins, LuFileBarChart,
  LuFileClock,
  LuFiles,
  LuHardDrive,
  LuHistory,
  LuLandmark,
  LuLanguages,
  LuLibrary,
  LuLibraryBig,
  LuMail,
  LuMails, LuMegaphone,
  LuMessageSquare,
  LuPackage,
  LuPackage2,
  LuPalette,
  LuPencilRuler,
  LuSettings,
  LuShoppingBag,
  LuShoppingCart,
  LuTags,
  LuUsers,
  LuWallet, LuWrench
} from "@qwikest/icons/lucide";
import { $ } from "@builder.io/qwik";
import {
  FlChartPieOutline,
  FlChartSolid,
  FlDatabaseOutline,
  FlDollarSolid,
  FlSearchOutline,
  FlTicketOutline
} from "@qwikest/icons/flowbite";

export const menuItems = [
  {
    href: "/admin",
    label: "overview@@Overview",
    icon: $(FlChartPieOutline),
  },
  {
    href: "/admin/analytics",
    label: "analytics@@Analytics",
    icon: $(FlChartSolid),
  },
  {
    href: "/admin/tickets",
    label: "tickets@@Tickets",
    icon: $(FlTicketOutline),
  },
  {
    label: "products@@Products",
    icon: $(LuPackage),
    subItems: [
      {
        href: "/admin/products",
        label: "allProducts@@All Products",
        icon: $(LuPackage2),
      },
      {
        href: "/admin/categories",
        label: "categories@@Categories",
        icon: $(LuLibraryBig),
      },
      {
        href: "/admin/subcategories",
        label: "subcategories@@Subcategories",
        icon: $(LuLibrary),
      },
      {
        href: "/admin/brands",
        label: "brands@@Brands",
        icon: $(LuTags),
      },
    ],
  },
  {
    label: "orders@@Orders",
    icon: $(LuShoppingCart),
    subItems: [
      {
        href: "/admin/orders",
        label: "allOrders@@All Orders",
        icon: $(LuShoppingBag),
      },
      {
        href: "/admin/orders/refunds",
        label: "refunds@@Refunds",
        icon: $(LuHistory),
      },
    ],
  },
  {
    label: "money@@Money",
    icon: $(LuLandmark),
    subItems: [
      {
        href: "/admin/transactions",
        label: "transactions@@Transactions",
        icon: $(LuArrowLeftRight),
      },
      {
        href: "/admin/wallets",
        label: "wallets@@Wallets",
        icon: $(LuWallet),
      },
      {
        href: "/admin/taxes",
        label: "taxes@@Taxes",
        icon: $(LuCoins),
      },
      {
        href: "/admin/packages",
        label: "packages@@Packages",
        icon: $(LuBoxes),
      },
    ],
  },
  {
    href: "/admin/users",
    label: "users@@Users",
    icon: $(LuUsers),
  },
  {
    href: "/admin/reports",
    label: "reports@@Reports",
    icon: $(LuFileBarChart),
    iconStyle: { width: "1.2em", height: "1.2em" },
  },
  {
    label: "marketing@@Marketing",
    icon: $(LuMegaphone),
    subItems: [
      {
        href: "/admin/notifications",
        label: "notifications@@Notifications",
        icon: $(LuBell),
      },
      {
        href: "/admin/emails",
        label: "emails@@Emails",
        icon: $(LuMails),
      },
    ]
  },
  {
    href: "/admin/pages",
    label: "pages@@Pages",
    icon: $(LuFiles),
  },
  {
    label: "customization@@Customization",
    icon: $(LuPalette),
    subItems: [
      {
        href: "/admin/appearance",
        label: "appearance@@Appearance",
        icon: $(LuPencilRuler),
      },
      {
        href: "/admin/plugins",
        label: "plugins@@Plugins",
        icon: $(LuBlocks),
      },
    ],
  },
  {
    label: "settings@@Settings",
    icon: $(LuSettings),
    subItems: [
      {
        href: "/admin/settings/general",
        label: "general@@General",
        icon: $(LuCog),
      },
      {
        href: "/admin/settings/payments",
        label: "payments@@Payments",
        icon: $(LuBanknote),
      },
      {
        href: "/admin/settings/storage",
        label: "storage@@Storage",
        icon: $(LuHardDrive),
      },
      {
        href: "/admin/settings/mail",
        label: "mail@@Mail",
        icon: $(LuMail),
      },
      {
        href: "/admin/settings/sms",
        label: "sms@@SMS",
        icon: $(LuMessageSquare),
      },
      {
        href: "/admin/settings/currencies",
        label: "currencies@@Currencies",
        icon: $(FlDollarSolid),
        iconStyle: { width: "1.2em", height: "1.2em" },
      },
      {
        href: "/admin/settings/languages",
        label: "languages@@Languages",
        icon: $(LuLanguages),
      },
    ],
  },
  {
    href: "/admin/integrations",
    label: "integrations@@Integrations",
    icon: $(LuCable),
  },
  {
    label: "tools@@Tools",
    icon: $(LuWrench),
    subItems: [
      {
        href: "/admin/tools/cache",
        label: "cache@@Cache",
        icon: $(FlDatabaseOutline),
        iconStyle: { width: "1.2em", height: "1.2em" },
      },
      {
        href: "/admin/tools/seo",
        label: "seo@@SEO",
        icon: $(FlSearchOutline),
        iconStyle: { width: "1.2em", height: "1.2em" },
      },
    ],
  },
  {
    href: "/admin/logs",
    label: "logs@@Logs",
    icon: $(LuFileClock),
  },
];
