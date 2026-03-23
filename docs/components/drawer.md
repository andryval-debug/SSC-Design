# Component — Drawer

**Source:** MCM - DS / Drawer canvas (node `112:454`)
**shadcn/ui:** `drawer` (via `vaul`)

---

## Description

A panel that slides in from the edge of the screen. Used for navigation, filters, or supplementary content. Common on mobile — often replaces Dialog on small screens.

---

## Variants

| Property | Values |
|---|---|
| Direction | `bottom` · `top` · `left` · `right` |
| Size | Partial (snap) · Full height |

---

## Key styles

- Background: `#FFFFFF`
- Border-radius (bottom drawer): `16px 16px 0 0`
- Handle: `4px × 32px`, `background: #E4E4E7`, centered, `margin: 8px auto`
- Overlay: `rgba(0,0,0,0.5)`

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Drawer** canvas → Dev Mode
2. Select drawer panel → Inspect: border-radius, shadow, handle size
3. Check max-height and snap point for partial/full states

---

## Accessibility

- **`role="dialog"`** with `aria-modal="true"`
- **`aria-labelledby`** and **`aria-describedby`** same as Dialog
- **Focus trap:** Focus moves inside on open, returns to trigger on close
- **Keyboard:** `Escape` closes · `Tab` navigates within the drawer
- **Handle:** `aria-label="Resize drawer"` or `aria-hidden="true"` if not keyboard-focusable
- On mobile, swipe-to-dismiss is supplementary — keyboard dismiss (`Escape`) must also work

---

## React (shadcn/ui)

```bash
npm install vaul
npx shadcn-ui@latest add drawer
```

```tsx
import {
  Drawer, DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Account Filters</DrawerTitle>
      <DrawerDescription>Refine your account view.</DrawerDescription>
    </DrawerHeader>
    <div className="p-4">
      {/* Filter content */}
    </div>
    <DrawerFooter>
      <Button>Apply</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```
