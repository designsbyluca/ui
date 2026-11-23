import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 cursor-pointer items-center justify-center gap-3 whitespace-nowrap rounded-none border border-transparent no-underline",
    "h-12 px-7 font-sans text-[15px] leading-5 font-medium tracking-[-0.08px]",
    "transition-[background-color,color,border-color,opacity] duration-(--dur-base) ease-standard",
    "active:opacity-88 [&_svg]:shrink-0",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-transparent disabled:bg-surface-200 disabled:text-muted-foreground",
    "aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:border-transparent aria-disabled:bg-surface-200 aria-disabled:text-muted-foreground",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        outline:
          "border-input bg-transparent text-foreground hover:border-foreground dark:hover:bg-surface-100 disabled:bg-transparent aria-disabled:bg-transparent",
        secondary: "bg-secondary text-secondary-foreground hover:bg-surface-200",
        ghost:
          "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground disabled:bg-transparent aria-disabled:bg-transparent",
        link: "h-auto border-0 border-b border-b-current px-0 pt-0 pb-1 text-foreground hover:border-b-2 hover:pb-[3px] disabled:bg-transparent aria-disabled:bg-transparent",
      },
      size: {
        default: "",
        sm: "h-11 px-[22px] text-[14px] leading-5",
        lg: "h-14 px-8 text-[16px] leading-5",
        icon: "size-12 p-0",
        "icon-sm": "size-11 p-0",
      },
      onMedia: { true: "", false: "" },
    },
    compoundVariants: [
      // Over photos and video: fixed off-white in both themes.
      {
        variant: "default",
        onMedia: true,
        className: "bg-on-media text-on-media-ink hover:bg-surface-200 focus-visible:outline-on-media",
      },
      {
        variant: "outline",
        onMedia: true,
        className:
          "border-white/50 text-on-media hover:border-on-media hover:bg-white/12 dark:hover:bg-white/12 focus-visible:outline-on-media",
      },
    ],
    defaultVariants: { variant: "default", size: "default", onMedia: false },
  }
);

/** Legacy names from earlier versions of the system. */
const VARIANT_ALIAS = { primary: "default", mono: "default", "mono-secondary": "outline" } as const;

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]> | keyof typeof VARIANT_ALIAS;

interface ButtonProps
  extends Omit<React.ComponentProps<"button">, "type">,
    Omit<VariantProps<typeof buttonVariants>, "variant"> {
  variant?: ButtonVariant;
  /** Adds → after the label; it moves 3px on hover. */
  arrow?: boolean;
  /** Renders the single child element instead of a <button>. */
  asChild?: boolean;
  /** Renders a link instead of a button. */
  href?: string;
  type?: "button" | "submit" | "reset";
}

function Button({
  className,
  variant = "default",
  size = "default",
  onMedia = false,
  arrow = false,
  asChild = false,
  href,
  children,
  type = "button",
  disabled,
  ...props
}: ButtonProps) {
  const v = variant in VARIANT_ALIAS ? VARIANT_ALIAS[variant as keyof typeof VARIANT_ALIAS] : variant;
  const classes = cn(buttonVariants({ variant: v as never, size, onMedia }), className);
  const content = arrow ? (
    <>
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-(--dur-fast) ease-standard group-hover/button:translate-x-[3px]"
      >
        →
      </span>
    </>
  ) : (
    children
  );

  if (asChild) {
    return (
      <Slot.Root data-slot="button" className={classes} {...(props as React.ComponentProps<typeof Slot.Root>)}>
        {children}
      </Slot.Root>
    );
  }

  if (href) {
    return (
      <a
        data-slot="button"
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        className={classes}
        {...(props as React.ComponentProps<"a">)}
      >
        {content}
      </a>
    );
  }

  return (
    <button data-slot="button" type={type} disabled={disabled} className={classes} {...props}>
      {content}
    </button>
  );
}

export { Button, buttonVariants, type ButtonProps };
