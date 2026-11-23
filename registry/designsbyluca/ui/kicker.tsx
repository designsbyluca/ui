import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * A short label above a feature title, one or two words. Not clickable.
 * Calm tone: Cormorant capitals with the yellow dot in front.
 * Factual tone (data-tone="factual"): mono capitals on lime, radius-xs.
 */
function Kicker({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="kicker"
      className={cn(
        "inline-flex w-fit items-center gap-2.5 font-serif text-[15px] leading-5 font-medium tracking-[0.14em] text-foreground uppercase",
        "before:size-2 before:rounded-full before:bg-dot before:content-['']",
        "in-data-[tone=factual]:rounded-kicker in-data-[tone=factual]:bg-mark in-data-[tone=factual]:px-2 in-data-[tone=factual]:py-1",
        "in-data-[tone=factual]:font-mono in-data-[tone=factual]:text-[11px] in-data-[tone=factual]:leading-4 in-data-[tone=factual]:font-medium in-data-[tone=factual]:tracking-[0.08em] in-data-[tone=factual]:text-mark-foreground",
        "in-data-[tone=factual]:before:hidden",
        className
      )}
      {...props}
    />
  );
}

export { Kicker };
