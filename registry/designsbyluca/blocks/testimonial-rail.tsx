import * as React from "react";

import { cn } from "@/lib/utils";
import { Photo } from "@/registry/designsbyluca/ui/photo";

/*
 * TestimonialRail: a slow rail of quote cards and photos. One pass takes
 * dur-marquee (80s); it pauses on hover and focus. With reduced motion it
 * stands still and scrolls sideways. `rows` runs two rows in opposite
 * directions. Only real testimonials, with consent.
 */

type RailItem =
  | { quote: React.ReactNode; name: string; role?: string; avatar?: string }
  | { media: string | true; alt?: string };

interface TestimonialRailProps extends React.ComponentProps<"div"> {
  items: RailItem[];
  /** Two rows in opposite directions. */
  rows?: boolean;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

function Card({ item }: { item: RailItem }) {
  const size = "h-[300px] w-[320px] shrink-0 overflow-hidden rounded-none md:h-[344px] md:w-[448px]";
  if ("media" in item) {
    return (
      <Photo
        src={item.media === true ? undefined : item.media}
        alt={item.alt}
        className={size}
      />
    );
  }
  return (
    <figure className={cn(size, "m-0 flex flex-col justify-between bg-surface-100 p-8 text-foreground md:p-10")}>
      <blockquote className="m-0 text-[18px] leading-[26px] font-[450] tracking-[-0.01em] md:text-[20px] md:leading-[29px]">
        {item.quote}
      </blockquote>
      <figcaption className="flex items-center gap-4">
        {item.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.avatar} alt="" className="size-12 shrink-0 rounded-full object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-inverse text-[15px] leading-6 text-ink-inverse uppercase"
          >
            {initials(item.name)}
          </span>
        )}
        <span className="grid font-serif text-[16px] leading-5 font-medium tracking-[0.06em] uppercase in-data-[tone=factual]:font-mono in-data-[tone=factual]:text-[12px] in-data-[tone=factual]:tracking-[0.06em]">
          <span>{item.name}</span>
          {item.role && <span className="text-muted-foreground">{item.role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }: { items: RailItem[]; reverse?: boolean }) {
  return (
    <div
      className={cn(
        "group/rail overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]",
        "motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]"
      )}
    >
      <div
        className={cn(
          "flex w-max",
          "animate-[marquee_var(--dur-marquee)_linear_infinite] group-hover/rail:[animation-play-state:paused] group-focus-within/rail:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
          "motion-reduce:animate-none"
        )}
      >
        {/* Two copies, so the rail runs without a seam; the second is hidden from screen readers. */}
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1 || undefined} className="flex gap-6 pr-6 md:gap-8 md:pr-8 motion-reduce:last:hidden">
            {items.map((item, i) => (
              <Card key={i} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialRail({ items, rows = false, className, ...props }: TestimonialRailProps) {
  const half = Math.ceil(items.length / 2);
  return (
    <div data-slot="testimonial-rail" className={cn("grid gap-6 md:gap-8", className)} {...props}>
      {rows ? (
        <>
          <Row items={items.slice(0, half)} />
          <Row items={items.slice(half)} reverse />
        </>
      ) : (
        <Row items={items} />
      )}
    </div>
  );
}

export { TestimonialRail, type TestimonialRailProps, type RailItem };
