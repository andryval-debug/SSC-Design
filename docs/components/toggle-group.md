# Component — Toggle Group

**Source:** MCM - DS / Toggle Group canvas
**shadcn/ui:** `toggle-group`

---

## Description

A group of Toggle buttons where either one (single) or multiple (multiple) can be active at a time. Used for view switching, filter chips, segmented controls.

---

## Variants

| Property | Values |
|---|---|
| Type | `single` (one active at a time) · `multiple` (many can be active) |
| Variant | `default` · `outline` |
| Size | `sm` · `default` · `lg` |

---

## Key styles

- Container: `display: flex`, `gap: 4px`
- Active item: same as Toggle pressed state (`background: #F4F4F5`)
- Single type behaves like a radio group — exactly one is always active

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Toggle Group** canvas → Dev Mode
2. Select a group → check gap between items and layout direction
3. Select active item → Inspect pressed state styling

---

## Accessibility

- **`role="group"`** with **`aria-label`** on the container
- For `single` type: behaves like **`role="radiogroup"`** — active item has `aria-pressed="true"`, others `"false"`
- For `multiple` type: each item independently has `aria-pressed`
- **Keyboard (single):** `Left`/`Right` arrows navigate and auto-select · `Tab` enters/exits the group
- **Keyboard (multiple):** `Tab` moves between items · `Space`/`Enter` toggles each

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add toggle-group
```

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { LayoutGrid, List, BarChart2 } from "lucide-react"

// Single — view mode switcher
<ToggleGroup type="single" defaultValue="list" aria-label="View mode">
  <ToggleGroupItem value="list" aria-label="List view">
    <List className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="grid" aria-label="Grid view">
    <LayoutGrid className="h-4 w-4" />
  </ToggleGroupItem>
  <ToggleGroupItem value="chart" aria-label="Chart view">
    <BarChart2 className="h-4 w-4" />
  </ToggleGroupItem>
</ToggleGroup>

// Multiple — filter chips
<ToggleGroup type="multiple" aria-label="Payment status filter">
  <ToggleGroupItem value="paid">Paid</ToggleGroupItem>
  <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
  <ToggleGroupItem value="overdue">Overdue</ToggleGroupItem>
</ToggleGroup>
```
