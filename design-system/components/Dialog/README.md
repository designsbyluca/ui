# Dialog

A modal window for a short task: square, 560px wide, 48px padding, a large title.

**Free** · shadcn/ui-compatible: same name, props and variants. `Dialog` › `DialogTrigger`, `DialogContent` › `DialogHeader` (`DialogTitle`, `DialogDescription`), `DialogFooter`, `DialogClose`.

- `open` / `defaultOpen` / `onOpenChange`; `asChild` on trigger and close.
- Focus moves in and stays; Escape, the overlay and × close it; focus returns to the trigger.
- A serif-capital eyebrow above the title is welcome. Main action last in the footer.
- `role="alertdialog"` for confirmations, `showCloseButton={false}` hides ×.
