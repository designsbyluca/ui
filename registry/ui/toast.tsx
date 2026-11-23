"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "./button";

/* ---------- store: Sonner-style API, mount <Toaster /> once, then call toast() ---------- */

type ToastType = "default" | "success" | "error";
type ToastId = string | number;

interface ToastOptions {
  id?: ToastId;
  description?: React.ReactNode;
  /** In ms, default 4000. `Infinity` keeps it until it is closed. */
  duration?: number;
  action?: { label: string; onClick?: () => void };
}

interface ToastData extends ToastOptions {
  id: ToastId;
  title: React.ReactNode;
  type: ToastType;
  duration: number;
}

let toasts: ToastData[] = [];
let counter = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};
const EMPTY: ToastData[] = [];

function add(message: React.ReactNode, options: ToastOptions = {}, type: ToastType = "default"): ToastId {
  const id = options.id ?? ++counter;
  toasts = [...toasts.filter((t) => t.id !== id), { duration: 4000, ...options, id, title: message, type }];
  emit();
  return id;
}

function dismiss(id?: ToastId) {
  toasts = id == null ? [] : toasts.filter((t) => t.id !== id);
  emit();
}

const toast = Object.assign((message: React.ReactNode, options?: ToastOptions) => add(message, options), {
  success: (message: React.ReactNode, options?: ToastOptions) => add(message, options, "success"),
  error: (message: React.ReactNode, options?: ToastOptions) => add(message, options, "error"),
  dismiss,
});

/* ---------- view ---------- */

const positions = {
  "bottom-right": "right-4 bottom-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
} as const;

function ToastItem({ t }: { t: ToastData }) {
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || t.duration === Infinity) return;
    const timer = setTimeout(() => dismiss(t.id), t.duration);
    return () => clearTimeout(timer);
  }, [paused, t.duration, t.id]);

  return (
    <li
      data-slot="toast"
      data-type={t.type}
      role={t.type === "error" ? "alert" : "status"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="flex animate-rise items-start gap-4 rounded-none border border-border bg-popover py-5 pr-4 pl-6 text-popover-foreground shadow-float"
    >
      <span
        aria-hidden="true"
        className={cn("mt-[7px] size-[7px] shrink-0", t.type === "error" ? "bg-destructive" : "bg-mark")}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] leading-[22px] font-medium">{t.title}</div>
        {t.description ? (
          <div className="mt-0.5 text-sm leading-5 text-muted-foreground">{t.description}</div>
        ) : null}
      </div>
      {t.action ? (
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            t.action?.onClick?.();
            dismiss(t.id);
          }}
        >
          {t.action.label}
        </Button>
      ) : null}
      <button
        type="button"
        aria-label="Close"
        onClick={() => dismiss(t.id)}
        className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-none border-0 bg-transparent p-0 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>
    </li>
  );
}

interface ToasterProps {
  position?: keyof typeof positions;
  /** Render in place instead of fixed (previews, docs). */
  inline?: boolean;
  className?: string;
}

/** Mount once near the root. Square, fine line, soft shadow; pauses on hover and focus. */
function Toaster({ position = "bottom-right", inline = false, className }: ToasterProps) {
  const list = React.useSyncExternalStore(subscribe, () => toasts, () => EMPTY);
  const mounted = React.useSyncExternalStore(subscribe, () => true, () => false);

  const node = (
    <ol
      data-slot="toaster"
      aria-label="Notifications"
      aria-live="polite"
      className={cn(
        "z-60 m-0 grid w-[min(380px,calc(100vw-32px))] list-none gap-2 p-0",
        inline ? "static" : cn("fixed", positions[position]),
        className
      )}
    >
      {list.map((t) => (
        <ToastItem key={t.id} t={t} />
      ))}
    </ol>
  );

  if (inline) return node;
  return mounted ? createPortal(node, document.body) : null;
}

/** Alias of Toaster. */
const Toast = Toaster;

export { Toaster, Toast, toast, type ToastOptions, type ToasterProps };
