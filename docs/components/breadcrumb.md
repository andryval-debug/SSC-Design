# Component — Breadcrumb

**Source:** MCM - DS / Breadcrumb canvas (node `23:1004`)
**shadcn/ui:** `breadcrumb`

---

## Description

A navigation aid showing the user's current location within a hierarchy. Helps users understand where they are and navigate back to parent pages.

---

## Anatomy

- **Item:** Link text + separator (`/` or `>` chevron)
- **Current page:** Last item — not a link, visually distinct (slightly muted)
- **Separator:** `ChevronRightIcon` (16px) or `/` character, `color: #A1A1AA`
- **Font:** Mulish, 14px, Regular 400

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Breadcrumb** canvas → Dev Mode
2. Select individual breadcrumb items — Inspect: font, color, gap
3. The current page item has different color from linked items
4. Check separator icon size and color

---

## Accessibility

- **`<nav aria-label="Breadcrumb">`** wraps the entire component
- **`<ol>`** (ordered list) — breadcrumbs have a logical sequence
- **`aria-current="page"`** on the last (current) item
- Linked items are `<a>` elements — fully keyboard navigable
- The current page item is `<span>` (not a link — you're already there)
- Separators use `aria-hidden="true"` — decorative only

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add breadcrumb
```

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/account">Account</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>One-Time Payment</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```
