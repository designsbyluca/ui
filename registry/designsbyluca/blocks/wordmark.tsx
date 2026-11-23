import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Wordmark: one word set very large, as the hero (replaces Hero) or as a
 * close above the footer. For short names, up to about 8 characters.
 *
 * size="hero": display-wordmark as h1, the tagline on its baseline;
 *   below 760px 120px with the tagline underneath.
 * size="footer": right-aligned and fitted to the width.
 */

interface WordmarkProps extends React.ComponentProps<"section"> {
  text: string;
  tagline?: React.ReactNode;
  size?: "hero" | "footer";
  /** Footer only: repeats the first letter in front. Works with clear shapes such as A, M, V. */
  echo?: boolean;
}

function Wordmark({ text, tagline, size = "hero", echo = false, className, children, ...props }: WordmarkProps) {
  if (size === "footer") {
    // Width fit: a word of n letters is about 0.55em per letter in Inter Tight at -3 %.
    const fit = `min(480px, calc((100vw - 2 * var(--space-5)) / ${Math.max(text.length + (echo ? 1 : 0), 3) * 0.55}))`;
    return (
      <section data-slot="wordmark" className={cn("overflow-hidden px-5 md:px-16", className)} {...props}>
        <p
          aria-hidden={echo || undefined}
          className="m-0 text-right leading-[0.84] font-[480] tracking-[-0.03em] whitespace-nowrap"
          style={{ fontSize: fit }}
        >
          {echo && <span className="text-ink-display-muted">{text[0]}</span>}
          {text}
        </p>
        {echo && <span className="sr-only">{text}</span>}
      </section>
    );
  }

  return (
    <section
      data-slot="wordmark"
      className={cn("mx-auto w-full max-w-[1440px] px-5 pt-32 pb-12 md:px-16 md:pt-40", className)}
      {...props}
    >
      <div className="flex flex-col gap-6 min-[760px]:flex-row min-[760px]:items-baseline min-[760px]:justify-between min-[760px]:gap-12">
        <h1 className="m-0 text-[120px] leading-[100px] font-[480] tracking-[-0.03em] min-[760px]:text-[clamp(160px,20vw,288px)] min-[760px]:leading-[0.84]">
          {text}
        </h1>
        {tagline && (
          <p className="m-0 max-w-[22em] text-[22px] leading-8 font-[450] tracking-[-0.01em] text-muted-foreground min-[760px]:text-right">
            {tagline}
          </p>
        )}
      </div>
      {children && <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>}
    </section>
  );
}

export { Wordmark, type WordmarkProps };
