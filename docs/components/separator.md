# Component — Separator

**Source:** MCM - DS / Separator canvas (node `118:2682`)
**shadcn/ui:** `separator`

---

## Description

A visual divider — horizontal or vertical line — used to separate groups of content or navigation items.

---

## Variants

| Property | Values |
|---|---|
| Orientation | `horizontal` · `vertical` |

---

## Key styles

| Property | Value |
|---|---|
| Color | `#E4E4E7` |
| Thickness | `1px` |
| Horizontal | `width: 100%`, `height: 1px` |
| Vertical | `width: 1px`, `height: 100%` |

---

## Accessibility

- **`role="separator"`** — screen readers announce it as a divider
- **`aria-orientation="horizontal|vertical"`**
- If purely decorative: `role="none"` + `aria-hidden="true"`

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add separator
```

```tsx
import { Separator } from "@/components/ui/separator"

// Horizontal (default)
<Separator className="my-4" />

// Vertical (in flex container)
<div className="flex h-5 items-center gap-4">
  <span>Account Summary</span>
  <Separator orientation="vertical" />
  <span>Payments</span>
</div>

// Decorative only
<Separator aria-hidden="true" />
```
