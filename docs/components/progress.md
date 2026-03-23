# Component — Progress

**Source:** MCM - DS / Progress canvas (node `65:441`)
**shadcn/ui:** `progress`

---

## Description

Displays a progress bar indicating how far along a process is. Used for file uploads, form completion, loading states, and step indicators.

---

## Key styles (from MCM tokens)

| Element | Value |
|---|---|
| Track background | `#EDEDF2` (MCM Gray BG) |
| Fill color | `#5E9732` (MCM Green Progress) |
| Height | 8px (default) · 4px (slim) · 16px (large) |
| Border-radius | `9999px` (pill) |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Progress** canvas → Dev Mode
2. Select track → Inspect: height, background, border-radius
3. Select fill bar → Inspect: background color `#5E9732`, width (percentage-based)

---

## Accessibility

- **`role="progressbar"`**
- **`aria-valuenow`** — current progress value (0–100)
- **`aria-valuemin="0"`** and **`aria-valuemax="100"`**
- **`aria-label`** or **`aria-labelledby`** describing what's progressing
- For indeterminate state: omit `aria-valuenow`
- Screen reader should announce completion when the bar reaches 100%

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add progress
```

```tsx
import { Progress } from "@/components/ui/progress"

// Determinate
<div>
  <div className="flex justify-between mb-1">
    <label className="text-sm font-medium">Payment Progress</label>
    <span className="text-sm text-mcm-gray">60%</span>
  </div>
  <Progress
    value={60}
    aria-label="Payment progress"
    className="h-2 bg-mcm-gray-bg [&>div]:bg-mcm-green-progress"
  />
</div>

// Indeterminate (loading)
<Progress aria-label="Loading..." className="h-2 [&>div]:bg-mcm-green-progress" />

// Animated on mount
const [progress, setProgress] = React.useState(0)
React.useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500)
  return () => clearTimeout(timer)
}, [])
<Progress value={progress} aria-valuenow={progress} />
```
