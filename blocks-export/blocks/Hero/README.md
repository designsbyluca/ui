# Hero

One statement per screen: `display-xl` in two lines, the second (`muted`) in `ink-display-muted`, with an optional `lead`.

**Pro**

- Two lines of about 15 characters each.
- `dark` puts it on `surface-inverse`; `align="center"` centres everything.
- Below 640px the headline shrinks to 56px.

**Motion:** with `animate` the lines rise on load in three steps (`delay-1` to `delay-3`, `rise-sm`, `dur-entrance`). Only in the first hero of a page.
