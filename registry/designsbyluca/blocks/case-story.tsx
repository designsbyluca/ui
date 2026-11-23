"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import { Photo } from "@/registry/designsbyluca/ui/photo";

/*
 * CaseStory: a full-screen story of a project. Slides with a progress bar;
 * tap left or right to move, arrow keys work, Escape closes.
 *
 * `inline` renders it in the page as 16:9. Otherwise it is an overlay
 * controlled with `open` and `onOpenChange`; it fades in over dur-overlay
 * after 200ms. Five seconds per slide by default; the bar fills linearly.
 * With reduced motion nothing advances by itself.
 */

interface CaseSlide {
  title?: React.ReactNode;
  text?: React.ReactNode;
  /** Serif capitals below the text, e.g. "Client, website, 2026". */
  caption?: React.ReactNode;
  /** Image URL, or your own element (an <img> or <video> fills the slide). */
  media?: string | React.ReactNode;
  /** Background colour when there is no media. */
  bg?: string;
}

interface CaseStoryProps {
  slides: CaseSlide[];
  inline?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Milliseconds per slide. */
  duration?: number;
  label?: string;
  className?: string;
}

function CaseStory({
  slides,
  inline = false,
  open = false,
  onOpenChange,
  duration = 5000,
  label = "Case story",
  className,
}: CaseStoryProps) {
  const [index, setIndex] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const visible = inline || open;
  const box = React.useRef<HTMLDivElement>(null);

  // Portal target only exists in the browser.
  React.useEffect(() => setMounted(true), []);

  const go = React.useCallback(
    (step: number) => {
      setProgress(0);
      setIndex((i) => {
        const n = i + step;
        if (n >= slides.length) {
          if (!inline) onOpenChange?.(false);
          return inline ? 0 : i;
        }
        return Math.max(0, n);
      });
    },
    [slides.length, inline, onOpenChange]
  );

  // Timer: the bar fills linearly; at the end the next slide comes.
  React.useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      setProgress(p);
      if (p >= 1) {
        start = now;
        go(1);
      }
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [visible, index, duration, go]);

  React.useEffect(() => {
    if (!open || inline) return;
    setIndex(0);
    setProgress(0);
    box.current?.focus();
  }, [open, inline]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "Escape" && !inline) onOpenChange?.(false);
  };

  if (!visible) return null;

  const story = (
    <div
      ref={box}
      data-slot="case-story"
      role={inline ? "region" : "dialog"}
      aria-modal={inline ? undefined : true}
      aria-roledescription="story"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={onKey}
      className={cn(
        "isolate overflow-hidden bg-surface-inverse text-ink-inverse outline-none",
        inline ? "relative aspect-video w-full rounded-surface" : "fixed inset-0 z-50",
        !inline && "animate-[fade_var(--dur-overlay)_ease-out_200ms_both]",
        className
      )}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 grid place-items-center p-8 text-center transition-opacity duration-(--dur-base) md:p-16",
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          style={{ background: s.bg }}
        >
          {s.media &&
            (typeof s.media === "string" ? (
              <Photo src={s.media} className="absolute inset-0 -z-10" />
            ) : (
              <div className="absolute inset-0 -z-10 *:size-full *:object-cover">{s.media}</div>
            ))}
          {/* A scrim that keeps white text readable on light photos too. */}
          {s.media && (
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_50%,rgba(15,14,13,0.72),rgba(15,14,13,0.5))]"
            />
          )}
          <div className="relative max-w-[22em]">
            {s.title && (
              <p className="m-0 text-[48px] leading-[46px] font-[480] tracking-[-0.04em] md:text-[88px] md:leading-[84px] lg:text-[112px] lg:leading-[104px]">
                {s.title}
              </p>
            )}
            {s.text && (
              <p className="m-0 text-[22px] leading-7 font-[480] tracking-[-0.02em] md:text-[28px] md:leading-[35px]">
                {s.text}
              </p>
            )}
            {s.caption && (
              <p className="mt-4 mb-0 font-serif text-[13px] leading-4 tracking-[0.14em] uppercase in-data-[tone=factual]:font-mono in-data-[tone=factual]:text-[11px] in-data-[tone=factual]:tracking-[0.08em]">
                {s.caption}
              </p>
            )}
          </div>
        </div>
      ))}

      <div className="absolute inset-x-5 top-5 z-10 flex gap-1" aria-hidden="true">
        {slides.map((_, i) => (
          <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
            <i
              className="block h-full origin-left bg-on-media"
              style={{ transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})` }}
            />
          </span>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute inset-y-0 left-0 z-[5] w-[30%] cursor-w-resize border-0 bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-on-media"
      />
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute inset-y-0 right-0 z-[5] w-[30%] cursor-e-resize border-0 bg-transparent focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-on-media"
      />
      {!inline && (
        <button
          type="button"
          aria-label="Close"
          onClick={() => onOpenChange?.(false)}
          className="absolute top-10 right-5 z-20 grid size-10 cursor-pointer place-items-center rounded-full border-0 bg-on-media text-on-media-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-media"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" />
          </svg>
        </button>
      )}
      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {slides.length}
      </p>
    </div>
  );

  return inline || !mounted ? story : createPortal(story, document.body);
}

export { CaseStory, type CaseStoryProps, type CaseSlide };
