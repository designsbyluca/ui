import * as React from "react";

import { cn } from "@/lib/utils";
import { Photo } from "@/registry/designsbyluca/ui/photo";

/*
 * StatTiles: numbers in muted square tiles. The number in `stat` at the top
 * (mono in the factual tone), the label at the bottom, an optional small
 * image top right. Three to six tiles; `scatter` staggers them with gaps.
 * Only real, checkable numbers.
 */

interface StatTile {
  value: React.ReactNode;
  label: React.ReactNode;
  /** Image URL, or true for a placeholder. */
  image?: string | true;
}

interface StatTilesProps extends React.ComponentProps<"div"> {
  items: StatTile[];
  scatter?: boolean;
}

function StatTiles({ items, scatter = false, className, ...props }: StatTilesProps) {
  return (
    <div
      data-slot="stat-tiles"
      className={cn(
        "grid grid-cols-2 min-[900px]:grid-cols-4",
        scatter ? "gap-4 md:gap-8" : "gap-px bg-border",
        className
      )}
      {...props}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            "relative flex aspect-square flex-col justify-between rounded-none bg-surface-100 p-6 md:p-8",
            scatter && i % 2 === 1 && "min-[900px]:translate-y-16",
            scatter && i % 4 === 2 && "min-[900px]:translate-y-8"
          )}
        >
          <span className="text-[32px] leading-8 font-[480] tracking-[-0.03em] md:text-[40px] md:leading-10 in-data-[tone=factual]:font-mono in-data-[tone=factual]:text-[28px] in-data-[tone=factual]:tracking-[-0.02em] md:in-data-[tone=factual]:text-[34px]">
            {item.value}
          </span>
          <span className="max-w-[12em] text-[14px] leading-5 text-muted-foreground md:text-[15px]">{item.label}</span>
          {item.image && (
            <Photo
              src={item.image === true ? undefined : item.image}
              label={false}
              className="absolute top-6 right-6 size-12 rounded-surface md:top-8 md:right-8 md:size-16"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export { StatTiles, type StatTilesProps, type StatTile };
