"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/** A modal window for a short task. Focus moves in and stays; Escape, the overlay and × close it. */
function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-70 animate-fade bg-[rgba(15,14,13,0.55)]", className)}
      {...props}
    />
  );
}

const XIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {
  /** Hide the × button. */
  showCloseButton?: boolean;
  /** Render in place instead of over the page (previews, docs). Use with `<Dialog open modal={false}>`. */
  inline?: boolean;
  /** "alertdialog" for confirmations. */
  role?: "dialog" | "alertdialog";
}

/** Square, 560px wide, 48px padding, a large title. */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  inline = false,
  onOpenAutoFocus,
  ...props
}: DialogContentProps) {
  const content = (
    <DialogPrimitive.Content
      data-slot="dialog-content"
      onOpenAutoFocus={inline ? (e) => e.preventDefault() : onOpenAutoFocus}
      className={cn(
        "pointer-events-auto relative grid max-h-full w-full max-w-[560px] animate-rise-base gap-8 overflow-y-auto",
        "rounded-[max(var(--surface-radius),12px)] border-0 bg-popover p-12 text-popover-foreground shadow-dialog outline-none",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DialogPrimitive.Close
          data-slot="dialog-x"
          aria-label="Close"
          className="absolute top-6 right-6 grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-transparent p-0 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
        >
          {XIcon}
        </DialogPrimitive.Close>
      ) : null}
    </DialogPrimitive.Content>
  );

  if (inline) {
    return (
      <div data-slot="dialog-layer" className="relative grid min-h-[420px] place-items-center p-4">
        <div aria-hidden="true" className="absolute inset-0 bg-[rgba(15,14,13,0.55)]" />
        {content}
      </div>
    );
  }

  return (
    <DialogPortal>
      <DialogOverlay />
      <div data-slot="dialog-layer" className="pointer-events-none fixed inset-0 z-70 grid place-items-center p-4">
        {content}
      </div>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("grid gap-3 pr-10", className)} {...props} />;
}

/** Main action last. */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-footer" className={cn("flex flex-wrap justify-end gap-4", className)} {...props} />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("m-0 text-[32px] leading-9 font-[470] tracking-[-0.03em]", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("m-0 text-base leading-6 text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
