import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  [
    "box-border w-full min-w-0 rounded-none font-sans text-[19px] leading-[26px] tracking-[-0.01em] text-foreground",
    "placeholder:text-stone",
    "transition-[border-color,background-color] duration-(--dur-fast) ease-standard",
    "disabled:cursor-not-allowed disabled:text-muted-foreground",
    "file:border-0 file:bg-transparent file:font-sans file:text-foreground",
  ],
  {
    variants: {
      variant: {
        // One line below, no box. Focus: a 2px ochre line. Disabled: dashed. Error: red.
        line: [
          "h-14 border-0 border-b border-b-input bg-transparent p-0",
          "hover:border-b-foreground",
          "focus:border-b-2 focus:border-b-ring focus:outline-none",
          "disabled:border-b disabled:border-dashed disabled:border-b-input",
          "aria-invalid:border-b-destructive aria-invalid:focus:border-b-2 aria-invalid:focus:border-b-destructive",
        ],
        // Extension: a very fine frame for dense forms.
        boxed: [
          "h-14 border border-border bg-background px-5 py-0 text-[17px] leading-[26px]",
          "hover:border-input",
          "focus:border-foreground focus:outline-2 focus:outline-offset-3 focus:outline-ring",
          "disabled:border-border disabled:bg-muted",
          "aria-invalid:border-destructive aria-invalid:focus:border-b-2",
        ],
      },
    },
    defaultVariants: { variant: "line" },
  }
);

interface InputProps extends React.ComponentProps<"input">, VariantProps<typeof inputVariants> {}

function Input({ className, type = "text", variant = "line", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants, type InputProps };
