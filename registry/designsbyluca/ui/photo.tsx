import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * A photo, or a calm placeholder until there is one: a neutral image area
 * with a soft light and a darker edge, marked "Photo" in a corner.
 * No shapes, no colour blocks. The real photo brings the colour.
 */
const placeholder = {
  light: [
    "radial-gradient(110% 80% at 30% 20%, rgba(255,255,255,0.7), rgba(255,255,255,0) 60%)",
    "linear-gradient(to top, rgba(28,25,23,0.18), rgba(28,25,23,0) 45%)",
    "linear-gradient(165deg, #eeebe8 0%, #d9d4cf 100%)",
  ].join(", "),
  // The light placeholder in the dark theme: dim stone instead of a white glare.
  lightInDark: [
    "radial-gradient(110% 80% at 30% 20%, rgba(255,255,255,0.07), rgba(255,255,255,0) 60%)",
    "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0) 45%)",
    "linear-gradient(165deg, #2f2b28 0%, #1f1c1a 100%)",
  ].join(", "),
  dark: [
    "radial-gradient(70% 60% at 70% 32%, rgba(222,200,172,0.22), rgba(222,200,172,0) 70%)",
    "radial-gradient(120% 70% at 18% 8%, rgba(255,255,255,0.07), rgba(255,255,255,0) 60%)",
    "linear-gradient(180deg, #48413b 0%, #2a2521 55%, #151311 100%)",
  ].join(", "),
} as const;

interface PhotoProps extends React.ComponentProps<"div"> {
  src?: string;
  alt?: string;
  /** Placeholder brightness when there is no src: light, or dark for white text on top. */
  tone?: "light" | "dark";
  /** Corner note on the placeholder; false hides it. */
  label?: string | false;
  priority?: boolean;
}

function Photo({ src, alt = "", tone = "light", label = "Photo", priority, className, style, ...props }: PhotoProps) {
  if (src) {
    return (
      <div data-slot="photo" className={cn("relative overflow-hidden bg-surface-200", className)} style={style} {...props}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    );
  }
  return (
    <div
      data-slot="photo"
      data-placeholder=""
      role="img"
      aria-label={alt || "Photo placeholder"}
      className={cn(
        "relative overflow-hidden bg-(image:--ph)",
        tone === "light" && "dark:bg-(image:--ph-dark)",
        className
      )}
      style={
        {
          "--ph": placeholder[tone],
          "--ph-dark": placeholder.lightInDark,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {label && (
        <span
          className={cn(
            "absolute top-4 right-4 inline-flex items-center gap-2 font-sans text-[12px] leading-4",
            tone === "dark" ? "text-white/80" : "text-[#44403c] dark:text-white/75"
          )}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
            <rect x="1" y="2" width="12" height="10" rx="1.5" />
            <path d="M1.5 10.5l3.5-3.5 3 3 2-2 2.5 2.5" />
          </svg>
          {label}
        </span>
      )}
    </div>
  );
}

export { Photo, type PhotoProps };
