import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("group/card flex flex-col rounded-none text-card-foreground", {
  variants: {
    variant: {
      // A quiet surface: card fill, 40px padding, no border, no shadow.
      default: "gap-6 border-0 bg-card py-10",
      // A fine frame instead of the fill.
      outline: "gap-6 border border-border bg-transparent py-10",
      // No surface: image above, serif meta line, title, muted text, link.
      editorial: "gap-0 border-0 bg-transparent p-0",
    },
  },
  defaultVariants: { variant: "default" },
});

interface CardProps extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {}

function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

/** Image area of an editorial card, 4:3. Pass `src` or your own element. */
function CardMedia({
  className,
  src,
  alt = "",
  children,
  ...props
}: React.ComponentProps<"div"> & { src?: string; alt?: string }) {
  return (
    <div
      data-slot="card-media"
      className={cn(
        "aspect-[4/3] overflow-hidden bg-surface-200 *:block *:size-full *:object-cover",
        className
      )}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img src={src} alt={alt} loading="lazy" /> : children}
    </div>
  );
}

/** Serif-capital meta line above the title, e.g. "Case 04 · Website" and "2026". */
function CardMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-meta"
      className={cn(
        "col-span-full mb-1 flex justify-between font-serif text-[12px] leading-4 font-normal tracking-[0.14em] text-muted-foreground uppercase",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid grid-cols-[1fr_auto] gap-x-6 gap-y-2.5 px-10",
        "group-data-[variant=editorial]/card:px-0 group-data-[variant=editorial]/card:pt-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("col-start-1 m-0 text-[28px] leading-8 font-[470] tracking-[-0.025em]", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("col-start-1 m-0 text-base leading-6 text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Top-right slot in the header, e.g. a Badge or an IconButton. */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-10 text-base leading-[25px]",
        "group-data-[variant=editorial]/card:px-0 group-data-[variant=editorial]/card:pt-3 group-data-[variant=editorial]/card:text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-4 px-10 pt-2",
        "group-data-[variant=editorial]/card:px-0 group-data-[variant=editorial]/card:pt-5",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardMedia,
  CardMeta,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  cardVariants,
};
