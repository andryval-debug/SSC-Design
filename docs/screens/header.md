# Component — Header

**Source:** MCM - SSC / Header
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

The persistent top navigation bar present on all authenticated SSC screens. Contains the MCM logo, primary navigation links, user account menu, and a notification indicator. Collapses to a hamburger menu on mobile.

---

## Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Desktop | 1440px | Full horizontal nav with all links visible |
| Tablet Landscape | 1024px | Full horizontal nav, reduced spacing |
| Tablet Portrait | 768px | Logo + hamburger menu icon |
| Mobile | 375px | Logo + hamburger menu icon; nav slides in as Sheet |

---

## Components used

| Component | Purpose |
|---|---|
| `NavigationMenu` | Desktop horizontal nav links |
| `Avatar` | User initials/profile picture |
| `DropdownMenu` | User account menu (Profile, Settings, Log Out) |
| `Sheet` | Mobile slide-in navigation |
| `Button` (Ghost) | Hamburger toggle button |
| `Badge` | Notification count indicator |
| `Separator` | Between nav sections in mobile menu |

---

## Key styles

- Header background: `#133B62` (`--mcm-blue`)
- Header height: `64px` (desktop / tablet) · `56px` (mobile)
- Logo: `height: 32px`, white variant
- Nav links: Mulish 400 14px, `color: rgba(255,255,255,0.85)`, hover: `color: #FFFFFF`
- Active nav link: `color: #FFFFFF`, `border-bottom: 2px solid #7AC043` (`--mcm-green-light`)
- User avatar: `background: #0069AA`, white initials, `width: 36px, height: 36px`
- Notification badge: `background: #D32F2F`, `color: #FFFFFF`, `border-radius: 9999px`, `min-width: 18px`
- Mobile menu Sheet: `background: #133B62`, full-height left side, `width: 280px`

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Header** frame → Dev Mode
2. Select the header bar → inspect `height: 64px`, background color, padding (`0 40px`)
3. Select a nav link — active vs default state colors and border-bottom
4. Select the Avatar — inspect size, background color, font
5. Check mobile frame → hamburger button size (44×44px touch target), Sheet width

---

## Navigation items

| Label | Route |
|---|---|
| Account Summary | `/account` |
| Make a Payment | `/payment` |
| My Offers | `/offers` |
| Documents | `/documents` |

---

## Accessibility

- `<header>` element wraps the entire bar
- `<nav aria-label="Main navigation">` wraps the nav links
- Logo `<img>` has `alt="MCM"` (or `<span className="sr-only">MCM</span>` if SVG)
- Active link: `aria-current="page"` in addition to visual treatment
- User menu button: `aria-label="Account menu for [user name]"`, `aria-expanded`, `aria-haspopup="menu"`
- Mobile hamburger button: `aria-label="Open navigation menu"` / `"Close navigation menu"` (toggled)
- Mobile Sheet nav: `role="dialog"`, `aria-label="Navigation menu"`, focus trap when open
- Notification badge: `aria-label="3 unread notifications"` on the button that opens them (not just the badge number)
- **Skip link:** a hidden "Skip to main content" link should appear before the header and become visible on focus
- Keyboard: all nav items reachable via Tab; Escape closes the user menu / mobile sheet

---

## React

```tsx
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Account Summary", href: "/account" },
  { label: "Make a Payment", href: "/payment" },
  { label: "My Offers", href: "/offers" },
  { label: "Documents", href: "/documents" },
]

interface HeaderProps {
  user: { name: string; initials: string }
  notificationCount?: number
  onLogOut: () => void
}

export function Header({ user, notificationCount = 0, onLogOut }: HeaderProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-mcm-blue focus:rounded"
      >
        Skip to main content
      </a>

      <header className="h-16 bg-mcm-blue px-10 flex items-center justify-between sticky top-0 z-40">
        {/* Logo */}
        <Link href="/account" aria-label="MCM — Go to Account Summary">
          <img src="/mcm-logo-white.svg" alt="MCM" className="h-8" />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navItems.map(item => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    className={`px-4 py-2 text-sm text-white/85 hover:text-white rounded-sm transition-colors ${
                      pathname === item.href ? "text-white border-b-2 border-mcm-green-light" : ""
                    }`}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right: User menu + mobile trigger */}
        <div className="flex items-center gap-3">
          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative p-0 h-auto hover:bg-transparent"
                aria-label={`Account menu for ${user.name}`}
              >
                <Avatar className="w-9 h-9 bg-mcm-blue-light">
                  <AvatarFallback className="text-white text-sm font-medium">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                {notificationCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-[#D32F2F] text-white text-[10px] rounded-full flex items-center justify-center border-0"
                    aria-label={`${notificationCount} unread notifications`}
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5 text-sm font-medium">{user.name}</div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogOut} className="text-[#D32F2F]">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:bg-white/10"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-mcm-blue border-0 text-white w-72"
              aria-label="Navigation menu"
            >
              <nav aria-label="Mobile navigation" className="mt-8 flex flex-col gap-1">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`px-4 py-3 text-sm rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-white/10 text-white font-medium"
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  )
}
```
