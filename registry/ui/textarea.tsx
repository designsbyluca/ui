import * as React from "react";

import { cn } from "@/lib/utils";

/** A multi-line field in a very fine frame, 144px high to start. Resizes vertically. */
function Textarea({ className, rows = 4, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(
        "box-border block min-h-36 w-full min-w-0 resize-y rounded-none border border-border bg-background px-5 py-[18px]",
        "font-sans text-[17px] leading-[26px] tracking-[-0.01em] text-foreground placeholder:text-stone",
        "transition-[border-color,background-color] duration-(--dur-fast) ease-standard",
        "hover:border-input",
        "focus:border-foreground focus:outline-2 focus:outline-offset-3 focus:outline-ring",
        "disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:text-muted-foreground",
        "aria-invalid:border-destructive aria-invalid:focus:border-b-2",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
