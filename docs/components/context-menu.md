# Component — Context Menu

**Source:** MCM - DS / Context Menu canvas (node `60:437`)
**shadcn/ui:** `context-menu`

---

## Description

A menu displayed on right-click (or long-press on touch). Shows context-specific actions for the target element.

---

## Anatomy

- **Trigger:** Any element — right-click activates the menu
- **Menu container:** `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 6px`, `padding: 4px`, `box-shadow: 0 4px 12px rgba(0,0,0,0.1)`
- **Item:** `padding: 6px 8px`, hover: `background: #F4F4F5`
- **Separator:** `1px solid #E4E4E7`
- **Sub-trigger:** Item with chevron → opens nested submenu

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Context Menu** canvas → Dev Mode
2. Select menu container → Inspect: border, shadow, border-radius, padding
3. Select menu item → Inspect: height, padding, hover fill, font
4. Check submenu indicator icon (ChevronRight, 16px)

---

## Accessibility

- **`role="menu"`** on the container
- **`role="menuitem"`** on each item
- **`role="menuitemcheckbox"`** / **`role="menuitemradio"`** for checkable items
- **Keyboard:** `Arrow keys` navigate · `Enter`/`Space` activate · `Escape` closes · `ArrowRight` opens submenu
- **Focus management:** When opened, focus moves to the first item. On close, returns to the trigger element.
- **Not discoverable by keyboard alone** — always provide an alternative way to access the same actions (e.g. a visible menu or button)

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add context-menu
```

```tsx
import {
  ContextMenu, ContextMenuContent, ContextMenuItem,
  ContextMenuSeparator, ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger className="border border-dashed p-8 text-center rounded-md">
    Right-click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>View Details</ContextMenuItem>
    <ContextMenuItem>Download</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem className="text-semantic-error">Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```
