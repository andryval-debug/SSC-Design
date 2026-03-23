# Component — Textarea

**Source:** MCM - DS / Textarea canvas
**shadcn/ui:** `textarea`

---

## Description

A multi-line text input for longer content — comments, messages, descriptions. Based on the native `<textarea>` element with MCM styling.

---

## States

| State | Description |
|---|---|
| **Default** | Empty, ready for input |
| **Focus** | Blue ring visible |
| **Filled** | Contains text |
| **Disabled** | Not interactive, grayed out |
| **Error** | Red border, error message below |

---

## Key styles

| Property | Value |
|---|---|
| Min height | 80px |
| Padding | `8px 12px` |
| Border | `1px solid #E4E4E7` |
| Border-radius | `6px` |
| Focus border | `#0069AA` + `ring: 2px` |
| Font | Mulish 14px Regular (Scale 10 — Form Value) |
| Resize | `vertical` only |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Textarea** canvas → Dev Mode
2. Select control → Inspect: min-height, padding, border, border-radius
3. Compare Default vs Focus vs Error states for border-color changes

---

## Accessibility

- **`<textarea>`** with a paired **`<label htmlFor>`** — required
- **`aria-describedby`** for helper/error text below
- **`aria-invalid="true"`** + **`aria-describedby`** pointing to error message on error state
- **`aria-required="true"`** when mandatory
- **`maxlength`** attribute when character limit applies — show live character count with `aria-live="polite"`
- Resize is limited to vertical — never disable resize entirely

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add textarea
```

```tsx
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Basic
<div className="grid gap-1.5">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" placeholder="Describe your request..." />
</div>

// With character count
const [text, setText] = React.useState("")
const MAX = 500

<div className="grid gap-1.5">
  <div className="flex justify-between">
    <Label htmlFor="notes">Notes</Label>
    <span className="text-xs text-mcm-gray" aria-live="polite">{text.length}/{MAX}</span>
  </div>
  <Textarea
    id="notes"
    maxLength={MAX}
    value={text}
    onChange={e => setText(e.target.value)}
  />
</div>

// Error state
<div className="grid gap-1.5">
  <Label htmlFor="reason">Reason</Label>
  <Textarea
    id="reason"
    aria-invalid="true"
    aria-describedby="reason-error"
    className="border-semantic-error"
  />
  <p id="reason-error" className="text-sm text-semantic-error">Reason is required.</p>
</div>
```
