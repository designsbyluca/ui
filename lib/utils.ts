import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the system's type scale (text-body, text-card-title …),
// so it does not mistake them for text colours and drop one of the two.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-wordmark", "display-xl", "headline-xl", "headline", "feature-title",
            "display-serif", "numeral", "section-title", "lead", "card-title", "stat",
            "letter", "quote", "input-text", "body", "label", "small", "field-label",
            "badge", "eyebrow", "caption",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
