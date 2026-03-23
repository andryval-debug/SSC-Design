# Component — Radio Group

**Source:** MCM - DS / Radio Group canvas (node `64:316`)
**shadcn/ui:** `radio-group`

---

## Description

A group of radio buttons where only one option can be selected at a time. Used for mutually exclusive choices in forms.

---

## States

| State | Description |
|---|---|
| **Unselected** | Empty circle |
| **Selected** | Filled circle with MCM Blue center dot |
| **Disabled** | Grayed out, not interactive |

---

## Key styles

| Element | Value |
|---|---|
| Radio control size | 16×16px |
| Control border | `1px solid #E4E4E7` |
| Selected fill | Outer ring `#0069AA`, inner dot `#FFFFFF` |
| Label | Mulish 14px Regular, `gap: 8px` |
| Focus ring | `2px, #0069AA, offset: 2px` |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Radio Group** canvas → Dev Mode
2. Select unselected radio → Inspect: size, border
3. Select selected radio → Inspect: outer ring color `#0069AA`, inner dot
4. Check label gap and alignment

---

## Accessibility

- **`role="radiogroup"`** on the group container
- **`role="radio"`** on each option with `aria-checked`
- Wrap in `<fieldset>` with `<legend>` describing the group
- **Keyboard:** `Tab` enters the group · `Arrow keys` move between options · `Space` selects the focused option
- Only the selected (or first, if none) radio is in the tab order — others are reached via arrow keys
- `aria-required="true"` on the group if selection is mandatory

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add radio-group
```

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<fieldset>
  <legend className="font-medium text-sm mb-3">Payment method</legend>
  <RadioGroup defaultValue="card">
    <div className="flex items-center gap-2">
      <RadioGroupItem value="card" id="card" />
      <Label htmlFor="card">Credit / Debit card</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem value="bank" id="bank" />
      <Label htmlFor="bank">Bank transfer</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem value="check" id="check" disabled />
      <Label htmlFor="check" className="text-muted-foreground">Check (unavailable)</Label>
    </div>
  </RadioGroup>
</fieldset>
```
