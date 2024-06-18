import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";

export const TogglePassword = component$(() => {
  const togglePassword = useSignal(false);
  useTask$((ctx) => {
    ctx.track(() => togglePassword.value);
    if (isBrowser) {
      const password = document.getElementById("password");
      if (password) {
        if (password.getAttribute("type") === "password") {
          password.setAttribute("type", "text");
        } else {
          password.setAttribute("type", "password");
        }
      }
    }
  });
  return (
    <button
      type="button"
      class="absolute end-4 top-3 focus:outline-none"
      aria-label="Toggle password visibility"
      onClick$={() => (togglePassword.value = !togglePassword.value)}
    >
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {togglePassword.value ? (
          <>
            <path d="M2 2L22 22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path
              d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </>
        ) : (
          <>
            <path d="M2 12C2 12 5.63636 5 12 5C14.0503 5 15.8174 5.72656 17.2711 6.7116M22 12C22 12 18.3636 5 12 5C9.94974 5 8.18259 5.72656 6.72889 6.7116" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </>
        )}
      </svg>
    </button>
  );
});
