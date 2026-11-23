# Motion

Motion is quiet here. It shows that something arrives or changes, and then it stops.

## Rules

- **Arrive, don't perform.** Things rise a short distance (`rise-sm` 16px, `rise-md` 32px) and fade in. No flying in from the side, no spinning, no bouncing.
- **One curve for everything that arrives:** `ease-entrance` (fast start, long settle). State changes such as hover use `ease-standard`.
- **Short for interaction, longer for storytelling.** Hover `dur-fast`/`dur-base`, scroll content `dur-reveal`, hero entrance `dur-entrance`.
- **Stagger three steps at most** (`delay-1` to `delay-3`).
- **One loop per screen** – and only if it says something (scroll hint, running video).
- **Scroll-driven, not timed:** what follows scroll only smooths with `dur-scrub` (120ms, linear) and runs backwards when you scroll back. At most one such pattern per screen.
- **Reduced motion is respected:** with `prefers-reduced-motion` everything is there at once and videos do not autoplay.

## Patterns

| Pattern | Where | Values | Implementation |
|---|---|---|---|
| Hero entrance | first screen | `rise-sm`, `dur-entrance`, `ease-entrance`, `delay-1…3` | `Hero animate` or classes `sg-rise sg-delay-1` |
| Reveal | projects, sections | `rise-md`, `dur-reveal`, `ease-entrance` | `Reveal` |
| Sheet over the hero | portfolio home | square, no JS | hero in `sg-stick`, content in `sg-sheet` |
| Navigation turns solid | pages with a photo hero | `dur-base`, `ease-standard` | `NavBar sticky overMedia` |
| Button hover | everywhere | `dur-base`, 1px press | built in |
| Image zoom | project tiles | `zoom-media`, `dur-reveal` | built into `ProjectEntry` |
| Scroll hint | bottom of the hero | `bob`, `dur-loop`, `ease-loop` | `ScrollHint` |
| Video progress | hero video | ring, 120ms linear | `VideoToggle` |
| Case story | portfolio | fade `dur-overlay` + 200ms, bar 120ms linear, 5s per slide | `CaseStory` |
| Case link ring | portfolio | `dur-ring`, linear, endless | `ProjectEntry thumb` |
| Form progress | request | `dur-reveal`, `ease-entrance` | `StepForm` |
| FAQ open | accordion | plus → minus, `dur-base` | `Accordion` |
| Reading progress | long texts | follows scroll, 120ms linear | `ReadingDock` |
| Text fills | after the hero | `ink-unread` → `ink`, `dur-scrub` | `ScrollFillText` |
| Lines come into focus | problems / benefits | `blur-near`, `blur-far`, `dur-base`; strike `dur-reveal` | `BlurList` |
| Cards fan out | below the wordmark | `tilt`, `fan-overlap`, `dur-scrub` | `CardFan` |
| Sections stack | services | sticky, the previous one at 15 % and 4px blur | `FeatureStack` |
| Rail | testimonials | `dur-marquee`, linear, pauses on hover | `TestimonialRail` |

## Sheet over the hero

The hero sticks, the content after it has its own background and slides over it on scroll – pure CSS:

```html
<section class="sg-stick"> … hero with video … </section>
<main class="sg-sheet"> … content … </main>
```

## Don't

Parallax on text, cursor effects, letters flying in one by one (colouring words as in ScrollFillText is fine – they do not move), several scroll-driven patterns in a row, typewriter effects, confetti, loading animations before content, scroll-jacking.
