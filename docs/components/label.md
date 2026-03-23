# Component — Label

**Source:** MCM - DS / Label canvas (node `65:517`)
**Figma token:** `Label/Default`
**shadcn/ui:** `label`

---

## Description

Renders an accessible label associated with a form control. Always paired with an input, checkbox, radio, select, or other interactive control.

---

## Key styles (from Figma `Label/Default`)

| Property | Value |
|---|---|
| Font | Mulish |
| Size | 14px |
| Weight | 500 Medium |
| Line Height | 1.286 |
| Color (default) | `#18181B` |
| Color (disabled) | `#A1A1AA` |
| Color (error) | `#D32F2F` |

---

## Accessibility

- Always use `<label>` — never a `<span>` or `<div>` as a visual-only label
- Link to control via `htmlFor` matching the input's `id`
- Clicking the label should focus/toggle the associated control
- Required indicator: add `<span aria-hidden="true"> *</span>` visually + `aria-required="true"` on the input

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add label
```

```tsx
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Basic
<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" />

// Required field
<Label htmlFor="account">
  Account number <span aria-hidden="true" className="text-semantic-error">*</span>
</Label>
<Input id="account" aria-required="true" />

// Disabled state
<Label htmlFor="locked" className="text-muted-foreground">Locked field</Label>
<Input id="locked" disabled />
```
