"use client";

import * as React from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const DelayContext = React.createContext(500);

/** Sets the hover delay for the tooltips inside it (default 500ms). */
function TooltipProvider({
  delayDuration = 500,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <DelayContext.Provider value={delayDuration}>
      <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
    </DelayContext.Provider>
  );
}

/** Opens after the delay on hover, at once on keyboard focus; Escape closes it. Works without a provider. */
function Tooltip({ delayDuration, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const inherited = React.useContext(DelayContext);
  const delay = delayDuration ?? inherited;
  return (
    <TooltipPrimitive.Provider delayDuration={delay}>
      <TooltipPrimitive.Root data-slot="tooltip" delayDuration={delay} {...props} />
    </TooltipPrimitive.Provider>
  );
}

/** Without `asChild` it is a text button with a dotted line below. */
function TooltipTrigger({ className, asChild, ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          "cursor-help border-0 bg-transparent p-0 font-[inherit] text-inherit underline decoration-dotted underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
        className
      )}
      {...props}
    />
  );
}

/** A square near-black box with off-white text. One short sentence, no links inside. */
function TooltipContent({
  className,
  side = "top",
  sideOffset = 8,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-40 w-max max-w-60 animate-fade-fast rounded-none bg-foreground px-3 py-2 text-[13px] leading-[18px] font-[450] text-background",
          className
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
