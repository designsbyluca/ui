import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex h-7 shrink-0 items-center gap-2 rounded-control border px-3 whitespace-nowrap",
    "text-[11.5px] leading-[14px] font-medium tracking-[0.08em] uppercase in-data-[tone=factual]:font-mono in-data-[tone=factual]:text-[11px] in-data-[tone=factual]:tracking-[0.06em]",
    "before:size-1.5 before:flex-none before:rounded-full before:content-['']",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
  ],
  {
    variants: {
      variant: {
        // A fine line and a dot in the tone's accent: for the one that matters.
        default: "border-border bg-transparent text-foreground before:bg-mark",
        secondary: "border-transparent bg-secondary text-secondary-foreground before:hidden",
        outline: "border-border bg-transparent text-foreground before:hidden",
        // Extension: the tone's accent as a fill (orange or lime), dark text.
        accent: "border-transparent bg-mark text-mark-foreground before:hidden",
        destructive: "border-destructive bg-transparent text-destructive-text before:bg-destructive",
        // Extension: near-black fill.
        inverse: "border-primary bg-primary text-primary-foreground before:hidden",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  /** Wrap your own element, e.g. a link. */
  asChild?: boolean;
}

/** A small label in capitals, 28px high: a pill (calm) or radius-sm with mono (factual). Not interactive. */
function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

/** The same component under its older name. */
const Tag = Badge;

export { Badge, Tag, badgeVariants, type BadgeProps };
