# Screen — Skeleton (Loading State)

**Source:** MCM - SSC / Skeleton screen
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

The loading state template shown while the SSC application fetches initial data (account info, offers, session). Uses the `Skeleton` component to render placeholder shapes that mirror the layout of the content that will appear. Prevents layout shift (CLS) and communicates progress to users.

---

## Breakpoints

Skeleton screen mirrors the layout of the target screen at each breakpoint. The skeletons are proportional placeholders:

| Breakpoint | Target layout |
|---|---|
| Desktop 1440px | 2-column (sidebar + main content) |
| Tablet Landscape 1024px | 2-column, reduced |
| Tablet Portrait 768px | Single column |
| Mobile 375px | Single column, stacked |

---

## Components used

| Component | Purpose |
|---|---|
| `Skeleton` | All placeholder elements |

---

## Key styles

- Skeleton base: `background: #F4F4F5`, shimmer animation `background: linear-gradient(90deg, #F4F4F5 25%, #E4E4E7 50%, #F4F4F5 75%)`, `background-size: 200% 100%`, `animation: shimmer 1.5s infinite`
- Skeleton border-radius: matches the element it represents (e.g., `9999px` for circles, `8px` for cards)
- Spacing: identical to the real layout to prevent layout shift

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Skeleton** frame → Dev Mode
2. Each placeholder shape corresponds to a real element — identify them by position
3. Note which shapes are circular (avatars), rectangular (text lines, cards), or rounded-rect (buttons)
4. Check that skeleton column/row widths match the target Account Summary layout

---

## Skeleton map (Account Summary loading state)

| Skeleton element | Represents | Size |
|---|---|---|
| Circle 40×40 | User avatar | `w-10 h-10 rounded-full` |
| Rect 120×16 | User name text | `w-32 h-4 rounded` |
| Rect 320×128 | Balance card | `w-full h-32 rounded-lg` |
| Rect full-width × 24 (×5) | Payment history rows | `w-full h-6 rounded` |
| Rect 200×40 | Primary CTA button | `w-48 h-10 rounded-md` |

---

## Accessibility

- The skeleton container must have `aria-busy="true"` and `aria-label="Loading account information"` or similar
- Each individual `<Skeleton>` element must have `aria-hidden="true"` — screen readers should not read out individual placeholder shapes
- When loading completes: `aria-busy="false"` and `aria-live="polite"` announces the content is ready
- Do not use `role="progressbar"` on skeletons — that's for Progress bars with a known value
- Avoid infinite loading states without a timeout fallback — show an error after ~30 seconds

---

## React

```tsx
import { Skeleton } from "@/components/ui/skeleton"

// Generic account summary skeleton
export function AccountSummarySkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading account information"
      className="min-h-screen bg-mcm-gray-bg p-4 md:p-8"
    >
      <div className="max-w-[1200px] mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Skeleton aria-hidden="true" className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton aria-hidden="true" className="w-32 h-4 rounded" />
            <Skeleton aria-hidden="true" className="w-20 h-3 rounded" />
          </div>
        </div>

        {/* Grid: balance + history */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance card skeleton */}
          <Skeleton aria-hidden="true" className="h-48 rounded-lg lg:col-span-1" />

          {/* History table skeleton */}
          <div className="lg:col-span-2 bg-white rounded-lg p-6 space-y-4">
            <Skeleton aria-hidden="true" className="w-40 h-5 rounded" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton aria-hidden="true" className="w-24 h-4 rounded" />
                <Skeleton aria-hidden="true" className="w-16 h-4 rounded" />
                <Skeleton aria-hidden="true" className="w-20 h-4 rounded" />
                <Skeleton aria-hidden="true" className="w-16 h-6 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3">
          <Skeleton aria-hidden="true" className="w-44 h-10 rounded-md" />
          <Skeleton aria-hidden="true" className="w-32 h-10 rounded-md" />
        </div>
      </div>
    </div>
  )
}

// Generic offers grid skeleton
export function OffersSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading offers"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-[#E4E4E7] overflow-hidden">
          <Skeleton aria-hidden="true" className="w-full aspect-[3/2]" />
          <div className="p-5 space-y-3">
            <Skeleton aria-hidden="true" className="w-3/4 h-5 rounded" />
            <Skeleton aria-hidden="true" className="w-full h-4 rounded" />
            <Skeleton aria-hidden="true" className="w-2/3 h-4 rounded" />
            <Skeleton aria-hidden="true" className="w-full h-10 rounded-md mt-4" />
          </div>
        </div>
      ))}
    </div>
  )
}
```
