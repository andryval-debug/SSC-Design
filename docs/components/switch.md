# Component — Switch

**Source:** MCM - DS / Switch canvas
**shadcn/ui:** `switch`

---

## Description

A toggle control for binary on/off states. Visually similar to a physical toggle switch. Used for settings and feature toggles where the effect is immediate (no save button needed).

---

## States

| State | Description |
|---|---|
| **Off** | Track: `#E4E4E7`, thumb: `#FFFFFF` |
| **On** | Track: `#42820D` (MCM Green), thumb: `#FFFFFF` |
| **Disabled Off** | Opacity 50%, not interactive |
| **Disabled On** | Opacity 50%, not interactive |

---

## Key styles

| Element | Value |
|---|---|
| Track size | 44×24px |
| Track border-radius | `9999px` |
| Thumb size | 20×20px, circle |
| Thumb shadow | `0 1px 3px rgba(0,0,0,0.2)` |
| Transition | `0.2s ease` on thumb position |
| Focus ring | `2px, #0069AA, offset: 2px` |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Switch** canvas → Dev Mode
2. Select Off state → Inspect: track color `#E4E4E7`, thumb position (left)
3. Select On state → Inspect: track color `#42820D`, thumb position (right)
4. Measure thumb travel distance

---

## Accessibility

- **`role="switch"`** with **`aria-checked="true|false"`**
- **`<label>`** linked via `htmlFor` describing what the switch controls
- **Keyboard:** `Space` or `Enter` toggles the switch
- Immediate effect: label must clearly describe what happens when on/off (e.g. "Email notifications" not just "Notifications")
- If the effect is not immediate (requires save), use Checkbox instead

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add switch
```

```tsx
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Basic
<div className="flex items-center gap-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Email notifications</Label>
</div>

// Controlled
const [enabled, setEnabled] = React.useState(false)

<div className="flex items-center justify-between rounded-lg border p-4">
  <div>
    <Label htmlFor="paper-statements" className="font-medium">Paper statements</Label>
    <p className="text-sm text-mcm-gray">Receive monthly statements by mail.</p>
  </div>
  <Switch
    id="paper-statements"
    checked={enabled}
    onCheckedChange={setEnabled}
    className="data-[state=checked]:bg-mcm-green"
  />
</div>
```
