import { cn } from "@/lib/utils";

/**
 * Abstract photo placeholder after the export's `.sg-photo`: a warm base
 * (#cfc6b8) with a few absolutely placed colour areas. Preview only.
 * `tone="dark"` is an evening scene for buttons that sit on photos.
 */
const scenes = {
  light: {
    base: "#cfc6b8",
    areas: [
      { left: "0%", top: "58%", width: "100%", height: "42%", background: "#9c8b76" },
      { left: "8%", top: "18%", width: "34%", height: "56%", background: "#b4693f" },
      { left: "14%", top: "28%", width: "12%", height: "18%", background: "#ece4d6" },
      { left: "52%", top: "34%", width: "40%", height: "40%", background: "#e6ded0" },
      { left: "52%", top: "66%", width: "40%", height: "8%", background: "#5b4c3f" },
      { left: "70%", top: "8%", width: "10%", aspectRatio: "1", background: "#efe8dc", borderRadius: "999px" },
    ],
  },
  dark: {
    base: "#2b2520",
    areas: [
      { left: "0%", top: "62%", width: "100%", height: "38%", background: "#1a1613" },
      { left: "6%", top: "14%", width: "30%", height: "58%", background: "#4a3a2c" },
      { left: "11%", top: "24%", width: "9%", height: "14%", background: "#c9a46a" },
      { left: "22%", top: "24%", width: "9%", height: "14%", background: "#8a6a44" },
      { left: "56%", top: "30%", width: "38%", height: "42%", background: "#3a312a" },
      { left: "62%", top: "40%", width: "12%", height: "20%", background: "#d1a65c" },
      { left: "78%", top: "8%", width: "6%", aspectRatio: "1", background: "#e9dcc4", borderRadius: "999px" },
    ],
  },
} as const;

export function Photo({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const scene = scenes[tone];
  return (
    <div
      aria-hidden="true"
      className={cn("relative size-full overflow-hidden", className)}
      style={{ background: scene.base }}
    >
      {scene.areas.map((a, i) => (
        <i key={i} className="absolute block" style={a} />
      ))}
    </div>
  );
}
