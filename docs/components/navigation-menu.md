# Component — Navigation Menu

**Source:** MCM - DS / Navigation Menu canvas (node `209:1883`)
**shadcn/ui:** `navigation-menu`

---

## Description

A horizontal navigation component with optional mega-menu dropdowns. Used in the primary page header for top-level navigation.

---

## Anatomy

- **Trigger:** Nav item with optional dropdown indicator chevron
- **Content panel:** Wide dropdown panel with grouped links, descriptions, icons — max-width varies
- **Indicator:** Animated underline or dot on active item
- **Viewport:** The popover viewport that contains all open panels

**Key styles (from MCM SSC Header):**
- Item font: Mulish 500, 16px (Scale 08 — Main Menu Item)
- Active/hover: `color: #0069AA` (MCM Blue Light)
- Panel: `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 8px`, `padding: 24px`

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Navigation Menu** canvas → Dev Mode
2. Open **MCM - SSC** → **Header** canvas for real-world application
3. Select nav items → Inspect: font (Scale 08), color, spacing
4. Check dropdown panel width and internal layout grid

---

## Accessibility

- **`<nav aria-label="Main navigation">`** wraps the component
- **`role="navigation"`** (redundant with `<nav>` but added for explicit clarity)
- Triggers with dropdowns: `aria-haspopup="true"`, `aria-expanded`
- Active page link: `aria-current="page"`
- **Keyboard:** `Tab` moves between top-level items · `Enter`/`Space` opens panel · `Escape` closes · `Arrow keys` navigate within open panel
- Skip navigation link: Add `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>` before the nav

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add navigation-menu
```

```tsx
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Account</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 w-[400px]">
          <li>
            <NavigationMenuLink href="/account/summary">
              <p className="font-medium">Account Summary</p>
              <p className="text-sm text-mcm-gray">View your balance and recent activity.</p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/account/payment">
              <p className="font-medium">Make a Payment</p>
              <p className="text-sm text-mcm-gray">One-time or scheduled payments.</p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/help" aria-current="page">Help</NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```
