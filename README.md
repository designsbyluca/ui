# designsbyluca/ui

A free website system for [shadcn/ui](https://ui.shadcn.com): website blocks and the components under them, in two tones.

Neutral first: white, warm stone, sand and a warm near-black, with very large, tightly set grotesk headlines and one statement per screen. Colour comes from photos, not from the interface. The components keep the shadcn/ui names for components, props and variants (`variant`, `size`, `asChild`, `onCheckedChange`, `onValueChange` …), so you can swap them in one by one.

- 9 website blocks: Hero, Wordmark, NavBar, FeatureTiles, FeatureStack, StatTiles, TestimonialRail, CaseStory, Footer
- 20 components, each with default, hover, focus, disabled and error states
- Two tones, calm and factual, from one theme
- Light and dark theme (`.dark` class or `data-theme="dark"`)
- Text contrast of at least 4.5:1
- MIT licensed

## Two tones

Set the tone once on `<html>`. One page, one tone: no pills next to mono buttons, no orange next to lime.

| | Calm (default) | Factual |
| --- | --- | --- |
| Set with | nothing, or `data-tone="calm"` | `data-tone="factual"` |
| Buttons | pills with a grotesk label | mono capitals, 4px radius |
| Accent | one loud orange, sparingly | lime, for kickers |
| Media tiles | 8px radius | 16px radius |
| Typical hero | a full-screen photo with white pills | the name, set very large |
| For | portfolios, services, practices, studios | startups, software, technical companies |

```tsx
<html lang="en" data-tone="factual">
```

The components read the tone themselves. `Button`, `Badge`, `Kicker`, `Switch`, `Card` and the blocks change shape; nothing else needs a prop.

## Installation

The blocks and components install like shadcn/ui components, straight from the registry. You need a project with Tailwind CSS v4 and a `components.json` (run `npx shadcn@latest init` if you do not have one yet).

The registry lives at `https://ui.designsbyluca.com/r`.

Install everything at once, the theme, all components and all blocks:

```bash
npx shadcn@latest add https://ui.designsbyluca.com/r/all.json --overwrite
```

`--overwrite` matters: `npx shadcn init` puts its own `button.tsx` in your project, and keeping it breaks `IconButton`, `Toast`, the `NavBar` and the `arrow` prop.

Or one block or component at a time. Name the theme in the same command: shadcn only replaces existing variables such as `--primary` and `--radius` when you ask for a theme directly. A block brings the components it builds on.

```bash
npx shadcn@latest add https://ui.designsbyluca.com/r/theme.json https://ui.designsbyluca.com/r/hero.json
```

If `npx shadcn init` already put its own `button.tsx` in your project, add `--overwrite`.

Only the tokens, to give your existing shadcn/ui components the look:

```bash
npx shadcn@latest add https://ui.designsbyluca.com/r/theme.json
```

### Fonts

The theme expects four font variables: `--font-inter-tight`, `--font-cormorant`, `--font-newsreader` and `--font-jetbrains-mono`. In Next.js:

```tsx
import { Cormorant_Garamond, Inter_Tight, JetBrains_Mono, Newsreader } from "next/font/google";

const sans = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const serif = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500"] });
const text = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

// <html className={`${sans.variable} ${serif.variable} ${text.variable} ${mono.variable}`}>
```

Inter Tight carries almost everything. Cormorant Garamond is the display serif, used in capitals for editorial titles and kickers. Newsreader is only for a personal letter. JetBrains Mono is for small sublines, and in the factual tone for buttons, kickers and numbers. Without the variables the theme falls back to Helvetica Neue, Times New Roman, Georgia and the system monospace.

### Usage

```tsx
import { Hero } from "@/components/hero";
import { Button } from "@/components/ui/button";

export function Home() {
  return (
    <Hero image="/studio.jpg" title="Rooms that feel" muted="like a deep breath." animate>
      <Button onMedia>Request a quote</Button>
      <Button onMedia variant="outline">View work</Button>
    </Hero>
  );
}
```

Without a photo yet, pass `image` as `true`: the block shows a calm placeholder. `Photo` does the same anywhere else.

Toasts work like Sonner: mount `<Toaster />` once, then call `toast("Saved")`, `toast.success(…)`, `toast.error(…)` or `toast.dismiss(id)`.

## Blocks

| Block | What it is |
| --- | --- |
| `hero` | One statement per screen: two lines, the second grey. With `image`, a full-screen photo with white text over a dark gradient and white pills. `dark`, `align="center"`, `animate`. |
| `wordmark` | The name set very large as the hero, with a tagline on its baseline; `size="footer"` as a close above the footer. |
| `nav-bar` | Name, two to four links, a link and a button. `overMedia` over a photo, `sticky`, and `floating`: a glass bar 12px below the top. |
| `feature-tiles` | Services as tiles in one grid with hairline gaps; tones muted, stone, sand, inverse and accent. |
| `feature-stack` | Service sections that stick and slide over each other; the covered text fades and blurs. Kicker, two-line title, text, buttons, a 9:10 image. |
| `stat-tiles` | Real numbers in muted square tiles, optionally staggered with `scatter`. |
| `testimonial-rail` | A slow rail of quote cards and photos that pauses on hover and focus; `rows` for two rows. |
| `case-story` | A project told in slides with a progress bar, inline (16:9) or full screen. Arrow keys and Escape work. |
| `footer` | Link columns, then copyright and legal links. |

## Components

| Group | Component | What it is |
| --- | --- | --- |
| Actions | `button` | 48px, a verb as its label. Variants default, outline, secondary, ghost, destructive, link; sizes sm, default, lg, icon, icon-sm; `arrow`, `href`, `onMedia`. A pill, or mono capitals in the factual tone. |
| | `icon-button` | A 48px button with one line icon and a required `aria-label`. |
| | `link` | A text link with a line below that thickens on hover; `arrow`, `external`, `variant="muted"`. |
| Forms | `input` | A text field with one line below, 56px high; `variant="boxed"` draws a fine frame. |
| | `textarea` | A multi-line field in a fine frame, 144px to start. |
| | `select` | One choice from a short list; the trigger looks like an Input. |
| | `checkbox` | A 20px box, with an indeterminate state. |
| | `radio-group` | A circle with a dot, so it reads differently from a checkbox. |
| | `switch` | A 44 × 24px track, round in the calm tone. |
| | `label` | The name of a control, plus `Field`, `OptionRow`, `FieldHint` and `FieldError`. |
| Display | `badge` | A 28px label in capitals; default, secondary, outline, destructive, inverse, accent. Also exported as `Tag`. |
| | `avatar` | Sizes sm, default, lg, with initials as fallback. |
| | `card` | A quiet stone surface, an outline frame, a service `tile` on sand, an accent tile (`mark`), or editorial with the image above. |
| | `kicker` | One or two words above a title: serif capitals with a dot, or mono on lime. |
| | `photo` | A photo, or a calm placeholder until there is one. |
| | `separator` | A 1px hairline, horizontal or vertical. |
| Feedback | `alert` | A dot, a title and one or two sentences; default and destructive. |
| | `toast` | A short note in a corner that leaves by itself. |
| | `tooltip` | A short hint on hover or keyboard focus. |
| Overlays | `dialog` | A modal window for a short task, 560px wide; `role="alertdialog"` for confirmations. |

## Development

```bash
npm install
npm run dev        # an example page per tone, then every component, at localhost:3000
npm run registry   # tokens.json → app/globals.css + registry.json → public/r/*.json
npm run build      # runs the registry build first
npm run lint
```

- `design-system/tokens.json` holds the tokens; `blocks-export/` the style description (`STYLE-ORIGINAL.md`), motion rules, page types and block specs the blocks are built from.
- `scripts/build-tokens.mjs` generates `app/globals.css` and `registry.json` from `design-system/tokens.json`. Do not edit either by hand.
- `registry/designsbyluca/ui/` holds the components, `registry/designsbyluca/blocks/` the blocks; `public/r/` is the built registry that `npx shadcn add` reads.
- Dependencies between items point to `https://ui.designsbyluca.com/r`. To test against the local dev server, build with a different `REGISTRY_URL`, then build again without it before committing:

```bash
REGISTRY_URL=http://localhost:3000/r npm run registry
```

## Licence

MIT. See [LICENSE](LICENSE).

Designed and maintained by designsbyluca.
