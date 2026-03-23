# Component — Alert

**Source:** MCM - DS / Alert canvas (node `21:322`)
**Component set:** `26:160`

---

## Description

Displays an important message or feedback to the user. Used for inline status messages — not to be confused with a modal or toast notification.

---

## Variants

| Variant | Border | Use |
|---|---|---|
| **Default** | `#E4E4E7` (light gray) | General information or neutral feedback |
| **Destructive** | `#DC2626` (red) | Error message or critical warning |

---

## Anatomy

- **Container:** `padding: 16px`, `gap: 4px` between content rows, `border-radius: 8px`
- **Width:** 634px fixed (in DS frame) — fluid in implementation
- **Border:** 1px solid, color varies by variant

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Alert** canvas
2. Switch to **Dev Mode** (top-right toggle)
3. Select the Default or Destructive alert in the Components section
4. **Inspect** → border, padding, gap, border-radius, fill
5. Content structure: title row + description row stacked with `gap: 4px`

---

## Accessibility

- **Role:** Use `role="alert"` for messages that appear dynamically (screen reader announces immediately)
- **Role `status`:** For less urgent notifications that don't require immediate attention
- **`aria-live="assertive"`:** Use for destructive/error alerts that need immediate announcement
- **`aria-live="polite"`:** Use for informational alerts
- **Icon + text:** Always include both icon and descriptive text — never icon-only
- **Heading inside alert:** If the alert has a title, use a heading element (`<h2>` etc.) for hierarchy
- **Contrast:** Destructive red border `#DC2626` — ensure text color inside also meets 4.5:1

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add alert
```

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"

// Default (informational)
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>
    Your session will expire in 5 minutes.
  </AlertDescription>
</Alert>

// Destructive (error)
<Alert variant="destructive" role="alert">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your account could not be updated. Please try again.
  </AlertDescription>
</Alert>

// Dynamic alert (live region)
<Alert aria-live="polite" role="status">
  <Info className="h-4 w-4" />
  <AlertDescription>
    Your changes have been saved.
  </AlertDescription>
</Alert>
```
