import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { HTMLAttributes } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";
import { twMerge } from "tailwind-merge";
import type { JSX } from "@builder.io/qwik/jsx-runtime";

const text = cva("text", {
  variants: {
    intent: {
      title: "text-2xl font-bold text-gray-800",
      subtitle: "text-xl font-medium text-gray-800",
      body: "text-base",
      caption: "text-xs"
    },
    variant: {
      primary: "text-primary",
      secondary: "text-secondary",
      danger: "text-red-500"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    },
  },
  defaultVariants: {
    intent: "body"
  }
});

export interface TextProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof text> {
}

export default component$(({ ...props }: TextProps) => {
  const { intent, variant, align, class: className, ...rest } = props;
  const type = intent === "title" ? "h1" : intent === "subtitle" ? "h2" : intent === "caption" ? "span" : "p";
  const Tag = type as JSX.ElementType;
  return (
    <Tag
      class={twMerge(text({ intent, variant, align }), typeof className === "string" ? className : "")}
      {...rest}
    >
      <Slot />
    </Tag>
  );
});