# Screen — Custom Offers

**Source:** MCM - SSC / Custom Offers screen
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

Displays personalized settlement offer cards tailored to the user's account. Each card shows the offer type, settlement amount, payment terms, and a CTA to select or learn more. Multiple offers may be shown for the user to compare.

---

## Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | 1440px | 3-column card grid |
| Tablet Landscape | 1024px | 2-column card grid |
| Tablet Portrait | 768px | 2-column card grid, reduced padding |
| Mobile | 375px | Single column, full-width cards |

---

## Components used

| Component | Purpose |
|---|---|
| `Card` | Individual offer card container |
| `CardHeader` | Offer type label + badge |
| `CardContent` | Offer terms details |
| `CardFooter` | CTA button |
| `Badge` | "Best Value", "Recommended" label |
| `Button` (Default) | "Select This Offer" |
| `Button` (Outline) | "Learn More" |
| `Separator` | Between term rows |
| `Skeleton` | Loading state |
| `Tooltip` | Explain unfamiliar term names |

---

## Key styles

- Page background: `#EDEDF2`
- Offer card: `background: #FFFFFF`, `border-radius: 8px`, `border: 1px solid #E4E4E7`
- Recommended card: `border: 2px solid #133B62` (`--mcm-blue`), slight box-shadow
- "Recommended" badge: `background: #133B62`, white text
- "Best Value" badge: `background: #42820D` (`--mcm-green`), white text
- Settlement amount: Mulish 500 28px `#133B62`
- Term details: Mulish 400 14px `#555555`
- "Select This Offer" button: `background: #133B62`, full-width on card
- Savings highlight text: `color: #388E3C` (`--color-success`)

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Custom Offers** → Dev Mode
2. Select a standard offer card → inspect border, padding (16px or 24px), border-radius
3. Select the recommended offer card → note the highlighted border color and weight
4. Check badge colors for "Recommended" vs "Best Value"
5. Check the settlement amount text — size and weight
6. Inspect mobile frame for card width and bottom padding

---

## Data structure

```ts
interface CustomOffer {
  id: string
  type: "Lump Sum" | "Installment Plan" | "Hardship Program"
  settlementAmount: number
  originalBalance: number
  savingsAmount: number
  savingsPercent: number
  terms?: {
    months: number
    monthlyPayment: number
    firstPaymentDue: string
  }
  isRecommended?: boolean
  isBestValue?: boolean
  expiresAt: string
}
```

---

## Accessibility

- `<main>` with `aria-label="Custom settlement offers"`
- Each card is a `<article>` with `aria-label="[Offer type] offer — settle for $X"`
- Settlement amounts: `aria-label="Settlement amount: $1,500"` (formatted for screen readers)
- Savings text: "Save $750 (50%)" — never color-only green text; always include the amount
- "Recommended" / "Best Value" badges: `aria-label` on the Card or announced via heading
- "Select This Offer" button: unique accessible name per card — `aria-label="Select Lump Sum offer for $1,500"`
- Expiry: `aria-label="Offer expires March 31, 2026"` — don't just show "Expires in 5 days" without the date
- Tooltips on term names (e.g., "Lump Sum") must be keyboard accessible
- Card grid: no `<table>` needed — CSS grid with semantic cards is appropriate
- Ensure loading skeleton announces `aria-busy="true"` on the container

---

## React

```tsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function CustomOffersScreen({ offers, onSelectOffer }: { offers: CustomOffer[], onSelectOffer: (id: string) => void }) {
  return (
    <main aria-label="Custom settlement offers" className="min-h-screen bg-mcm-gray-bg p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl font-medium mb-6">Your Settlement Offers</h1>
        <p className="text-sm text-mcm-gray mb-8">
          These offers are tailored specifically for your account. Select one to proceed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <article
              key={offer.id}
              aria-label={`${offer.type} offer — settle for $${offer.settlementAmount.toLocaleString()}`}
              className={`rounded-lg border bg-white flex flex-col ${offer.isRecommended ? "border-2 border-mcm-blue shadow-md" : "border-[#E4E4E7]"}`}
            >
              <CardHeader className="p-6 pb-0">
                <div className="flex justify-between items-start">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h2 className="font-medium text-base cursor-help underline decoration-dotted">
                        {offer.type}
                      </h2>
                    </TooltipTrigger>
                    <TooltipContent>
                      {offer.type === "Lump Sum" && "Pay the full settlement amount in one payment."}
                      {offer.type === "Installment Plan" && "Pay in monthly installments over time."}
                      {offer.type === "Hardship Program" && "Reduced payments for qualifying financial hardship."}
                    </TooltipContent>
                  </Tooltip>
                  {offer.isRecommended && (
                    <Badge className="bg-mcm-blue text-white" aria-label="Recommended offer">
                      Recommended
                    </Badge>
                  )}
                  {offer.isBestValue && !offer.isRecommended && (
                    <Badge className="bg-mcm-green text-white" aria-label="Best value offer">
                      Best Value
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6 flex-1">
                <p
                  className="text-3xl font-medium text-mcm-blue tabular-nums mb-1"
                  aria-label={`Settlement amount: $${offer.settlementAmount.toLocaleString()}`}
                >
                  ${offer.settlementAmount.toLocaleString()}
                </p>
                <p className="text-sm text-mcm-green-light font-medium mb-4">
                  Save ${offer.savingsAmount.toLocaleString()} ({offer.savingsPercent}%)
                </p>

                <Separator className="my-3" />

                {offer.terms && (
                  <dl className="space-y-2 text-sm text-mcm-gray">
                    <div className="flex justify-between">
                      <dt>Monthly Payment</dt>
                      <dd className="tabular-nums">${offer.terms.monthlyPayment.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Duration</dt>
                      <dd>{offer.terms.months} months</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>First Payment</dt>
                      <dd>{offer.terms.firstPaymentDue}</dd>
                    </div>
                  </dl>
                )}

                <p
                  className="text-xs text-mcm-gray mt-3"
                  aria-label={`Offer expires ${offer.expiresAt}`}
                >
                  Expires {offer.expiresAt}
                </p>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex flex-col gap-2">
                <Button
                  className="w-full bg-mcm-blue hover:bg-mcm-blue/90"
                  aria-label={`Select ${offer.type} offer for $${offer.settlementAmount.toLocaleString()}`}
                  onClick={() => onSelectOffer(offer.id)}
                >
                  Select This Offer
                </Button>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardFooter>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
```
