# Component — Select

**Source:** MCM - DS / Select canvas (node `118:1264`)
**shadcn/ui:** `select`

---

## Description

A dropdown selector for choosing one option from a list. More accessible and stylable than a native `<select>` element.

---

## States

| State | Description |
|---|---|
| **Default** | Placeholder text visible |
| **Open** | Dropdown list visible |
| **Selected** | Shows chosen value |
| **Disabled** | Not interactive |

---

## Key styles

| Element | Value |
|---|---|
| Trigger height | 40px |
| Trigger border | `1px solid #E4E4E7` |
| Trigger padding | `8px 12px` |
| Border-radius | `6px` |
| Focus ring | `2px, #0069AA` |
| Dropdown | `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 6px` |
| Option height | 32px, `padding: 6px 8px` |
| Selected option | `background: #F4F4F5`, checkmark icon |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Select** canvas → Dev Mode
2. Select trigger → Inspect: height, border, padding, chevron icon
3. Open state → Inspect: dropdown width (matches trigger), item height, selected state

---

## Accessibility

- **`role="combobox"`** on the trigger
- **`aria-haspopup="listbox"`**
- **`aria-expanded`** reflects open/closed
- **`role="listbox"`** on the dropdown
- **`role="option"`** + **`aria-selected`** on each option
- **`aria-label`** or a visible `<label>` linked via `htmlFor`
- **Keyboard:** `Space`/`Enter` opens · `Arrow keys` navigate · `Enter` selects · `Escape` closes

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add select
```

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

<div className="grid gap-1.5">
  <Label htmlFor="payment-type">Payment type</Label>
  <Select>
    <SelectTrigger id="payment-type" className="w-[220px]">
      <SelectValue placeholder="Select type..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="one-time">One-time payment</SelectItem>
      <SelectItem value="recurring">Recurring payment</SelectItem>
      <SelectItem value="scheduled">Scheduled payment</SelectItem>
    </SelectContent>
  </Select>
</div>
```
