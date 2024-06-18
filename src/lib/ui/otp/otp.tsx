import type { Signal } from "@builder.io/qwik";
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";


const otp = cva("otp", {
  variants: {
    variant: {
      primary: "me-1 block h-12 w-12 border-gray-200 text-center text-sm focus:border-primary focus:ring-primary disabled:pointer-events-none disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    },
    radius: {
      rounded: "rounded-md",
      square: "rounded-none",
      circle: "rounded-full"
    }
  },
  defaultVariants: {
    variant: "primary",
    radius: "rounded"
  }
});

export interface Props extends VariantProps<typeof otp> {
  value?: Signal<string>;
  count?: number;
  class?: string;
}

export default component$(
  ({ ...props }: Props) => {
    const { count = 6, radius, class: className, value: otpValue, ...args } = props;

    useVisibleTask$(() => {
      const pinInputItems: NodeListOf<Element | any> = document.querySelectorAll("[data-hs-pin-input-item]");
      pinInputItems.forEach((pinInputItem, index) => {
        pinInputItem.addEventListener("input", (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (!/^\d+$/.test(target.value)) {
            target.value = "";
            return;
          }

          if (target.value.length > 1) {
            target.value = target.value.slice(0, 1);
          }
          if (target.value.length === 1) {
            if (index < pinInputItems.length - 1) {
              pinInputItems[index + 1].focus();
            } else {
              pinInputItems[0].focus();
            }
          }
          if (otpValue) {
            otpValue.value = Array.from(pinInputItems).map(input => input.value).join("");
          }
        });

        pinInputItem.addEventListener("keydown", (e: KeyboardEvent) => {
          const target = e.target as HTMLInputElement;
          if (e.key === "Backspace" && target.value.length === 0) {
            if (index > 0) {
              pinInputItems[index - 1].focus();
            }
          }
        });

        pinInputItem.addEventListener("paste", (e: ClipboardEvent) => {
          e.preventDefault();
          const target = e.target as HTMLInputElement;
          const pastedData = e.clipboardData?.getData("text") || "";
          if (!/^\d+$/.test(pastedData)) {
            return;
          }

          const digits = pastedData.split("");
          const currentIndex = Array.from(pinInputItems).indexOf(target);
          for (let i = currentIndex; i < pinInputItems.length; i++) {
            if (digits.length === 0) {
              break;
            }
            pinInputItems[i].value = digits.shift() || "";
          }

          if (otpValue) {
            otpValue.value = Array.from(pinInputItems).map(input => input.value).join("");
          }
        });
        pinInputItem.addEventListener("focus", (e: FocusEvent) => {
          const target = e.target as HTMLInputElement;
          target.select();
        });
        pinInputItem.addEventListener("click", (e: MouseEvent) => {
          const target = e.target as HTMLInputElement;
          target.select();
        });
      });
    });

    const classStyle = twMerge(otp({ radius }), typeof className === "string" ? className : "");
    return (
      <div
        class="flex"
      >
        {[...Array(count)].map((_, index) => (
          <input
            key={index}
            type="text"
            class={classStyle}
            data-hs-pin-input-item=""
            placeholder="⚬"
            name={`otp-${index + 1}`}
            aria-label={`OTP ${index + 1}`}
            {...args}
          />
        ))}
      </div>
    );
  }
);