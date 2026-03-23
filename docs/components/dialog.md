# Component — Dialog

**Source:** MCM - DS / Dialog canvas (node `112:477`)
**shadcn/ui:** `dialog`

---

## Description

A window overlaid on the primary window. Used for content that requires user attention but doesn't demand an immediate decision. Different from Alert Dialog — Dialog can be dismissed without making a choice.

---

## Anatomy

- **Overlay:** `background: rgba(0,0,0,0.5)` — click to close
- **Container:** `background: #FFFFFF`, `border-radius: 8px`, `padding: 24px`, max-width: `512px`
- **Header:** Title + optional description
- **Body:** Flexible content area
- **Footer:** Optional action buttons
- **Close button:** Top-right × icon button

**Key styles:**
- Box shadow: `0 20px 60px rgba(0,0,0,0.3)`
- Max width: 512px
- Padding: 24px
- Title: `--type-subh2` (24px, semibold)

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Dialog** canvas → Dev Mode
2. Select container → Inspect: max-width, padding, border-radius, shadow
3. Select the header → Inspect: title/description typography
4. Check close button size (32×32px) and position (top: 16px, right: 16px)

---

## Accessibility

- **`role="dialog"`** on the container
- **`aria-modal="true"`** to trap focus inside
- **`aria-labelledby`** → ID of the title element
- **`aria-describedby`** → ID of the description (if present)
- **Focus trap:** First focusable element receives focus on open. On close, focus returns to the trigger.
- **Close button:** `aria-label="Close dialog"`
- **Keyboard:** `Escape` closes the dialog
- **Overlay click:** Closes the dialog (unless `modal` mode is enforced)

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add dialog
```

```tsx
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<Dialog>
  <DialogTrigger asChild>
    <Button>Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[512px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" defaultValue="Andrea Valerio" />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
