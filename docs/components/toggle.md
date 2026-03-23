# Component — Toggle

**Source:** MCM - DS / Toggle canvas
**shadcn/ui:** `toggle`

---

## Description

A two-state button — pressed or not pressed. Used for bold/italic/underline formatting, view mode switching (list/grid), or any binary action that needs to persist visually.

---

## Variants & States

| Property | Values |
|---|---|
| Variant | `default` · `outline` |
| Size | `sm` · `default` · `lg` |
| State | Off (default) · On (pressed) · Disabled |

---

## Key styles

| State | Background | Border | Color |
|---|---|---|---|
| Off | Transparent | — (default) / `#E4E4E7` (outline) | `#71717A` |
| On (pressed) | `#F4F4F5` | — | `#18181B` |
| Hover | `#F4F4F5` | — | `#18181B` |
| Disabled | — | — | `#A1A1AA`, opacity 50% |

- Height: 36px (default), 28px (sm), 40px (lg)
- Border-radius: 6px
- Padding: 8px 12px

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Toggle** canvas → Dev Mode
2. Compare Off vs Pressed states → background and color differences
3. Check outline variant for border color

---

## Accessibility

- **`aria-pressed="true|false"`** reflects the pressed state
- Label: visible text or `aria-label` for icon-only toggles
- **Keyboard:** `Enter`/`Space` toggles the pressed state
- Use Toggle for persistent state (bold ON/OFF); use Button for one-time actions

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add toggle
```

```tsx
import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, Underline } from "lucide-react"

// Text formatting toolbar
<div className="flex gap-1" role="toolbar" aria-label="Text formatting">
  <Toggle aria-label="Bold" aria-pressed={isBold} onPressedChange={setIsBold}>
    <Bold className="h-4 w-4" />
  </Toggle>
  <Toggle aria-label="Italic" aria-pressed={isItalic} onPressedChange={setIsItalic}>
    <Italic className="h-4 w-4" />
  </Toggle>
  <Toggle aria-label="Underline" aria-pressed={isUnderline} onPressedChange={setIsUnderline}>
    <Underline className="h-4 w-4" />
  </Toggle>
</div>

// Outline variant with text
<Toggle variant="outline">
  Grid view
</Toggle>
```
