# Toast

A short note in a corner that leaves by itself.

**Free** · shadcn/ui-compatible: same name, props and variants. Sonner-style API as in shadcn/ui: mount `<Toaster />` once, then `toast("Saved")`, `toast.success(…)`, `toast.error(…)`, `toast.dismiss(id)`.

- Options: `description`, `duration` (ms, default 4000, `Infinity` keeps it), `action: { label, onClick }`.
- Square, fine line, soft shadow; the ochre or red square marks the kind. Pauses on hover and focus.
- `position`: bottom-right (default), bottom-left, bottom-center, top-right, top-center. `inline` for docs. `Toast` is an alias of `Toaster`.
