# Component — Toast / Sonner

**Source:** MCM - DS / Toast canvas · Sonner canvas
**shadcn/ui:** `sonner` (via `sonner` package) — replaces the older `toast`

---

## Description

A brief, auto-dismissing notification that appears temporarily at the edge of the screen. Used for feedback after an action (save, delete, error) without requiring user interaction.

---

## Variants

| Variant | Icon | Color | Use |
|---|---|---|---|
| **Default** | — | `#18181B` bg | Neutral information |
| **Success** | ✓ | `#42820D` accent | Action completed |
| **Error** | ✗ | `#D32F2F` accent | Action failed |
| **Warning** | ⚠ | `#F57C00` accent | Caution needed |
| **Info** | ℹ | `#0288D1` accent | Informational |
| **Loading** | Spinner | — | Async in progress |

---

## Key styles

| Element | Value |
|---|---|
| Container | `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 8px`, `padding: 16px` |
| Shadow | `0 4px 12px rgba(0,0,0,0.1)` |
| Position | Bottom-right (default) |
| Auto-dismiss | 4 seconds (configurable) |
| Width | 356px |
| Font | Mulish 14px Medium (title), 12px Regular (description) |

---

## Accessibility

- **`role="status"` / `aria-live="polite"`** for informational toasts — announced after current activity finishes
- **`role="alert"` / `aria-live="assertive"`** for error/destructive toasts — announced immediately
- Auto-dismiss timer must be long enough to read (≥ 3 seconds) — or provide a way to extend/pause
- Include a **close button** so users who can't read fast enough can dismiss manually: `aria-label="Close notification"`
- Never put critical information only in a toast — it may be missed

---

## React (shadcn/ui — Sonner)

```bash
npm install sonner
npx shadcn-ui@latest add sonner
```

```tsx
// _app.tsx or layout.tsx — add once
import { Toaster } from "@/components/ui/sonner"
<Toaster position="bottom-right" />

// Usage anywhere in the app
import { toast } from "sonner"

// Success
toast.success("Payment submitted", {
  description: "Your payment of $250.00 has been processed.",
})

// Error
toast.error("Payment failed", {
  description: "Please check your payment details and try again.",
})

// With action button
toast("Draft saved", {
  action: {
    label: "Undo",
    onClick: () => undoSave(),
  },
})

// Loading (async)
const toastId = toast.loading("Processing payment...")
// Later:
toast.success("Payment complete!", { id: toastId })
```
