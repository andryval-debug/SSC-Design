# Component — Avatar

**Source:** MCM - DS / Avatar canvas (node `23:988`)
**shadcn/ui:** `avatar`

---

## Description

An image element with a fallback for representing the user. Displays a profile photo, or initials/icon when no image is available.

---

## Variants

| Property | Values |
|---|---|
| Size | `sm` (32px) · `default` (40px) · `lg` (48px) · `xl` (64px) |
| State | Image · Fallback (initials) · Fallback (icon) |

---

## Anatomy

- **Container:** Circle (`border-radius: 9999px`), overflow hidden
- **Image:** Fills container, `object-fit: cover`
- **Fallback:** Shown when image fails to load — initials (2 chars) or generic user icon, background `#F4F4F5`, text `#18181B`

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Avatar** canvas → Dev Mode
2. Select avatar container → Inspect: size (width = height), border-radius, overflow
3. Toggle between Image and Fallback states to see the color change

---

## Accessibility

- **`<img>` with `alt`:** Profile image must have a meaningful `alt` attribute — e.g. `"Jane Smith's profile photo"`
- **Fallback initials:** Not read by screen readers — wrap in a `<span aria-hidden="true">` and provide `aria-label` on the container
- **Decorative avatars:** Use `alt=""` to hide from screen readers
- **Never rely on avatar alone** to identify a person — always pair with a visible name nearby

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add avatar
```

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// With image
<Avatar>
  <AvatarImage src="/avatars/jane.jpg" alt="Jane Smith's profile photo" />
  <AvatarFallback>JS</AvatarFallback>
</Avatar>

// Fallback only
<Avatar>
  <AvatarFallback>AV</AvatarFallback>
</Avatar>

// Size variants (add custom className)
<Avatar className="h-8 w-8">    {/* sm: 32px */}
<Avatar className="h-10 w-10">  {/* default: 40px */}
<Avatar className="h-12 w-12">  {/* lg: 48px */}
<Avatar className="h-16 w-16">  {/* xl: 64px */}
```
