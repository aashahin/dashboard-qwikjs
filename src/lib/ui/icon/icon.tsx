import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { HTMLAttributes } from "@builder.io/qwik";
import { Slot } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";


const icon = cva("i", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    },
    variant: {
      primary: "border border-transparent p-2 hover:bg-primary focus:outline-none cursor-pointer",
      secondary: "border border-transparent p-2 hover:bg-secondary focus:outline-none cursor-pointer",
      danger: "border border-transparent p-2 hover:bg-red-500 focus:outline-none cursor-pointer"
    },
    reload: {
      true: "animate-spin"
    },
    radius: {
      rounded: "rounded-lg",
      square: "rounded-none",
      circle: "rounded-full"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
    radius: "rounded"
  }
});

export interface IconProps extends HTMLAttributes<Element>, VariantProps<typeof icon> {
  reload?: boolean;
}


export default component$(({ ...props }: IconProps) => {
  const { size, variant, reload, radius, class: className, ...rest } = props;

  return (
    <i
      class={twMerge(icon({ size, variant, reload, radius }), typeof className === "string" ? className : "")}
      {...rest}
    >
      <Slot />
    </i>
  );
});