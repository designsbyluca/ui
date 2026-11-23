"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { inputVariants } from "./input";

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

/** Looks like an Input. `variant="boxed"` matches a boxed Input. Error: aria-invalid="true". */
function SelectTrigger({
  className,
  variant = "line",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & { variant?: "line" | "boxed" }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-variant={variant}
      className={cn(
        inputVariants({ variant }),
        "group/select flex cursor-pointer items-center justify-between gap-2 text-left",
        "data-placeholder:text-muted-foreground [&>span]:truncate",
        variant === "line" ? "p-0" : "px-5",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="inline-flex shrink-0 text-muted-foreground transition-transform duration-(--dur-base) ease-standard group-data-[state=open]/select:rotate-180">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/** A square popover with a soft shadow, as wide as the trigger, 8px below it. */
function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        className={cn(
          "relative z-30 max-h-[min(280px,var(--radix-select-content-available-height))] overflow-x-hidden overflow-y-auto",
          "rounded-none border border-border bg-popover py-2 text-popover-foreground shadow-float",
          position === "popper" && "w-(--radix-select-trigger-width)",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-5 pt-3 pb-1 text-[13px] leading-[18px] text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Rows highlight in accent; the chosen one shows an ochre check. */
function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "flex cursor-pointer items-center justify-between gap-2 rounded-none px-5 py-3 text-base leading-[22px] outline-none select-none",
        "data-highlighted:bg-accent data-highlighted:text-accent-foreground",
        "data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:opacity-45",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="inline-flex text-mark">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("my-2 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
