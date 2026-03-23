# Component — Hover Card

**Source:** MCM - DS / Hover Card canvas (node `216:2886`)
**shadcn/ui:** `hover-card`

---

## Description

A card that appears when hovering over a trigger element. Used for previewing content (user profiles, link previews) without navigating away. Not suitable as the only interaction method — mouse-only.

---

## Key styles

- Container: `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 8px`, `padding: 16px`
- Width: 320px
- Shadow: `0 4px 12px rgba(0,0,0,0.08)`
- Open delay: `~700ms` (prevents accidental triggers)
- Close delay: `~300ms`

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Hover Card** canvas → Dev Mode
2. Select card container → Inspect: width, padding, border, shadow
3. Check arrow/caret indicator pointing to trigger

---

## Accessibility

- **Not keyboard accessible by default** — must be supplemented with an alternative interaction (tooltip, link, or button) for keyboard and touch users
- The hover trigger should be a focusable element so keyboard users can reach it
- On focus (not just hover), the card should also appear
- Card content should be reachable by screen readers via `aria-describedby` or as a separate accessible description

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add hover-card
```

```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/profile/andrea" className="text-mcm-blue-light underline">
      @andrea_valerio
    </a>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src="/avatars/andrea.jpg" alt="Andrea Valerio" />
        <AvatarFallback>AV</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold">Andrea Valerio</h4>
        <p className="text-sm text-mcm-gray">Product Designer — AI</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```
