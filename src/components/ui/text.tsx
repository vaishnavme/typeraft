import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";

const textVariants = cva("text-foreground", {
  variants: {
    size: {
      default: "text-sm",
      xxs: "text-[10px]",
      xs: "text-xs",
      base: "text-base",
      lg: "text-lg",
      xxl: "text-2xl",
    },
    weight: {
      default: "font-normal",
      light: "font-light",
      medium: "font-medium",
      semibold: "font-semibold",
    },
    defaultVariants: {
      size: "default",
      weight: "default",
    },
  },
});

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  asChild?: boolean;
  size?: "default" | "xxs" | "xs" | "base" | "lg" | "xxl";
  weight?: "default" | "light" | "medium" | "semibold";
  className?: string;
}

const Text: React.FC<TextProps> = (props) => {
  const { asChild = false, size, weight, className, ...rest } = props;

  const Component = asChild ? Slot : "p";

  return (
    <Component
      {...rest}
      className={cn(textVariants({ size, weight, className }))}
    />
  );
};

export default Text;
