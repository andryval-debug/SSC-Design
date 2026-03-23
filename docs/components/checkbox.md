# Component — Checkbox

**Source:** MCM - DS / Checkbox canvas (node `46:67`)
**shadcn/ui:** `checkbox`

---

## Description

A control that allows the user to toggle between checked and unchecked states. Used in forms for selecting one or more options from a set.

---

## Variants & States

| State | Description |
|---|---|
| **Unchecked** | Default empty state |
| **Checked** | Selected — shows checkmark icon |
| **Indeterminate** | Partially selected (e.g. parent of mixed children) |
| **Disabled Unchecked** | Not interactive |
| **Disabled Checked** | Checked but locked |

---

## Anatomy

- **Control:** 16×16px square, `border-radius: 4px`, `border: 1px solid #E4E4E7`
- **Checked fill:** `background: #42820D` (MCM Green), white checkmark icon
- **Label:** Mulish 14px Regular — placed to the right, `gap: 8px`
- **Focus ring:** `2px outline, #0069AA, offset: 2px`

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Checkbox** canvas → Dev Mode
2. Select the control box → Inspect: size (16×16), border, border-radius
3. Switch to Checked state → Inspect fill color `#42820D` and icon
4. Select label text → Inspect: font, weight, color, gap from checkbox

---

## Accessibility

- **`<input type="checkbox">`** — use native HTML, never a `<div>` pretending to be a checkbox
- **`<label>`** paired via `htmlFor` / `id` — clicking the label also toggles the checkbox
- **`aria-checked="true|false|mixed"`** for indeterminate state
- **Keyboard:** `Space` toggles the checkbox
- **Group of checkboxes:** Wrap in `<fieldset>` with `<legend>` describing the group
- **Required:** Add `aria-required="true"` and communicate validation state via `aria-invalid` + `aria-describedby`
- **Color:** Checked green `#42820D` on white → 4.5:1 ✓ (WCAG AA)

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add checkbox
```

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Basic
<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>

// Disabled
<div className="flex items-center gap-2">
  <Checkbox id="disabled" disabled />
  <Label htmlFor="disabled" className="text-muted-foreground">Unavailable option</Label>
</div>

// Group with fieldset
<fieldset>
  <legend className="font-medium text-sm mb-2">Notification preferences</legend>
  <div className="space-y-2">
    {["Email", "SMS", "Push"].map((option) => (
      <div key={option} className="flex items-center gap-2">
        <Checkbox id={option.toLowerCase()} />
        <Label htmlFor={option.toLowerCase()}>{option}</Label>
      </div>
    ))}
  </div>
</fieldset>

// Indeterminate (controlled)
<Checkbox
  checked={isIndeterminate ? "indeterminate" : isChecked}
  onCheckedChange={setIsChecked}
  aria-checked={isIndeterminate ? "mixed" : isChecked}
/>
```
