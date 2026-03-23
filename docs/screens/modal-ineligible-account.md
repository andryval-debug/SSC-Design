# Screen — Modal: Ineligible Account

**Source:** MCM - SSC / Modals / Ineligible Account
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

A blocking modal displayed when the authenticated user's account is not eligible for any current offers. Explains the reason (e.g., account status, balance threshold not met) and provides a single exit action.

---

## Breakpoints

The modal uses responsive sizing:

| Breakpoint | Modal width |
|---|---|
| Desktop 1440px | 512px centered |
| Tablet Landscape 1024px | 480px centered |
| Tablet Portrait 768px | 90vw, max 480px |
| Mobile 375px | 100vw, bottom sheet style |

---

## Components used

| Component | Purpose |
|---|---|
| `AlertDialog` | Base blocking modal |
| `AlertDialogContent` | Modal shell with focus trap |
| `AlertDialogHeader` | Title + description area |
| `AlertDialogTitle` | "Account Not Eligible" heading |
| `AlertDialogDescription` | Explanation text |
| `AlertDialogFooter` | CTA button area |
| `AlertDialogAction` | "Close" or "Contact Us" primary action |

---

## Key styles

- Overlay: `background: rgba(0,0,0,0.5)`
- Modal background: `#FFFFFF`, `border-radius: 8px`
- Icon: Error/warning icon `color: #D32F2F` (`--color-error`), `56px`
- Title: Mulish 500, 20px, `color: #18181B`
- Description: Mulish 400, 14px, `color: #555555`
- CTA button: `background: #133B62`, full-width on mobile

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Modals** → **Ineligible Account** → Dev Mode
2. Select the modal container → inspect `border-radius`, `padding` (typically 24px)
3. Select the icon — note color and size
4. Check desktop vs mobile frames for width and positioning differences

---

## Accessibility

- `role="alertdialog"` on the modal (handled by `AlertDialog`)
- `aria-modal="true"` prevents background interaction
- `aria-labelledby` points to the title element
- `aria-describedby` points to the description element
- **Focus trap:** focus must cycle within the modal; does not reach background content
- **Escape key:** does NOT close this modal — it is a blocking state requiring an explicit action
- The single CTA button receives focus on open
- Background page is `aria-hidden="true"` while modal is open
- Screen reader announcement: the `alertdialog` role triggers immediate announcement of the title

---

## React

```tsx
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogAction
} from "@/components/ui/alert-dialog"
import { AlertCircle } from "lucide-react"

interface IneligibleAccountModalProps {
  open: boolean
  reason?: string
  onClose: () => void
}

export function IneligibleAccountModal({ open, reason, onClose }: IneligibleAccountModalProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        className="max-w-[512px]"
        onEscapeKeyDown={(e) => e.preventDefault()} // blocking — no escape dismiss
      >
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-14 w-14 text-[#D32F2F]" aria-hidden="true" />
          </div>
          <AlertDialogTitle className="text-center">
            Account Not Eligible
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {reason ?? "Your account does not currently qualify for any settlement offers. Please contact us for more information."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction
            onClick={onClose}
            className="bg-mcm-blue hover:bg-mcm-blue/90 min-w-[160px]"
          >
            Close
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```
