import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * FeatureTiles: services or features as square-cornered tiles joined in one
 * grid with 1px hairline gaps: a title and one sentence at the bottom.
 *
 * Tones per tile: muted (default), stone, sand, inverse (near-black, at most
 * one per row) and accent (the tone's orange or lime, at most one in four).
 */

type TileTone = "muted" | "stone" | "sand" | "inverse" | "accent";

interface FeatureTile {
  title: React.ReactNode;
  text?: React.ReactNode;
  tone?: TileTone;
}

interface FeatureTilesProps extends React.ComponentProps<"div"> {
  items: FeatureTile[];
  /** Columns from 900px up (default 4); 2 below 900px, 1 below 520px. */
  columns?: number;
}

const tone: Record<TileTone, { tile: string; text: string }> = {
  muted: { tile: "bg-surface-100 text-foreground", text: "text-muted-foreground" },
  stone: { tile: "bg-surface-200 text-foreground", text: "text-foreground" },
  sand: { tile: "bg-sand text-foreground", text: "text-foreground" },
  inverse: { tile: "bg-surface-inverse text-ink-inverse", text: "text-white/75" },
  accent: { tile: "bg-mark text-mark-foreground", text: "text-mark-foreground" },
};

function FeatureTiles({ items, columns = 4, className, style, ...props }: FeatureTilesProps) {
  return (
    <div
      data-slot="feature-tiles"
      className={cn(
        "grid grid-cols-1 gap-px bg-border min-[520px]:grid-cols-2 min-[900px]:grid-cols-(--tile-columns)",
        className
      )}
      style={{ "--tile-columns": `repeat(${columns}, minmax(0, 1fr))`, ...style } as React.CSSProperties}
      {...props}
    >
      {items.map((item, i) => {
        const t = tone[item.tone ?? "muted"];
        return (
          <div
            key={i}
            data-slot="feature-tile"
            className={cn("flex min-h-[240px] flex-col justify-end gap-12 rounded-none p-8 min-[520px]:min-h-[320px] md:min-h-[380px]", t.tile)}
          >
            <div className="grid gap-3">
              <h3 className="m-0 text-[28px] leading-8 font-[480] tracking-[-0.025em]">{item.title}</h3>
              {item.text && <p className={cn("m-0 max-w-[24em] text-base leading-6", t.text)}>{item.text}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { FeatureTiles, type FeatureTilesProps, type FeatureTile };
