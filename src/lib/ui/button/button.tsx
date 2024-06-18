import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import type { ButtonHTMLAttributes } from "@builder.io/qwik";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const button = cva("button", {
  variants: {
    intent: {
      mecca: "align-middle text-center focus:ring-2 focus:ring-primary transition-all duration-200 ease-in-out focus:outline-none focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-white focus:ring-offset-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      ghost: "focus:outline-none text-center align-middle",
      ripple: "align-middle select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none shadow-md shadow-primary hover:shadow-lg hover:shadow-primary focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
    },
    size: {
      sm: "py-2 px-3 text-xs",
      md: "py-2 px-5 text-sm",
      lg: "py-3 px-6 text-lg",
    },
    radius: {
      rounded: "rounded-lg",
      square: "rounded-none",
      circle: "rounded-full"
    },
    variant: {
      primary: "text-white bg-primary hover:bg-secondary focus:outline-none",
      secondary: "text-white bg-secondary hover:bg-primary focus:outline-none",
      outline: "text-primary border border-primary hover:bg-secondary focus:outline-none",
      ghost: "text-primary hover:text-secondary focus:outline-none",
      link: "text-primary underline decoration-2 hover:text-secondary hover:no-underline",
      linkSecondary: "text-secondary decoration-2 hover:text-primary hover:underline",
      danger: "text-white bg-red-500 px-4 py-2 hover:bg-red-600 focus:outline-none",
    },
    font: {
      primary: "font-bold uppercase",
      secondary: "font-medium",
      tertiary: "font-normal"
    }
  },
  defaultVariants: {
    intent: "mecca",
    variant: "primary",
    size: "md",
    radius: "rounded",
    font: "primary"
  }
});

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
}


export default component$((props: ButtonProps) => {
  const { intent = "mecca", variant = "primary", size, font, radius, class: className, ...rest } = props;

  useVisibleTask$(() => {
    if (intent === "ripple") {
      class Ripple {
        x: number;
        y: number;
        z: number;

        constructor() {
          this.x = 0;
          this.y = 0;
          this.z = 0;
        }

        findFurthestPoint(clickPointX: number, elementWidth: number, offsetX: number, clickPointY: number, elementHeight: number, offsetY: number): number {
          this.x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
          this.y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
          this.z = Math.hypot(this.x - (clickPointX - offsetX), this.y - (clickPointY - offsetY));
          return this.z;
        }

        applyStyles(element: HTMLElement, rect: DOMRect, radius: number, event: MouseEvent): void {
          element.classList.add("ripple");
          element.style.backgroundColor = "rgba(255,255,255, 0.3)";
          element.style.borderRadius = "50%";
          element.style.pointerEvents = "none";
          element.style.position = "absolute";
          element.style.left = event.clientX - rect.left - radius + "px";
          element.style.top = event.clientY - rect.top - radius + "px";
          element.style.width = element.style.height = radius * 2 + "px";
        }

        applyAnimation(element: HTMLElement): void {
          element.animate([{ transform: "scale(0)", opacity: 1 }, {
            transform: "scale(1.5)",
            opacity: 0
          }], { duration: 600, easing: "linear" });
        }

        create(event: MouseEvent): void {
          const element = event.currentTarget as HTMLElement;
          element.style.position = "relative";
          element.style.overflow = "hidden";
          const rect = element.getBoundingClientRect();
          const radius = this.findFurthestPoint(event.clientX, element.offsetWidth, rect.left, event.clientY, element.offsetHeight, rect.top);
          const circle = document.createElement("span");
          this.applyStyles(circle, rect, radius, event);
          this.applyAnimation(circle);
          element.appendChild(circle);
          setTimeout(() => circle.remove(), 500);
        }
      }

      (function setRipple() {
        const ripple = new Ripple();
        const dataRipple = document.querySelectorAll<HTMLElement>("[data-ripple=\"true\"]");

        dataRipple.forEach(element => {
          element.addEventListener("mouseup", (event) => {
            ripple.create(event);
          });
        });
      })();
    }
  });
  return (
    <button {...rest}
            class={twMerge(button({
              intent,
              variant,
              size,
              font,
              radius
            }), typeof className === "string" ? className : "")}
            data-ripple={intent === "ripple" ? "true" : undefined}
    >
      <Slot />
    </button>
  );
});