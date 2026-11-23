"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Kicker } from "@/registry/designsbyluca/ui/kicker";
import { Photo } from "@/registry/designsbyluca/ui/photo";

/*
 * FeatureStack: service sections that stick to the top and slide over each
 * other on scroll. As the next one arrives, the covered text fades to 15 %
 * and blurs to 4px (follows scroll, smoothed by dur-scrub).
 *
 * Each item: a Kicker, two short sentences as feature-title, one to three
 * short paragraphs, actions (a default and an outline Button) and a 9:10
 * image on the right. Two to four items. `top` is the height of a floating
 * NavBar. No sticking below 900px.
 */

interface FeatureStackItem {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  title2?: React.ReactNode;
  text?: React.ReactNode | React.ReactNode[];
  actions?: React.ReactNode;
  /** An image URL or your own element; without it a placeholder. */
  media?: string | React.ReactNode;
}

interface FeatureStackProps extends React.ComponentProps<"div"> {
  items: FeatureStackItem[];
  /** Offset from the top in px, e.g. the height of a floating NavBar. */
  top?: number;
}

function FeatureStack({ items, top = 0, className, style, ...props }: FeatureStackProps) {
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 900px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = Array.from(el.querySelectorAll<HTMLElement>("[data-slot=feature-stack-item]"));
      sections.forEach((s, i) => {
        const next = sections[i + 1];
        let p = 0;
        if (next && wide.matches && !reduce.matches) {
          const h = window.innerHeight - top;
          p = Math.min(1, Math.max(0, (window.innerHeight - next.getBoundingClientRect().top) / h));
        }
        s.style.setProperty("--covered", String(p));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [top]);

  return (
    <div
      ref={root}
      data-slot="feature-stack"
      className={cn("relative", className)}
      style={{ "--stack-top": `${top}px`, ...style } as React.CSSProperties}
      {...props}
    >
      {items.map((item, i) => {
        const paragraphs = Array.isArray(item.text) ? item.text : item.text ? [item.text] : [];
        return (
          <section
            key={i}
            data-slot="feature-stack-item"
            className={cn(
              "grid items-center gap-10 bg-background px-5 py-16 md:px-16",
              "min-[900px]:sticky min-[900px]:top-(--stack-top) min-[900px]:min-h-[calc(100svh-var(--stack-top))] min-[900px]:grid-cols-2 min-[900px]:gap-16"
            )}
          >
            <div
              className="max-w-[30em] transition-[opacity,filter] duration-(--dur-scrub) ease-linear"
              style={{ opacity: "calc(1 - 0.85 * var(--covered, 0))", filter: "blur(calc(4px * var(--covered, 0)))" }}
            >
              {item.kicker && <Kicker>{item.kicker}</Kicker>}
              <h2 className="mt-4 mb-8 text-[32px] leading-[34px] font-[480] tracking-[-0.03em] md:text-[40px] md:leading-[42px]">
                <span className="block">{item.title}</span>
                {item.title2 && <span className="block text-ink-display-muted">{item.title2}</span>}
              </h2>
              {paragraphs.map((p, j) => (
                <p key={j} className="m-0 mb-4 text-[18px] leading-[26px] tracking-[-0.01em]">
                  {p}
                </p>
              ))}
              {item.actions && <div className="mt-8 flex flex-wrap gap-4">{item.actions}</div>}
            </div>
            <div
              className="aspect-[9/10] overflow-hidden rounded-surface transition-opacity duration-(--dur-scrub) ease-linear *:size-full"
              style={{ opacity: "calc(1 - 0.6 * var(--covered, 0))" }}
            >
              {typeof item.media === "string" ? (
                <Photo src={item.media} />
              ) : (
                (item.media ?? <Photo />)
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export { FeatureStack, type FeatureStackProps, type FeatureStackItem };
