# Select

A single choice from a short list; the trigger looks like an Input.

**Free** · shadcn/ui-compatible: same name, props and variants. Compound like shadcn/ui: `Select` › `SelectTrigger` › `SelectValue`, `SelectContent` › `SelectItem`.

- `value` / `defaultValue` / `onValueChange`, `open` / `onOpenChange`, `disabled`, `name` (adds a hidden input).
- Keyboard: Enter, Space or arrows open it; arrows move; Enter picks; Escape or Tab closes.
- The list is a square `popover` with a soft shadow; rows highlight in `accent`, the chosen one shows an ochre check.
- `variant="boxed"` on the trigger matches a boxed Input. Error: `aria-invalid="true"` on the trigger.
