# Button

A 48px square button with a verb as its label ("Request a quote").

**Free** · shadcn/ui-compatible: same name, props and variants.

- **default** – near-black fill with off-white text; off-white with near-black text in the dark theme. One per screen.
- **outline** – a 1px `input` line that darkens on hover.
- **secondary** – a quiet `secondary` fill.
- **ghost** – no fill, `accent` on hover. Toolbars, cancel.
- **destructive** – muted dark red with off-white text.
- **link** – text with a 1px line below that thickens on hover.

`arrow` adds → after the label; it moves 3px on hover. Sizes: `sm` 44px, `default` 48px, `lg` 56px, `icon` 48×48. Side padding 28px. `asChild` renders your own element, `href` a link, `onMedia` (or a parent with `sg-media`) an off-white button over photos.

States: hover, focus (2px ochre `ring`, 3px offset), disabled (quiet fill, muted text). Legacy names still work: `primary` and `mono` → default, `mono-secondary` → outline.
