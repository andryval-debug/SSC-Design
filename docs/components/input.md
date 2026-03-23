# Component — Input

**Source:** MCM - DS / Input canvas (node `65:520`)
**Component set:** `65:533` (Input / Basic), `297:2355` (Input / With Button)
**Description:** Displays a form input field or a component that looks like an input field.
**Font:** Label → Mulish 500, 14px (`Label/Default`)

---

## Description

The Input component is used for collecting single-line text from users. It supports optional labels, helper text, icons, and file upload variants.

---

## Variants

| Variant | Use |
|---|---|
| **Default** | Standard text input |
| **File** | File upload trigger (`<input type="file">`) |

---

## States

| State | Description |
|---|---|
| **Default** | Empty, ready for input |
| **Focus** | Active — user is typing, blue ring visible |
| **Filled** | Has a value entered |
| **Disabled** | Not interactive — grayed out |

---

## Layout modes

| Layout | Description |
|---|---|
| **Horizontal (No)** | Label stacked above the input (default) |
| **Horizontal (Yes)** | Label inline to the left of the input |

---

## Props (Figma component properties)

| Property | Type | Default |
|---|---|---|
| `Variant` | VARIANT | Default |
| `State` | VARIANT | Default |
| `Horizontal Layout` | VARIANT | No |
| `Label Text` | TEXT | "Label" |
| `Show Label` | BOOLEAN | false |
| `Placeholder Text` | TEXT | "Placeholder" |
| `Show Icon` | BOOLEAN | false |
| `Icon` | INSTANCE_SWAP | — |
| `Show Description` | BOOLEAN | false |
| `Description Text` | TEXT | "This is an input description." |
| `Show Link` | BOOLEAN | false |
| `Link Text` | TEXT | "Forgot your password?" |

---

## Input / With Button variant

Combines `Input / Basic` + `Button` side by side.
Example use: file picker ("Choose file") or search with submit.

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Input** canvas
2. Switch to **Dev Mode** (top-right toggle)
3. Select any input variant in the Components section
4. **Inspect** tab → padding, border, border-radius, gap, fill, font
5. Toggle **Horizontal Layout** in the right panel to see label placement change
6. Toggle **State** to compare Default / Focus / Filled / Disabled
7. The focus ring styling is visible in the Focus state inspect panel

---

## Accessibility

- **Always pair** `<label>` with `<input>` via `htmlFor` / `id` — screen readers read the label when the input receives focus
- **Placeholder is not a label** — do not use placeholder as the only identifier
- **Helper / support text:** Link via `aria-describedby` so screen readers announce it
- **Error state:** Add `aria-invalid="true"` and `aria-describedby` pointing to the error message element
- **Disabled:** Use `disabled` attribute — not just opacity styling
- **File input:** Provide a visible text label; the native file button is not reliably styled cross-browser

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add input label
```

```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Default with label (stacked)
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>

// With helper text
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="password">Password</Label>
  <Input
    type="password"
    id="password"
    aria-describedby="password-hint"
  />
  <p id="password-hint" className="text-sm text-muted-foreground">
    Must be at least 8 characters.
  </p>
</div>

// Error state
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="username">Username</Label>
  <Input
    type="text"
    id="username"
    aria-invalid="true"
    aria-describedby="username-error"
    className="border-semantic-error"
  />
  <p id="username-error" className="text-sm text-semantic-error">
    Username is already taken.
  </p>
</div>

// Disabled
<Input type="text" disabled placeholder="Not available" />

// File input
<div className="grid w-full max-w-sm items-center gap-1.5">
  <Label htmlFor="file">Upload file</Label>
  <Input id="file" type="file" />
</div>

// Horizontal layout (label inline)
<div className="flex items-center gap-4">
  <Label htmlFor="search" className="whitespace-nowrap">Search</Label>
  <Input id="search" type="search" placeholder="Search..." />
</div>
```
