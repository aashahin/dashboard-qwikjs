import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <main class="flex min-h-screen w-screen items-center justify-center text-gray-600 " >
      <div class="relative">
        <div class="relative space-y-3 rounded-xl border bg-background px-8 py-4 shadow-sm dark:text-gray-100 sm:w-[28rem] glass-box">
          <div class="mt-2 px-4">
            <div class="p-4 sm:p-7">
              <Slot />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});
