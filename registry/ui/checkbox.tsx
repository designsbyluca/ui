"use client";

import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/** A 20px square; checked fills near-black with a check, `checked="indeterminate"` shows a dash. */
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer inline-grid size-5 shrink-0 cursor-pointer place-items-center rounded-none border border-input bg-transparent p-0 text-primary-foreground",
        "transition-[background-color,border-color] duration-(--dur-fast) ease-standard",
        "hover:border-muted-foreground",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
        "disabled:cursor-not-allowed disabled:border-dashed disabled:bg-transparent",
        "disabled:data-[state=checked]:border-solid disabled:data-[state=checked]:border-surface-200 disabled:data-[state=checked]:bg-surface-200 disabled:data-[state=checked]:text-muted-foreground",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="group/indicator grid place-items-center">
        <svg
          className="group-data-[state=indeterminate]/indicator:hidden"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
        <span className="hidden h-0.5 w-2 bg-current group-data-[state=indeterminate]/indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
