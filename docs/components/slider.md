# Component — Slider

**Source:** MCM - DS / Slider canvas
**shadcn/ui:** `slider`

---

## Description

An input control for selecting a value from a range by dragging a thumb along a track. Used for filters (price ranges, amounts) and settings (volume, zoom).

---

## Key styles

| Element | Value |
|---|---|
| Track height | 4px |
| Track background | `#E4E4E7` |
| Fill (range) | `#0069AA` (MCM Blue Light) |
| Thumb size | 20×20px |
| Thumb fill | `#FFFFFF`, `border: 2px solid #0069AA` |
| Thumb shadow | `0 2px 4px rgba(0,0,0,0.2)` |
| Focus ring on thumb | `2px, #0069AA, offset: 2px` |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Slider** canvas → Dev Mode
2. Select track → Inspect: height, background, border-radius
3. Select thumb → Inspect: size, fill, border, shadow
4. Check range fill segment color

---

## Accessibility

- **`role="slider"`** on the thumb
- **`aria-valuenow`** — current value
- **`aria-valuemin`** and **`aria-valuemax`**
- **`aria-valuetext`** for human-readable value (e.g. `"$500"` instead of just `500`)
- **`aria-label`** or **`aria-labelledby`** describing what's being controlled
- **Keyboard:** `Left`/`Right` (or `Down`/`Up`) arrows change value by step · `Home` = min · `End` = max · `PageUp/Down` = larger step

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add slider
```

```tsx
import { Slider } from "@/components/ui/slider"

// Payment amount range
const [amount, setAmount] = React.useState([500])

<div className="space-y-2">
  <div className="flex justify-between">
    <label className="text-sm font-medium">Payment amount</label>
    <span className="text-sm text-mcm-gray">${amount[0].toLocaleString()}</span>
  </div>
  <Slider
    min={0}
    max={5000}
    step={50}
    value={amount}
    onValueChange={setAmount}
    aria-label="Payment amount"
    aria-valuetext={`$${amount[0].toLocaleString()}`}
    className="[&>span:first-child]:bg-mcm-gray-bg [&>span:first-child>span]:bg-mcm-blue-light"
  />
  <div className="flex justify-between text-xs text-mcm-gray">
    <span>$0</span>
    <span>$5,000</span>
  </div>
</div>

// Range (two thumbs)
const [range, setRange] = React.useState([200, 1000])
<Slider min={0} max={5000} step={50} value={range} onValueChange={setRange} />
```
