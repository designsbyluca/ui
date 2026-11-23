# designsbyluca Design System

A calm system for studio and startup websites and the apps behind them. Type carries the page, images bring the colour, the interface stays out of the way. Free to use as a base; a Pro version with more components and blocks follows.

## Principles

- **Type carries everything.** Display sizes are very large and set tight (−3 to −4 %), weight 450–500, never bold. The second line of a headline steps back into `ink-display-muted`.
- **One statement per screen.** Few elements, a lot of air: sections are `space-6` (144px) apart, the page margin is `space-5`.
- **Images bring the colour, not the UI.** The interface is warm off-white, warm stone and warm near-black. Photos, video and content are where colour lives.
- **One accent, for small things.** Ochre appears only in the square mark, the focus ring and a rare text highlight. Never as a fill.
- **Square.** Every corner is 0px – buttons, inputs, cards, badges, dialogs, images. Only avatars and radio buttons are round.
- **Lines, not shadows.** Surfaces are flat. A hairline separates; a soft shadow is only for what floats.

## The square

The system's mark is a small solid square in ochre (`mark`): in front of a kicker or eyebrow, a badge, an alert, a toast, a numbered point. Once per element, never as decoration on its own.

## Editorial accent

Instrument Serif in capitals with +14 % tracking is the editorial voice: eyebrows above titles, meta lines ("Case 04 · Website · 2026"), tile numbers, state labels. Use it small and rarely; at large size (`display-serif`) only for a chapter, an event or a pull quote.

## Voice

Direct, calm, confident. Short sentences, no superlatives, no exclamation marks. First person for portfolios ("I design and build websites."), "you" for services. Button labels are verbs: "Request a quote", "View work", "Read the case".

## Colour

| Token | Use |
|---|---|
| `surface-000` | page, warm off-white (dark: warm near-black) |
| `surface-100` | cards, tiles, alerts, hover fills |
| `surface-200` | disabled fills, secondary tiles |
| `surface-inverse` | dark stage for video and photos |
| `ink` / `ink-hover` | text and the primary button / its hover |
| `ink-muted` | labels, descriptions, meta |
| `ink-display-muted` | grey headline line, 24px and up only |
| `ochre` / `ochre-tint` | the square, focus ring / text highlight |
| `red` / `red-tint` | errors and destructive actions / error surfaces |
| `stone` | placeholders, decorative lines – never text |
| `hairline` / `hairline-strong` | dividers / control lines |

Contrast: `ink` 16.8:1 on the page, `ink-muted` 5.6:1 (5.1:1 on `surface-100`). Ochre 5.1:1 on the page and 8.6:1 in the dark theme, so the focus ring is always clear. Red is a muted dark red, never pastel: white on it 8.3:1. In the dark theme it is #b0402f (5.6:1 with off-white text), and error messages are set in `ink` there (`destructive-text`), with the red square and line carrying the colour.

## Typography

Instrument Sans for everything; Instrument Serif in capitals as the editorial accent and in the `letter`. Both are free Google Fonts; a licensed face replaces them in `type.families`.

| Style | Size | Tracking |
|---|---|---|
| `display-xl` | 120 / 114 | −4 % |
| `headline-xl` | 72 / 72 | −4 % |
| `headline`, `section-title` | 48 / 50 | −3.5 % |
| `card-title` | 28 / 32 | −2.5 % |
| `lead` | 22 / 32 | −1 % |
| `input` | 19 / 26 | −1 % |
| `body` | 16 / 25 | |
| `label` (buttons) | 15 / 20 | |
| `eyebrow`, `caption` (serif capitals) | 15, 12 | +14 % |

## Shapes and sizes

- **Buttons:** 48px high (44 small, 56 large), 28px side padding, square. Primary: near-black with off-white text; in the dark theme the reverse. Outline: a 1px line that darkens on hover. Link: text with a line below. An optional → moves 3px on hover.
- **Inputs:** no box – one line below, 56px high, 19px text. Focus: a 2px ochre line. Disabled: dashed. Error: red line and a message with the red square. A boxed variant with a very fine frame for dense forms and the textarea.
- **Checkbox, switch:** square. **Radio:** a circle with a dot, so it reads differently from a checkbox.
- **Cards:** a quiet surface with 40px padding and no border, or editorial: image above, serif meta line, title, muted text, link.
- **Badges:** 28px, capitals, a fine line; the ochre square only on the one that matters.
- **Focus:** a 2px ochre ring with 3px offset on every interactive element.

## Iconography

Few icons. Thin line icons (1.25px, square caps) in the current text colour, ↗ for external links, → for "continue". No emoji, no icon circles, no gradients.

## Using it with shadcn/ui

The tokens carry the shadcn/ui names, so existing components take on the look:

| shadcn/ui token | Light | Dark |
|---|---|---|
| `background` / `foreground` | `surface-000` / `ink` | same names, dark values |
| `primary` / `primary-foreground` | `ink` / `surface-000` | off-white / near-black |
| `card` | `surface-100` | `surface-100` |
| `popover` | `surface-000` | `surface-100` |
| `secondary`, `muted`, `accent` | `surface-100` | `surface-200` / `surface-100` / `surface-200` |
| `muted-foreground` | `ink-muted` | `ink-muted` |
| `destructive` / `destructive-foreground` | `red` / off-white | `red` / off-white |
| `border` / `input` | `hairline` / `hairline-strong` | same |
| `ring` | `ochre` | `ochre` |
| `radius` | 0px | 0px |

Notes for an existing shadcn/ui project:

- `radius` is 0, so every `rounded-*` utility becomes square. Keep `rounded-full` on avatars and radio buttons.
- shadcn/ui's `accent` is the neutral hover background here. The brand accent is the extension `mark` (with `mark-tint`); `primary-hover` and `destructive-text` are the other two extensions.
- The dark theme is selected with `data-theme="dark"`. If your project switches with a `.dark` class, add `.dark` to that selector in `tokens.css`.

## Free and Pro

**Free** – the tokens and 18 base components, MIT licence:

| Group | Components |
|---|---|
| Actions | Button, IconButton, Link |
| Forms | Input, Textarea, Select, Checkbox, RadioGroup, Switch, Label |
| Display | Badge (also as Tag), Avatar, Card, Separator |
| Feedback | Alert, Toast, Tooltip |
| Overlays | Dialog |

Every free component has the states default, hover, focus, disabled and error, a live preview, and the shadcn/ui names for components, props and variants (`variant`, `size`, `asChild`, `onCheckedChange`, `onValueChange` …), so you can swap them one by one.

**Pro** – everything listed under a "Pro ·" group: page blocks (NavBar, Hero, FeatureTiles, FeatureStack, TestimonialRail, StatTiles, AudienceCard, Footer and others), portfolio parts (ProjectEntry, CaseStory) and the scroll-driven extras (ScrollFillText, BlurList, CardFan, Wordmark, Reveal).
