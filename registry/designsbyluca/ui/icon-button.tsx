import * as React from "react";

import { Button, type ButtonProps } from "./button";

interface IconButtonProps extends Omit<ButtonProps, "size" | "arrow"> {
  /** The icon element: an 18px line icon with a 1.25px square-capped stroke. */
  icon?: React.ReactNode;
  /** Required: the only name a screen reader gets. */
  "aria-label": string;
  /** icon = 48px, sm = 44px. */
  size?: "icon" | "sm";
}

/** A 48px button with a single line icon: round (calm) or radius-sm (factual). In shadcn/ui this is `Button size="icon"`. */
function IconButton({ icon, children, size = "icon", variant = "outline", ...props }: IconButtonProps) {
  return (
    <Button data-slot="icon-button" size={size === "sm" ? "icon-sm" : "icon"} variant={variant} {...props}>
      {icon ?? children}
    </Button>
  );
}

export { IconButton, type IconButtonProps };
