"use client";

import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * The name of a form control, linked with `htmlFor`.
 * Above inputs: 13px in muted-foreground (inside `Field`).
 * Beside checkboxes, radios and switches: 15px in foreground (inside `OptionRow`).
 */
function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "inline-flex items-center gap-2 text-[13px] leading-[18px] font-[420] text-muted-foreground",
        "in-data-[slot=option-row]:text-[15px] in-data-[slot=option-row]:leading-5 in-data-[slot=option-row]:text-foreground",
        "aria-disabled:opacity-50 in-data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  );
}

/** Stacks label, control and hint. Set `data-disabled` to dim the label. */
function Field({ className, disabled, ...props }: React.ComponentProps<"div"> & { disabled?: boolean }) {
  return (
    <div
      data-slot="field"
      data-disabled={disabled || undefined}
      className={cn("grid gap-1", className)}
      {...props}
    />
  );
}

/** A label beside a checkbox, radio or switch. */
function OptionRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="option-row"
      className={cn("flex items-center gap-3.5 text-sm leading-5", className)}
      {...props}
    />
  );
}

function FieldHint({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-hint"
      className={cn("m-0 mt-1.5 text-[13px] leading-[18px] text-muted-foreground", className)}
      {...props}
    />
  );
}

/** Error message with the red dot. Point the control's `aria-describedby` at its id. */
function FieldError({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-error"
      className={cn(
        "m-0 mt-1.5 flex items-center gap-2 text-[13px] leading-[18px] text-destructive-text",
        "before:size-1.5 before:flex-none before:rounded-full before:bg-destructive before:content-['']",
        className
      )}
      {...props}
    />
  );
}

export { Label, Field, OptionRow, FieldHint, FieldError };
