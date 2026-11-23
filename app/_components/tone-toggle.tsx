"use client";

import * as React from "react";

import { Button } from "@/registry/designsbyluca/ui/button";

const tones = [
  ["calm", "Calm"],
  ["factual", "Factual"],
] as const;

/** Sets data-tone on the element with the given id. Preview only: a real site sets it once on <html>. */
export function ToneToggle({ target }: { target: string }) {
  const [tone, setTone] = React.useState<"calm" | "factual">("calm");

  React.useEffect(() => {
    document.getElementById(target)?.setAttribute("data-tone", tone);
  }, [target, tone]);

  return (
    <div role="group" aria-label="Tone" className="flex flex-wrap gap-3">
      {tones.map(([id, label]) => (
        <Button
          key={id}
          size="sm"
          variant={tone === id ? "default" : "outline"}
          aria-pressed={tone === id}
          onClick={() => setTone(id)}
        >
          {label} tone
        </Button>
      ))}
    </div>
  );
}
