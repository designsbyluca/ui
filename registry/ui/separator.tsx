"use client";

import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * A 1px hairline between groups. `decorative` (default) hides it from screen readers;
 * set `decorative={false}` when it separates sections that matter.
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:min-h-4 data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
