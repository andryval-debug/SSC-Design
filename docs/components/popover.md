# Component — Popover

**Source:** MCM - DS / Popover canvas (node `193:1388`)
**shadcn/ui:** `popover`

---

## Description

A floating content panel anchored to a trigger. Used for supplementary content that doesn't require a full modal — filters, settings, quick forms.

---

## Key styles

- Container: `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 8px`, `padding: 16px`
- Width: flexible (content-driven), min 200px
- Shadow: `0 4px 12px rgba(0,0,0,0.08)`
- Arrow/caret: 8px pointing to trigger

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Popover** canvas → Dev Mode
2. Select popover container → Inspect: padding, border, shadow, border-radius
3. Check positioning relative to trigger (top, bottom, left, right variants)

---

## Accessibility

- **`role="dialog"`** on the content panel
- **`aria-modal="false"`** — unlike Dialog, popover doesn't trap focus
- Trigger: `aria-haspopup="dialog"`, `aria-expanded`
- Close button inside: `aria-label="Close"`
- **Keyboard:** `Escape` closes · Focus stays within the popover (soft trap) · Tab exits back to the page

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add popover
```

```tsx
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Filter Options</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <h4 className="font-medium leading-none">Dimensions</h4>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="min-amount">Min amount</Label>
          <Input id="min-amount" type="number" className="col-span-2" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="max-amount">Max amount</Label>
          <Input id="max-amount" type="number" className="col-span-2" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
```
