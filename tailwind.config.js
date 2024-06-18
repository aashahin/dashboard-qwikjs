/** @type {import("tailwindcss").Config} */

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "oklch(var(--p))",
        },
        secondary: {
          DEFAULT: "oklch(var(--s))",
        },
        accent: {
          DEFAULT: "oklch(var(--a))",
        },
        background: {
          DEFAULT: "oklch(var(--bg))",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('flowbite/plugin')({
      charts: true
    }),
  ],
};
