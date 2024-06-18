import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export default component$(({ message }: { message: string }) => {
  const hidden = useSignal(false);

  useTask$(
    () => {
      setTimeout(() => {
        hidden.value = true;
      }, 5000);
    },
    { eagerness: "visible" },
  );
  return (
    <div
      class={"absolute bottom-4 end-4 z-50" + (hidden.value ? " hidden" : "")}
    >
      <div
        class="max-w-xs rounded-xl border border-gray-200 bg-white shadow-lg"
        role="alert"
      >
        <div class="flex p-4">
          <div class="flex-shrink-0">
            <svg
              class="mt-1.5 size-4 flex-shrink-0 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
            </svg>
          </div>
          <div class="ms-3">
            <p class="text-md text-gray-700">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
});
