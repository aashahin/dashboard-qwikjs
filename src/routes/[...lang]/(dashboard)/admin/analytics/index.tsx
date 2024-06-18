import { component$, useVisibleTask$ } from "@builder.io/qwik";
import ApexCharts from "apexcharts";
import { i18n } from "~/shared/constants";


export default component$(() => {
  useVisibleTask$(() => {
    const options = {
      // set this option to enable the tooltip for the chart, learn more here: https://apexcharts.com/docs/tooltip/
      tooltip: {
        enabled: true,
        x: {
          show: true,
        },
        y: {
          show: true,
        },
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -26,
        },
      },
      series: [
        {
          name: "Developer Edition",
          data: [1500, 1418, 1456, 1526, 1356, 1256],
          color: "#1A56DB",
        },
        {
          name: "Designer Edition",
          data: [643, 413, 765, 412, 1423, 1731],
          color: "#7E3BF2",
        },
      ],
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: true,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      xaxis: {
        categories: [
          "01 February",
          "02 February",
          "03 February",
          "04 February",
          "05 February",
          "06 February",
          "07 February",
        ],
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: function (value: any) {
            return "$" + value;
          },
        },
      },
    };

    if (
      document.getElementById("tooltip-chart") &&
      typeof ApexCharts !== "undefined"
    ) {
      const chart = new ApexCharts(
        document.getElementById("tooltip-chart"),
        options,
      );
      chart.render();
    }
  });
  return (
    <div>
      <div class="mb-4 w-full rounded-lg border border-gray-300 bg-white p-4 shadow md:p-6 dark:border-gray-600 dark:bg-gray-800">
        <div class="mb-5 flex justify-between">
          <div>
            <h5 class="pb-2 text-3xl font-bold leading-none text-gray-900 dark:text-white">
              $12,423
            </h5>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">
              Sales this week
            </p>
          </div>
          <div class="flex items-center px-2.5 py-0.5 text-center text-base font-semibold text-green-500 dark:text-green-500">
            23%
            <svg
              class="ms-1 h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
          </div>
        </div>
        <div id="tooltip-chart"></div>
        <div class="mt-5 grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between pt-5">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="lastDaysdropdown"
              data-dropdown-placement="bottom"
              class="inline-flex items-center text-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              type="button"
            >
              Last 7 days
              <svg
                class="m-2.5 ms-1.5 w-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="lastDaysdropdown"
              class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
            >
              <ul
                class="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Yesterday
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Today
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 7 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 30 days
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 90 days
                  </a>
                </li>
              </ul>
            </div>
            <a
              href="#"
              class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold uppercase text-blue-600  hover:bg-gray-100 hover:text-blue-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-blue-500 dark:focus:ring-gray-700"
            >
              Sales Report
              <svg
                class="ms-1.5 h-2.5 w-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
        <div class="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
        <div class="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
        <div class="h-32 rounded-lg border-2 border-dashed border-gray-300 md:h-64 dark:border-gray-600"></div>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div class="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
        <div class="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
        <div class="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
        <div class="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
      </div>
      <div class="mb-4 h-96 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
        <div class="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
        <div class="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
        <div class="h-48 rounded-lg border-2 border-dashed border-gray-300 md:h-72 dark:border-gray-600"></div>
      </div>
    </div>
  );
});

export const head = () => {
  return {
    title: i18n("adminPanel@@Admin Panel"),
  };
};
