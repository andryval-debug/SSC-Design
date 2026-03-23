# Component — Button

**Source:** MCM - DS / Button canvas (node `34:6`)
**Component set:** `37:931`
**Font:** Mulish 500 (Medium), 14px — token `Button/Default`

---

## Description

The Button component triggers actions and navigates between states. It is the primary interactive element across all MCM screens.

---

## Variants

| Variant | Background | Use |
|---|---|---|
| **Default** | MCM Blue `#0069AA` | Primary action — most important CTA on a surface |
| **Secondary** | — | Secondary action — less prominent than Default |
| **Ghost** | Transparent | Tertiary / minimal visual weight |
| **Link** | Transparent, underlined | Navigation-style action, inline with text |

---

## States

| State | Description |
|---|---|
| **Default** | Resting / idle |
| **Hover** | Mouse over — slight overlay applied |
| **Disabled** | Not interactive — reduced opacity, cursor: not-allowed |
| **Loading** | Async action in progress — shows Loader icon |
| **Focus** | Keyboard navigation — visible focus ring required |

---

## Sizes

| Size | Use |
|---|---|
| `sm` | Dense UIs, inline buttons |
| `default` | Standard — most common |
| `lg` | Hero sections, prominent CTAs |
| `icon` | Icon-only button — no text label |

---

## Props (Figma component properties)

| Property | Type | Default | Options |
|---|---|---|---|
| `Variant` | VARIANT | Default | Default, Secondary, Ghost, Link |
| `State` | VARIANT | Default | Default, Hover, Disabled, Loading |
| `Size` | VARIANT | default | default, sm, lg, icon |
| `Button Text` | TEXT | "Button" | Any string |
| `Show Left Icon` | BOOLEAN | false | true / false |
| `Show Right Icon` | BOOLEAN | false | true / false |
| `Left Icon` | INSTANCE_SWAP | Icon/Circle | Any icon component |
| `Right Icon` | INSTANCE_SWAP | Icon/Circle | Any icon component |

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Button** canvas
2. Switch to **Dev Mode** (top-right toggle)
3. Select a button variant in the Components section
4. **Inspect** tab → shows padding, gap, border-radius, fill, font
5. **Copy** → CSS or React code snippet
6. Switch variants with the dropdown in the right panel to compare states

Key measurements:
- Padding: `8px 16px` (default size)
- Border radius: `6px`
- Gap (icon + text): `8px`
- Height: `40px` (default)

---

## Accessibility

- **Role:** `<button>` — never use `<div>` or `<span>` for clickable actions
- **Keyboard:** `Enter` and `Space` activate the button
- **Focus:** Visible focus ring — do not remove `outline` in CSS without a custom replacement
- **Disabled:** Use `disabled` attribute (not just visual styling) — this removes it from tab order
- **Loading state:** Add `aria-busy="true"` and `aria-label` describing the pending action
- **Icon-only buttons:** Always provide `aria-label` — the visual icon alone is insufficient
- **Color:** Default blue `#0069AA` on white = 4.6:1 contrast ✓ (WCAG AA)

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add button
```

```tsx
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Default
<Button>Primary Action</Button>

// Secondary
<Button variant="secondary">Secondary</Button>

// Ghost
<Button variant="ghost">Cancel</Button>

// Link
<Button variant="link">Learn more</Button>

// With icon
<Button>
  <PlusIcon className="mr-2 h-4 w-4" />
  Add Item
</Button>

// Loading
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Processing...
</Button>

// Icon only — accessibility required
<Button variant="ghost" size="icon" aria-label="Close dialog">
  <XIcon className="h-4 w-4" />
</Button>
```

---

## Tailwind token mapping

```tsx
// Default button (MCM Green matches DS)
<button className="
  bg-mcm-green text-white
  px-4 py-2 rounded-md
  text-sm font-medium
  hover:bg-mcm-blue
  focus:outline-none focus:ring-2 focus:ring-mcm-blue-light
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Button
</button>
```
