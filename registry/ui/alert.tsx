import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "group/alert flex gap-4 rounded-none border-0 px-6 py-5 text-[15px] leading-[22px] text-foreground [&>svg]:mt-0.5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        // Muted surface, ochre square.
        default: "bg-muted [&>svg]:text-mark",
        // Red-tint surface, red square.
        destructive: "bg-red-tint [&>svg]:text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface AlertProps extends React.ComponentProps<"div">, VariantProps<typeof alertVariants> {
  /** Replaces the square, e.g. an 18px line icon. */
  icon?: React.ReactNode;
}

/** A message in the page flow: the square, a title and one or two sentences. For messages that come and go, use Toast. */
function Alert({ className, variant = "default", icon, children, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role={variant === "destructive" ? "alert" : "status"}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon ?? (
        <span
          aria-hidden="true"
          className={cn("mt-2 size-[7px] shrink-0", variant === "destructive" ? "bg-destructive" : "bg-mark")}
        />
      )}
      <div className="grid min-w-0 gap-0.5">{children}</div>
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  return (
    <h5
      data-slot="alert-title"
      className={cn(
        "m-0 text-[15px] leading-[22px] font-medium group-data-[variant=destructive]/alert:text-destructive-text",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn("text-muted-foreground group-data-[variant=destructive]/alert:text-foreground", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, alertVariants };
