# Component — Pagination

**Source:** MCM - DS / Pagination canvas (node `65:516`)
**shadcn/ui:** `pagination`

---

## Description

Navigation for paginated content — shows page numbers with prev/next controls. Used in Data Table, search results, and listing pages.

---

## Anatomy

- **Previous:** `ChevronLeft` icon button
- **Page numbers:** Numbered buttons — current page visually distinct
- **Ellipsis:** `...` when many pages are present
- **Next:** `ChevronRight` icon button

**Key styles:**
- Button size: 32×32px, `border-radius: 6px`
- Current page: `background: #133B62`, `color: #FFFFFF`
- Hover: `background: #F4F4F5`
- Ellipsis: non-interactive, `color: #A1A1AA`

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Pagination** canvas → Dev Mode
2. Select current page button → Inspect: background `#133B62`, font, size
3. Select prev/next → Inspect: icon size, disabled state opacity

---

## Accessibility

- **`<nav aria-label="Pagination">`** wraps the component
- **`aria-current="page"`** on the current page button
- Prev/next: `aria-label="Go to previous page"` / `"Go to next page"`
- Disabled prev (page 1) / next (last page): `aria-disabled="true"` + `disabled`
- Page numbers: `aria-label="Page {n}"` on each button
- Ellipsis: `aria-hidden="true"`

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add pagination
```

```tsx
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href={currentPage > 1 ? `?page=${currentPage - 1}` : undefined}
        aria-disabled={currentPage === 1} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=1" isActive={currentPage === 1}>1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=2" isActive={currentPage === 2}>2</PaginationLink>
    </PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem>
      <PaginationLink href="?page=10">10</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href={`?page=${currentPage + 1}`} />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```
