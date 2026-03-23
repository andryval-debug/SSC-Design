# Screen — Marketing Offers

**Source:** MCM - SSC / Marketing Offers screen
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

A promotional screen displaying general marketing offers (e.g., hardship programs, payment plans, balance reduction promotions) that are available to the user but not yet personalized. Used to introduce offer categories before personalization is complete, or as a fallback when custom offers are not available.

---

## Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | 1440px | Hero banner + 3-column offer cards below |
| Tablet Landscape | 1024px | Hero banner + 2-column grid |
| Tablet Portrait | 768px | Stacked hero + 2-column grid |
| Mobile | 375px | Stacked hero + single column cards |

---

## Components used

| Component | Purpose |
|---|---|
| `Card` | Offer category cards |
| `Carousel` | Hero banner rotating offers |
| `Badge` | Offer tags ("Limited Time", "New") |
| `Button` (Default) | "Get Started" / "Learn More" CTAs |
| `AspectRatio` | Offer card images (16:9 or 3:2) |
| `Skeleton` | Loading state |

---

## Key styles

- Page background: `#FFFFFF`
- Hero banner: full-width, `background: #133B62`, `color: #FFFFFF`, `padding: 64px 80px` (desktop)
- Hero headline: Mulish 400 40px white (Branding/Heading 3 scale)
- Hero sub-copy: Mulish 400 16px `rgba(255,255,255,0.85)`
- Offer cards: standard card style — `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 8px`
- Card image: `AspectRatio ratio={3/2}`, `object-fit: cover`, `border-radius: 8px 8px 0 0`
- "Limited Time" badge: `background: #F57C00` (`--color-warning`), white text
- "New" badge: `background: #0069AA` (`--mcm-blue-light`), white text

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Marketing Offers** → Dev Mode
2. Select the hero banner → inspect background color, padding, text styles
3. Select a carousel slide indicator dot — note active vs inactive colors
4. Select an offer card → inspect image area, text padding, CTA alignment
5. Check mobile frame: hero height, card stacking

---

## Accessibility

- `<main>` with `aria-label="Marketing offers"`
- Hero Carousel: `role="region"` with `aria-label="Featured offers"`, `aria-live="off"`
  - Provide pause button if auto-playing (WCAG 2.2.2)
  - Each slide has a meaningful `<h2>` heading
- Offer card grid: semantic `<article>` elements with descriptive `aria-label`
- Offer images: meaningful `alt` text describing the offer, not "offer image"
- "Limited Time" / "New" badges: text is visible — not icon-only
- CTA buttons have unique accessible names per card: `aria-label="Get started with the Balance Reduction Program"`
- No carousel auto-play without a pause control
- All card images are decorative if the card title already conveys the information — use `alt=""`

---

## React

```tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const heroSlides = [
  {
    headline: "Resolve your account today",
    subCopy: "Flexible settlement options designed around you.",
    cta: "See your options",
    image: "/hero-settle.jpg",
  },
  // ...
]

const marketingOffers = [
  {
    id: "hardship",
    title: "Hardship Program",
    description: "Reduced payments for qualifying financial situations.",
    image: "/offer-hardship.jpg",
    badge: { label: "New", color: "bg-mcm-blue-light" },
    cta: "Learn More",
  },
  // ...
]

export function MarketingOffersScreen() {
  return (
    <main aria-label="Marketing offers" className="min-h-screen bg-white">

      {/* Hero Carousel */}
      <section aria-label="Featured offers" className="bg-mcm-blue text-white">
        <Carousel className="w-full" aria-label="Featured offers">
          <CarouselContent>
            {heroSlides.map((slide, i) => (
              <CarouselItem key={i}>
                <div className="px-20 py-16 max-w-[1200px] mx-auto">
                  <h1 className="text-4xl font-normal mb-4">{slide.headline}</h1>
                  <p className="text-base text-white/85 mb-8">{slide.subCopy}</p>
                  <Button className="bg-mcm-blue-light hover:bg-mcm-blue-light/90">
                    {slide.cta}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious aria-label="Previous featured offer" className="left-4" />
          <CarouselNext aria-label="Next featured offer" className="right-4" />
        </Carousel>
      </section>

      {/* Offer Cards */}
      <section aria-labelledby="offers-heading" className="max-w-[1200px] mx-auto px-4 py-12">
        <h2 id="offers-heading" className="text-2xl font-medium mb-8">
          Available Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketingOffers.map(offer => (
            <article
              key={offer.id}
              aria-label={offer.title}
              className="rounded-lg border border-[#E4E4E7] bg-white overflow-hidden flex flex-col"
            >
              <AspectRatio ratio={3 / 2}>
                <img src={offer.image} alt="" className="object-cover w-full h-full" />
              </AspectRatio>
              <CardContent className="p-5 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-base">{offer.title}</h3>
                  {offer.badge && (
                    <Badge className={`${offer.badge.color} text-white text-xs`}>
                      {offer.badge.label}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-mcm-gray">{offer.description}</p>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button
                  className="w-full bg-mcm-blue hover:bg-mcm-blue/90"
                  aria-label={`${offer.cta}: ${offer.title}`}
                >
                  {offer.cta}
                </Button>
              </CardFooter>
            </article>
          ))}
        </div>
      </section>

    </main>
  )
}
```
