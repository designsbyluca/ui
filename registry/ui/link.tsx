import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  [
    "group/link inline-flex items-baseline gap-2 rounded-none border-b border-b-current pb-0.5 font-medium no-underline",
    "transition-[color,border-color] duration-(--dur-fast) ease-standard",
    "hover:border-b-2 hover:pb-px",
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
    "aria-disabled:pointer-events-none aria-disabled:border-dashed aria-disabled:text-muted-foreground aria-disabled:opacity-60",
  ],
  {
    variants: {
      variant: {
        default: "text-foreground",
        // Footer and legal links: the line only on hover.
        muted: "border-b-transparent text-muted-foreground hover:border-b-current hover:text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface LinkProps extends React.ComponentProps<"a">, VariantProps<typeof linkVariants> {
  /** Opens in a new tab and adds ↗. */
  external?: boolean;
  /** Adds → for "continue" links. */
  arrow?: boolean;
  asChild?: boolean;
}

/** A text link with a 1px line below that thickens to 2px on hover. Use Button for actions. */
function Link({ className, variant, external, arrow, asChild, children, target, rel, ...props }: LinkProps) {
  const classes = cn(linkVariants({ variant }), className);
  if (asChild) {
    return (
      <Slot.Root data-slot="link" className={classes} {...(props as React.ComponentProps<typeof Slot.Root>)}>
        {children}
      </Slot.Root>
    );
  }
  const icon = external ? "↗" : arrow ? "→" : null;
  return (
    <a
      data-slot="link"
      className={classes}
      target={external ? (target ?? "_blank") : target}
      rel={external ? (rel ?? "noopener noreferrer") : rel}
      {...props}
    >
      {children}
      {icon ? (
        <span
          aria-hidden="true"
          className="inline-block no-underline transition-transform duration-(--dur-fast) ease-standard group-hover/link:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}
    </a>
  );
}

export { Link, linkVariants, type LinkProps };
