# Component — Tooltip

**Source:** MCM - DS / Tooltip canvas
**shadcn/ui:** `tooltip`

---

## Description

A small popup that appears on hover or focus, showing a short description for an element. Used to label icon buttons, explain disabled states, or provide extra context without cluttering the UI.

---

## Key styles

| Element | Value |
|---|---|
| Background | `#18181B` (dark) |
| Text color | `#FFFFFF` |
| Font | Mulish 12px Regular (Scale 07 — Small Text) |
| Padding | `4px 8px` |
| Border-radius | `6px` |
| Max width | 256px |
| Arrow | 6px pointing to trigger |
| Show delay | `~300ms` |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Tooltip** canvas → Dev Mode
2. Select tooltip container → Inspect: background, padding, border-radius
3. Check arrow positioning for all 4 sides (top, bottom, left, right)

---

## Accessibility

- **`role="tooltip"`** on the content
- Trigger: **`aria-describedby`** pointing to the tooltip ID — this is how screen readers access the tooltip content
- **Must appear on focus** (keyboard), not only on hover
- **Must be dismissible** via `Escape` while keeping focus on the trigger
- **Never put interactive content** inside a tooltip (links, buttons) — use Popover instead
- **Never use tooltip as the only label** for an icon button — tooltip is supplementary. Always add `aria-label` on the button itself.
- Tooltip content must not duplicate the button's accessible name

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add tooltip
```

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

// Wrap app with TooltipProvider once
<TooltipProvider>
  {children}
</TooltipProvider>

// Icon button with tooltip
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Download statement">
      <Download className="h-4 w-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Download PDF statement</p>
  </TooltipContent>
</Tooltip>

// Explain disabled state
<Tooltip>
  <TooltipTrigger asChild>
    <span tabIndex={0}>
      <Button disabled aria-describedby="submit-tooltip">Submit payment</Button>
    </span>
  </TooltipTrigger>
  <TooltipContent id="submit-tooltip">
    <p>Please fill in all required fields before submitting.</p>
  </TooltipContent>
</Tooltip>
```
