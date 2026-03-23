# Component — Skeleton

**Source:** MCM - DS / Skeleton canvas
**shadcn/ui:** `skeleton`

---

## Description

A placeholder loading state that mimics the shape of content while it loads. Improves perceived performance by showing the layout before data arrives.

---

## Key styles

| Property | Value |
|---|---|
| Background | `#F4F4F5` |
| Animation | Shimmer pulse (`opacity: 0.5 → 1`, 1.5s loop) |
| Border-radius | Matches the element it represents |

---

## Usage patterns

| Content | Skeleton |
|---|---|
| Single line text | `h-4 rounded w-48` |
| Paragraph (3 lines) | Stack of 3 rows, last row shorter |
| Avatar | `h-10 w-10 rounded-full` |
| Card | Full card-shaped block |
| Table row | Row of cells matching column widths |

---

## Accessibility

- **`aria-busy="true"`** on the container while loading
- **`aria-label="Loading..."`** or use `role="status"` with screen-reader-only text
- **`aria-hidden="true"`** on each skeleton element (they are visual-only)
- Once loaded, remove skeleton and replace with real content; announce completion via `aria-live="polite"`

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add skeleton
```

```tsx
import { Skeleton } from "@/components/ui/skeleton"

// Card skeleton
<div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading account summary">
  <Skeleton className="h-4 w-32" aria-hidden="true" />
  <Skeleton className="h-8 w-48" aria-hidden="true" />
  <Skeleton className="h-4 w-full" aria-hidden="true" />
  <Skeleton className="h-4 w-3/4" aria-hidden="true" />
</div>

// Table skeleton
{[...Array(5)].map((_, i) => (
  <div key={i} className="flex gap-4 py-3 border-b border-[#E4E4E7]">
    <Skeleton className="h-4 w-24" aria-hidden="true" />
    <Skeleton className="h-4 w-32" aria-hidden="true" />
    <Skeleton className="h-4 w-20" aria-hidden="true" />
  </div>
))}

// Conditional rendering
{isLoading ? (
  <Skeleton className="h-10 w-full" aria-hidden="true" />
) : (
  <p>{accountBalance}</p>
)}
```
