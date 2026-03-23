# Component — Menubar

**Source:** MCM - DS / Menubar canvas (node `210:2486`)
**shadcn/ui:** `menubar`

---

## Description

A horizontal menu bar with dropdown menus — similar to the menu bar in desktop applications (File, Edit, View…). Used for complex navigation or toolbars.

---

## Key styles

- Container: `height: 36px`, `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 6px`, `padding: 4px`
- Trigger item: `padding: 4px 12px`, `border-radius: 4px`, hover/active: `background: #F4F4F5`
- Dropdown: same as Dropdown Menu styles
- Font: Mulish 14px Medium

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Menubar** canvas → Dev Mode
2. Select the bar container → Inspect: height, border, padding
3. Select a menu trigger → Inspect: padding, font, active state
4. Open dropdown → Inspect: same as Dropdown Menu

---

## Accessibility

- **`role="menubar"`** on the container
- **`role="menuitem"`** on each top-level trigger
- **`aria-haspopup="menu"`** + **`aria-expanded`** on triggers with dropdowns
- **Keyboard:** `Left`/`Right` arrows navigate between top-level items · `Down` opens dropdown · `Escape` closes · `Tab` exits the menubar entirely
- Each dropdown follows the same accessibility rules as Dropdown Menu

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add menubar
```

```tsx
import {
  Menubar, MenubarContent, MenubarItem, MenubarMenu,
  MenubarSeparator, MenubarShortcut, MenubarTrigger,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Account</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Summary</MenubarItem>
      <MenubarItem>Payment History</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Settings</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
  <MenubarMenu>
    <MenubarTrigger>Help</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Documentation</MenubarItem>
      <MenubarItem>Contact Support</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```
