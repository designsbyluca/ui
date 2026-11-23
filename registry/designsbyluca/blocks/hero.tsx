import * as React from "react";

import { cn } from "@/lib/utils";
import { Photo } from "@/registry/designsbyluca/ui/photo";

/*
 * Hero: one statement per screen. display-xl in two lines, the second in
 * ink-display-muted, an optional lead and actions.
 *
 * With `image` it becomes the photo hero: the photo full-bleed behind,
 * white text over a dark gradient at the bottom edge, and white pills
 * (pass <Button onMedia> as children).
 */

interface HeroProps extends Omit<React.ComponentProps<"section">, "title"> {
  title: React.ReactNode;
  /** The second line, in grey. */
  muted?: React.ReactNode;
  lead?: React.ReactNode;
  /** Photo URL, or `true` for the placeholder. Makes it a full-screen photo hero. */
  image?: string | true;
  imageAlt?: string;
  /** Near-black stage without a photo. */
  dark?: boolean;
  align?: "start" | "center";
  /** Lines rise on load in three steps. Only in the first hero of a page. */
  animate?: boolean;
}

const rise = (step: 1 | 2 | 3) =>
  ({
    animation: `rise var(--dur-entrance) var(--ease-entrance) both`,
    animationDelay: `var(--delay-${step})`,
  }) as React.CSSProperties;

function Hero({
  title,
  muted,
  lead,
  image,
  imageAlt = "",
  dark = false,
  align = "start",
  animate = false,
  className,
  children,
  ...props
}: HeroProps) {
  const onMedia = Boolean(image) || dark;
  const center = align === "center";
  const a = (step: 1 | 2 | 3) => (animate ? rise(step) : undefined);

  return (
    <section
      data-slot="hero"
      data-media={onMedia ? "" : undefined}
      className={cn(
        "relative isolate flex w-full flex-col overflow-hidden",
        image ? "min-h-[min(100svh,960px)] justify-end" : "justify-center",
        onMedia ? "bg-surface-inverse text-ink-inverse" : "bg-background text-foreground",
        className
      )}
      {...props}
    >
      {image && (
        <>
          <Photo
            src={image === true ? undefined : image}
            alt={imageAlt}
            tone="dark"
            label={false}
            priority
            className="absolute inset-0 -z-20"
          />
          {/* The dark gradient at the image edge that carries the white text. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(15,14,13,0.78)_0%,rgba(15,14,13,0.35)_38%,rgba(15,14,13,0)_62%),linear-gradient(to_bottom,rgba(15,14,13,0.45)_0%,rgba(15,14,13,0)_22%)]"
          />
        </>
      )}

      <div
        className={cn(
          "mx-auto grid w-full max-w-[1440px] gap-8 px-5 md:px-16",
          image ? "pt-40 pb-16 md:pb-20" : "py-24 md:py-36",
          center && "justify-items-center text-center"
        )}
      >
        <h1
          className="m-0 max-w-[12em] text-[56px] leading-[56px] font-[480] tracking-[-0.04em] text-balance min-[640px]:text-[88px] min-[640px]:leading-[86px] lg:text-[120px] lg:leading-[114px]"
        >
          <span className="block" style={a(1)}>
            {title}
          </span>
          {muted && (
            <span
              className={cn("block", onMedia ? "text-white/60" : "text-ink-display-muted")}
              style={a(2)}
            >
              {muted}
            </span>
          )}
        </h1>
        {lead && (
          <p
            className={cn(
              "m-0 max-w-[30em] text-[22px] leading-8 font-[450] tracking-[-0.01em]",
              onMedia ? "text-white/85" : "text-muted-foreground"
            )}
            style={a(2)}
          >
            {lead}
          </p>
        )}
        {children && (
          <div className={cn("flex flex-wrap gap-4 pt-2", center && "justify-center")} style={a(3)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export { Hero, type HeroProps };
