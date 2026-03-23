# Component — Badge

**Source:** MCM - DS / Badge canvas (node `23:995`)
**Component set:** `26:169`

---

## Description

A small label used to display status, category, or count information. Always inline — never used as an interactive trigger.

---

## Variants

| Variant | Background | Border | Use |
|---|---|---|---|
| **Default** | `#18181B` (dark) | Transparent | Primary status label |
| **Secondary** | `#F4F4F5` (light gray) | Transparent | Low-emphasis label |
| **Outline** | None | `#E4E4E7` | Subtle / ghost badge |
| **Destructive** | `#DC2626` (red) | Transparent | Error / critical status |

---

## States

| State | Description |
|---|---|
| **Default** | Resting state |
| **Hover** | Mouse over — overlay applied |
| **Focus** | Keyboard navigation |

---

## Anatomy

- **Container:** `border-radius: 9999px` (pill shape)
- **Padding:** `2px 10px`
- **Layout:** Row, centered, `gap: 10px`
- **Text style:** Scale 13 — Tag Text (Mulish, Medium)

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Badge** canvas
2. Switch to **Dev Mode** (top-right toggle)
3. Select a badge variant in the Components section (purple dashed outline marks the component set)
4. **Inspect** → shows `border-radius`, `padding`, `fill`, font
5. Switch variants via the **Variant** dropdown in the right panel

---

## Accessibility

- **Role:** Use `<span>` or `<div>` — badges are informational, not interactive
- **Never use `<button>`** for a badge — if it triggers an action, use a Chip or Tag component instead
- **Color-only:** Destructive red badge must include a text label (not just red styling)
- **Screen reader:** The text content of the badge is announced. For icon-only badges add `aria-label`.
- **Contrast:** Default dark `#18181B` on white → ~17:1 ✓ · Destructive red `#DC2626` on white → ~4.7:1 ✓ (WCAG AA)

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add badge
```

```tsx
import { Badge } from "@/components/ui/badge"

// Default (dark)
<Badge>New</Badge>

// Secondary
<Badge variant="secondary">Draft</Badge>

// Outline
<Badge variant="outline">Pending</Badge>

// Destructive
<Badge variant="destructive">Overdue</Badge>

// Common patterns
<Badge variant="secondary">
  <CheckCircleIcon className="mr-1 h-3 w-3" />
  Active
</Badge>
```
