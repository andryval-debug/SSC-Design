# Component — Sidebar

**Source:** MCM - DS / Sidebar canvas
**shadcn/ui:** `sidebar`

---

## Description

A persistent vertical navigation panel on the left (or right) side of the layout. Used for application-level navigation with sections, icons, and collapsible groups.

---

## Variants

| Property | Values |
|---|---|
| State | `expanded` · `collapsed` (icon-only) |
| Type | `sidebar` (pushes content) · `floating` (overlays content) · `inset` |

---

## Key styles

| Element | Value |
|---|---|
| Width (expanded) | 256px |
| Width (collapsed) | 48px (icon-only) |
| Background | `#133B62` (MCM Blue) or `#FFFFFF` |
| Active item | `background: #0069AA`, `color: #FFFFFF` |
| Hover item | `background: rgba(255,255,255,0.1)` (dark sidebar) |
| Nav item height | 40px |
| Nav item padding | `8px 12px` |
| Section header | Mulish 11px Bold uppercase (Scale 06 — Overline) |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Sidebar** canvas → Dev Mode
2. Select expanded state → Inspect: width, background, item styling
3. Select collapsed state → Inspect: icon-only width, tooltip trigger
4. Check section separators and group labels

---

## Accessibility

- **`<nav aria-label="Sidebar navigation">`** wraps the sidebar
- Active link: `aria-current="page"`
- Collapse toggle button: `aria-label="Collapse sidebar"` / `"Expand sidebar"` + `aria-expanded`
- Collapsed icon-only items need **`Tooltip`** with the item label visible on focus/hover
- Keyboard: `Tab` navigates all items · `Enter` activates links · collapsed items reachable by Tab → Tooltip appears on focus
- Section labels: `role="group"` with `aria-label` matching the visible label

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add sidebar
```

```tsx
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider,
} from "@/components/ui/sidebar"
import { Home, CreditCard, Settings, BarChart3 } from "lucide-react"

const navItems = [
  { title: "Account Summary",   href: "/account",  icon: Home },
  { title: "Payments",          href: "/payments", icon: CreditCard },
  { title: "Offers",            href: "/offers",   icon: BarChart3 },
  { title: "Settings",          href: "/settings", icon: Settings },
]

<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      <img src="/logo.svg" alt="MCM" className="h-8" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map(item => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <a href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</SidebarProvider>
```
