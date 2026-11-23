# designsbyluca/ui

Free, square, calm components for [shadcn/ui](https://ui.shadcn.com), built on the designsbyluca design system.

Type carries the page, images bring the colour, the interface stays out of the way. Every corner is 0px, surfaces are flat, and one ochre accent marks the small things: the square, the focus ring, a highlight. The components keep the shadcn/ui names for components, props and variants (`variant`, `size`, `asChild`, `onCheckedChange`, `onValueChange` …), so you can swap them in one by one.

- 18 components, each with default, hover, focus, disabled and error states
- Light and dark theme (`.dark` class or `data-theme="dark"`)
- Radix primitives for keyboard use, focus handling and ARIA
- MIT licensed

## Installation

The components install like shadcn/ui components, straight from the registry. You need a project with Tailwind CSS v4 and a `components.json` (run `npx shadcn@latest init` if you do not have one yet).

The examples below use `REGISTRY` as a stand-in for the registry address, for example `https://ui.example.com/r`.

Install everything at once, the theme and all 18 components:

```bash
npx shadcn@latest add REGISTRY/all.json
```

Or one component at a time. Name the theme in the same command: shadcn only replaces existing variables such as `--primary` and `--radius` when you ask for a theme directly. A component brings the components it builds on.

```bash
npx shadcn@latest add REGISTRY/theme.json REGISTRY/button.json
```

If `npx shadcn init` already put its own `button.tsx` in your project, add `--overwrite`.

Only the tokens, to give your existing shadcn/ui components the look:

```bash
npx shadcn@latest add REGISTRY/theme.json
```

### Fonts

The theme expects three font variables: `--font-inter-tight`, `--font-newsreader` and `--font-jetbrains-mono`. In Next.js:

```tsx
import { Inter_Tight, JetBrains_Mono, Newsreader } from "next/font/google";

const sans = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const serif = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

// <html className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
```

Without them the theme falls back to Helvetica Neue, Times New Roman and the system monospace.

### Usage

```tsx
import { Button } from "@/components/ui/button";

export function Hero() {
  return <Button arrow>Request a quote</Button>;
}
```

Toasts work like Sonner: mount `<Toaster />` once, then call `toast("Saved")`, `toast.success(…)`, `toast.error(…)` or `toast.dismiss(id)`.

## Components

| Group | Component | What it is |
| --- | --- | --- |
| Actions | `button` | A 48px square button with a verb as its label. Variants default, outline, secondary, ghost, destructive, link; sizes sm, default, lg, icon, icon-sm; `arrow`, `href`, `onMedia`. |
| | `icon-button` | A 48px square button with one line icon and a required `aria-label`. |
| | `link` | A text link with a line below that thickens on hover; `arrow`, `external`, `variant="muted"`. |
| Forms | `input` | A text field with one line below, 56px high; `variant="boxed"` draws a fine frame. |
| | `textarea` | A multi-line field in a fine frame, 144px to start. |
| | `select` | One choice from a short list; the trigger looks like an Input. |
| | `checkbox` | A 20px square, with an indeterminate state. |
| | `radio-group` | A circle with a dot, so it reads differently from a checkbox. |
| | `switch` | A 44 × 24px rectangle with a square thumb. |
| | `label` | The name of a control, plus `Field`, `OptionRow`, `FieldHint` and `FieldError`. |
| Display | `badge` | A 28px label in capitals; default, secondary, outline, destructive, inverse. Also exported as `Tag`. |
| | `avatar` | The one round element; sizes sm, default, lg, with initials as fallback. |
| | `card` | A quiet surface, an outline frame, or editorial with the image above (`CardMedia`, `CardMeta`). |
| | `separator` | A 1px hairline, horizontal or vertical. |
| Feedback | `alert` | The square, a title and one or two sentences; default and destructive. |
| | `toast` | A short note in a corner that leaves by itself. |
| | `tooltip` | A short hint on hover or keyboard focus. |
| Overlays | `dialog` | A modal window for a short task, 560px wide; `role="alertdialog"` for confirmations. |

## Development

```bash
npm install
npm run dev        # preview of all components at localhost:3000
npm run registry   # tokens.json → app/globals.css + registry.json → public/r/*.json
npm run build      # runs the registry build first
npm run lint
```

- `design-system/` is the exported source: tokens, docs, reference CSS and JS. It is not edited here.
- `scripts/build-tokens.mjs` generates `app/globals.css` and `registry.json` from `design-system/tokens.json`. Do not edit either by hand.
- `registry/ui/` holds the components; `public/r/` is the built registry that `npx shadcn add` reads.
- Set `REGISTRY_URL` to the public address of `public/r` before building for production, so dependencies between items point to the right place:

```bash
REGISTRY_URL=https://ui.example.com/r npm run build
```

## Licence

MIT. See [LICENSE](LICENSE).
