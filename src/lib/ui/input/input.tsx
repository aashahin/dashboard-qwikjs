import type { InputHTMLAttributes } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

const input = cva("input", {
  variants: {
    variant: {
      mecca: "border-gray-300 focus:ring-2 focus:border-primary focus:ring-primary transition-all duration-200 ease-in-out focus:outline-none focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-white focus:ring-offset-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed",
      ghost: "focus:outline-none"
    },
    sizes: {
      sm: "py-2 px-3 text-xs",
      md: "py-2 px-5 text-sm",
      lg: "py-3 px-6 text-sm"
    },
    radius: {
      rounded: "rounded-lg",
      square: "rounded-none",
      circle: "rounded-full"
    }
  },
  defaultVariants: {
    variant: "mecca",
    sizes: "md",
    radius: "rounded"
  }
});

export type InputProps = InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof input>;

export default component$(({ ...props }: InputProps) => {
  const { variant, sizes, radius, class: className, ...rest } = props;
  return (
    <input {...rest}
           class={twMerge(input({ variant, sizes, radius }), typeof className === "string" ? className : "")} />
  );
});
