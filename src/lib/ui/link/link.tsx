import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { AnchorHTMLAttributes } from "@builder.io/qwik";
import { Slot } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { twMerge } from "tailwind-merge";


const link = cva("a", {
  variants: {
    variant: {
      primary: "text-primary decoration-2 hover:text-secondary hover:underline cursor-pointer",
      secondary: "text-secondary decoration-2 hover:text-primary hover:underline cursor-pointer",
      underline: "text-primary decoration-2 hover:text-secondary underline hover:no-underline cursor-pointer",
      ghost: "decoration-2 hover:underline cursor-pointer"
    },
    font: {
      primary: "font-bold uppercase",
      secondary: "font-medium",
      tertiary: "font-normal"
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-lg"
    }
  },
  defaultVariants: {
    variant: "primary",
    font: "secondary",
    size: "md"
  }
});

export interface LinkProps extends AnchorHTMLAttributes<Element>, VariantProps<typeof link> {
  reload?: boolean;
}

export default component$(({ ...props }: LinkProps) => {
  const { variant = "primary", font, size, class: className, ...rest } = props;

  return (
    <Link
      class={twMerge(link({ variant, font, size }), typeof className === "string" ? className : "")}
      {...rest}
    >
      <Slot />
    </Link>
  );
});