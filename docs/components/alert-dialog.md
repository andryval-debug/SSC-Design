# Component — Alert Dialog

**Source:** MCM - DS / Alert Dialog canvas (node `22:307`)
**shadcn/ui:** `alert-dialog`

---

## Description

A modal dialog that interrupts the user with important content and expects a response. Used for **irreversible or destructive actions** — different from Dialog which is used for general content.

---

## Variants

| Property | Values |
|---|---|
| Type | Confirmation · Destructive |
| State | Open · Closed |

---

## Anatomy

- **Overlay:** Semi-transparent backdrop (`rgba(0,0,0,0.5)`) blocks interaction with the page
- **Container:** Centered modal card, `border-radius: 8px`, `padding: 24px`
- **Title:** `<h2>` — required, bold
- **Description:** Body text below title — explains the consequence
- **Footer:** Two buttons — Cancel (ghost/secondary) + Confirm (default or destructive)

**Key measurements:**
- Max width: 512px
- Padding: 24px
- Border-radius: 8px
- Gap between buttons: 8px

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Alert Dialog** canvas → Dev Mode
2. Select the modal container → Inspect: width, padding, border-radius, shadow
3. Select each button to see correct variant (Cancel = ghost, Confirm = default or destructive)
4. Check overlay layer for opacity value

---

## Accessibility

- **`role="alertdialog"`** — tells screen readers this requires a response
- **`aria-modal="true"`** — traps focus inside the dialog
- **`aria-labelledby`** → points to the title element ID
- **`aria-describedby`** → points to the description element ID
- **Focus trap:** On open, focus moves to the Cancel button (safer default). On close, focus returns to the trigger.
- **Keyboard:** `Tab` cycles through Cancel → Confirm → (repeat). `Escape` closes (cancel action only — never triggers confirm).
- **Never auto-confirm** on keyboard Enter — user must explicitly click the confirm button.

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add alert-dialog
```

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

// Destructive confirmation
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove all associated data.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-semantic-error hover:bg-red-700">
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```
