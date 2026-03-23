# Component — Carousel

**Source:** MCM - DS / Carousel canvas (node `46:66`)
**shadcn/ui:** `carousel` (via `embla-carousel-react`)

---

## Description

A slideshow component for cycling through a set of items — images, cards, or content panels. Supports auto-play, navigation arrows, and dot indicators.

---

## Variants

| Property | Values |
|---|---|
| Orientation | `horizontal` · `vertical` |
| Navigation | Arrows · Dots · Both · None |

---

## Key styles

- Container: `overflow: hidden`
- Arrow buttons: 32×32px, `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 9999px`, shadow
- Dot indicators: 8px circles, active: `#133B62`, inactive: `#E4E4E7`
- Transition: `0.3s ease` slide

---

## Accessibility

- **`role="region"` with `aria-label="Offer carousel"`** on the outer container
- **`aria-live="off"`** on the slide container — prevent constant announcements during auto-play; announce only on manual navigation
- Prev/next buttons: `aria-label="Previous slide"` / `"Next slide"`
- Dot indicators: `aria-label="Slide {n} of {total}"`, active dot: `aria-current="true"`
- If auto-playing: **provide a pause button** — required for users who need more time to read (WCAG 2.2.2)
- Each slide should have a meaningful heading for screen readers

---

## React

```bash
npm install embla-carousel-react
npx shadcn-ui@latest add carousel
```

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

<Carousel className="w-full max-w-lg" aria-label="Special offers">
  <CarouselContent>
    {offers.map((offer, i) => (
      <CarouselItem key={i}>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold">{offer.title}</h3>
            <p className="text-sm text-mcm-gray">{offer.description}</p>
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious aria-label="Previous offer" />
  <CarouselNext aria-label="Next offer" />
</Carousel>
```
