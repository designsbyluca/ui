"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * An on/off toggle for settings that apply at once: a 44 × 24px track; round in the calm tone, radius-sm in the factual tone.
 * Off: quiet track, muted thumb on the left. On: near-black track, off-white thumb on the right.
 */
function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-block h-6 w-11 shrink-0 cursor-pointer rounded-control border border-input bg-surface-200 p-0",
        "transition-[background-color,border-color] duration-(--dur-base) ease-standard",
        "hover:border-muted-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
        "disabled:cursor-not-allowed disabled:border-dashed disabled:bg-transparent",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none absolute top-[3px] left-[3px] block size-4 rounded-[min(var(--control-radius),2px)] bg-muted-foreground in-data-[tone=calm]:rounded-full",
          "transition-transform duration-(--dur-base) ease-entrance",
          "data-[state=checked]:translate-x-5 data-[state=checked]:bg-primary-foreground",
          // Disabled thumb is stone, on or off.
          "in-disabled:bg-stone in-disabled:data-[state=checked]:bg-stone"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
