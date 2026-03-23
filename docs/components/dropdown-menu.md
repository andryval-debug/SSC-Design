# Component — Dropdown Menu

**Source:** MCM - DS / Dropdown Menu canvas (node `89:189`)
**shadcn/ui:** `dropdown-menu`

---

## Description

A menu triggered by a button that presents a list of actions or options. Dismisses on selection or outside click.

---

## Item types

| Type | Description |
|---|---|
| **Item** | Standard action |
| **Checkbox Item** | Toggleable item with checkmark |
| **Radio Group** | Mutually exclusive items |
| **Sub-trigger** | Opens nested submenu |
| **Separator** | Visual divider between groups |
| **Label** | Non-interactive group header |

---

## Key styles

- Container: `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 6px`, `padding: 4px`
- Item: height 32px, `padding: 6px 8px`, hover `background: #F4F4F5`
- Destructive item: `color: #D32F2F`
- Icon + text gap: `8px`

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Dropdown Menu** canvas → Dev Mode
2. Select container → Inspect: border, border-radius, shadow, padding
3. Select item → Inspect: height, padding, hover background
4. Check destructive item color

---

## Accessibility

- **`role="menu"`** on container; **`role="menuitem"`** on items
- Trigger button: `aria-haspopup="menu"`, `aria-expanded`
- **Keyboard:** `ArrowDown/Up` navigate · `Enter`/`Space` activate · `Escape` closes · `ArrowRight/Left` for submenus
- Focus moves to first item on open; returns to trigger on close
- Disabled items: `aria-disabled="true"`

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add dropdown-menu
```

```tsx
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Account ▾</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Payment History</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-semantic-error">Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```
