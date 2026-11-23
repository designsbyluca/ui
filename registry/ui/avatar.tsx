"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/** A picture of a person, with initials as fallback: the one round element in the system. */
function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & { size?: "sm" | "default" | "lg" }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative inline-flex size-11 shrink-0 overflow-hidden rounded-full bg-surface-200",
        "data-[size=sm]:size-8 data-[size=lg]:size-16",
        className
      )}
      {...props}
    />
  );
}

/** Give it an `alt` that names the person. */
function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("absolute inset-0 size-full object-cover", className)}
      {...props}
    />
  );
}

/** Shows while the image loads and when it fails. */
function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "grid size-full place-items-center text-sm leading-none font-medium tracking-[0.04em] text-foreground uppercase",
        "group-data-[size=lg]/avatar:text-xl group-data-[size=lg]/avatar:leading-none",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
