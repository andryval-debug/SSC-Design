# Component — Sheet

**Source:** MCM - DS / Sheet canvas (node `216:3314`)
**shadcn/ui:** `sheet`

---

## Description

A dialog that slides in from the edge of the screen. Similar to Drawer but with full modal behavior (focus trap). Used for side panels, forms, navigation drawers.

---

## Variants

| Property | Values |
|---|---|
| Side | `top` · `right` · `bottom` · `left` |

---

## Key styles

| Element | Value |
|---|---|
| Background | `#FFFFFF` |
| Right/Left width | 400px (default) |
| Top/Bottom height | 400px (default) |
| Padding | `24px` |
| Overlay | `rgba(0,0,0,0.5)` |
| Shadow | `−8px 0 24px rgba(0,0,0,0.1)` (right sheet) |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Sheet** canvas → Dev Mode
2. Select sheet panel → Inspect: width, padding, shadow
3. Check header: title + close button positioning
4. Compare left vs right slide-in positions

---

## Accessibility

Identical to Dialog:
- **`role="dialog"`** with **`aria-modal="true"`**
- **`aria-labelledby`** and **`aria-describedby`**
- Focus trap on open, returns to trigger on close
- Close button: `aria-label="Close panel"`
- `Escape` closes the sheet

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add sheet
```

```tsx
import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

// Right side panel
<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Filters</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Filter Payments</SheetTitle>
      <SheetDescription>Refine your payment history view.</SheetDescription>
    </SheetHeader>
    <div className="py-6">
      {/* Filter form fields */}
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button variant="outline">Reset</Button>
      </SheetClose>
      <Button>Apply Filters</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>

// Left navigation panel (mobile menu)
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Open navigation menu">
      <MenuIcon className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left">
    <nav aria-label="Mobile navigation">
      {/* Nav items */}
    </nav>
  </SheetContent>
</Sheet>
```
