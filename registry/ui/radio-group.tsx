"use client";

import * as React from "react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * One choice from a few visible options. Arrow keys move the selection.
 * Name the group with aria-label or aria-labelledby; error: aria-invalid="true" on the group.
 */
function RadioGroup({ className, orientation, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      orientation={orientation}
      className={cn(
        "group/radio-group grid gap-4",
        orientation === "horizontal" && "flex flex-wrap gap-8",
        className
      )}
      {...props}
    />
  );
}

/** A circle with a dot: round on purpose, so it reads differently from a checkbox. */
function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer inline-grid size-5 shrink-0 cursor-pointer place-items-center rounded-full border border-input bg-transparent p-0",
        "transition-[background-color,border-color] duration-(--dur-fast) ease-standard",
        "hover:border-muted-foreground data-[state=checked]:border-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
        "disabled:cursor-not-allowed disabled:border-dashed disabled:bg-transparent",
        "group-aria-invalid/radio-group:border-destructive aria-invalid:border-destructive",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="size-2.5 rounded-full bg-foreground" />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
