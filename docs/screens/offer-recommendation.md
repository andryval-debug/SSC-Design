# Screen — Offer Recommendation Page

**Source:** MCM - SSC / Offer Recommendation Page
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

A dedicated full-page view for a single highlighted offer recommendation. Shown when the DX API returns a single strongly recommended offer, or when a user navigates from the Custom Offers screen to review a specific offer in detail. Provides full terms, savings breakdown, comparison context, and the final "Select Offer" CTA that leads into the Disclosure → Terms and Conditions → Confirmation flow.

---

## Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | 1440px | 2-column: left = offer detail, right = sticky summary/CTA card |
| Tablet Landscape | 1024px | 2-column, narrower columns |
| Tablet Portrait | 768px | Single column, summary above CTA |
| Mobile | 375px | Single column, sticky footer CTA |

---

## Components used

| Component | Purpose |
|---|---|
| `Card` | Offer detail container and summary card |
| `Badge` | "Recommended" / "Best Value" / "Limited Time" tags |
| `Button` (Default) | "Select This Offer" primary CTA |
| `Button` (Ghost) | "View Other Offers" |
| `Separator` | Between offer sections |
| `Progress` | Savings visualization bar |
| `Accordion` | FAQ / "How does this work?" expandable section |
| `Alert` | Expiry warning if offer expires within 48 hours |
| `Dialog` | Confirmation before proceeding to Disclosure |
| `Tooltip` | Explain term labels |

---

## Key styles

- Page background: `#EDEDF2`
- Offer detail card: `background: #FFFFFF`, `border-radius: 8px`, `padding: 40px`
- Recommended badge: `background: #133B62`, white text
- Settlement amount: Mulish 500 48px `#133B62`
- "vs original" text: Mulish 400 16px strikethrough `#A1A1AA`
- Savings row: Mulish 500 18px `#388E3C` (`--color-success`)
- Savings progress bar: `fill: #42820D` (`--mcm-green`), `background: #E4E4E7`
- Expiry warning Alert: `background: #FFF8E1`, `border: 1px solid #FFB300` (`--color-caution`)
- "Select This Offer" button: `background: #133B62`, full-width in summary card
- Summary card (sticky): `position: sticky`, `top: 88px` (below header)

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Offer Recommendation Page** → Dev Mode
2. Select the settlement amount text — confirm Mulish 500 48px
3. Select the savings bar — inspect width calculation (savingsPercent), fill color
4. Select the sticky summary card — inspect `position: sticky`, `top` value, padding
5. Select the expiry Alert — check background, border, icon color
6. Check mobile frame: CTA button in sticky footer, full-width layout

---

## Offer acceptance flow

```
Offer Recommendation Page
  → "Select This Offer"
    → Confirmation Dialog ("Proceed to review terms?")
      → [Confirm] → Disclosure Screen
        → [Accept] → Terms and Conditions Modal
          → [Accept] → Payment / Confirmation Screen
      → [Cancel] → stays on Recommendation Page
```

---

## Accessibility

- `<main>` with `aria-label="[Offer type] offer recommendation"`
- `<h1>` is the offer display name (e.g., "Lump Sum Settlement")
- Settlement amount: `aria-label="Settlement amount: $1,500"` — formatted value
- Original balance: `aria-label="Original balance: $3,000"` with `aria-hidden` on the visual strikethrough
- Savings bar: `role="progressbar"`, `aria-valuenow={savingsPercent}`, `aria-label="You save 50%"`
- Expiry Alert: `role="alert"` so it is announced when rendered
- "Select This Offer" button: `aria-label="Select Lump Sum Settlement offer for $1,500"`
- Accordion FAQ section: each trigger has `aria-expanded`, `aria-controls`
- Sticky summary card: ensure it doesn't obscure content at smaller viewports
- Mobile sticky footer: `padding-bottom` on main content so last section isn't hidden behind footer
- Tooltips on term names: keyboard accessible via focus, not hover-only
- After selecting offer and entering flow: manage focus forward through each modal step

---

## React

```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Clock } from "lucide-react"

const faq = [
  {
    q: "What is a lump sum settlement?",
    a: "A lump sum settlement means you pay the full settlement amount in a single payment to resolve your account.",
  },
  {
    q: "How does this affect my credit?",
    a: "Settling a debt may be noted on your credit report as 'settled for less than full amount.' Please consult a financial advisor for personalized guidance.",
  },
  {
    q: "Is this offer guaranteed?",
    a: "This offer is valid until the expiry date shown. Once accepted and terms signed, the offer is binding.",
  },
]

export function OfferRecommendationScreen({
  offer,
  onSelectOffer,
  onViewOthers,
}: {
  offer: DXOffer
  onSelectOffer: (id: string) => void
  onViewOthers: () => void
}) {
  const [showConfirm, setShowConfirm] = React.useState(false)
  const expiresAt = new Date(offer.expiresAt)
  const hoursUntilExpiry = (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60)
  const isExpiringSoon = hoursUntilExpiry <= 48

  return (
    <main
      aria-label={`${offer.displayName} offer recommendation`}
      className="min-h-screen bg-mcm-gray-bg p-4 md:p-8 pb-24 lg:pb-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <Button variant="ghost" onClick={onViewOthers} className="mb-6 text-mcm-blue-light">
          ← View All Offers
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* Offer Detail */}
          <Card>
            <CardContent className="p-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-medium mb-2">{offer.displayName}</h1>
                  {offer.tags.includes("recommended") && (
                    <Badge className="bg-mcm-blue text-white">Recommended for you</Badge>
                  )}
                </div>
              </div>

              {isExpiringSoon && (
                <Alert className="bg-[#FFF8E1] border-[#FFB300] mb-6" role="alert">
                  <Clock className="h-4 w-4 text-[#F57C00]" aria-hidden="true" />
                  <AlertDescription className="text-[#F57C00]">
                    This offer expires in less than 48 hours — {expiresAt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </AlertDescription>
                </Alert>
              )}

              {/* Settlement Amount */}
              <div className="mb-8">
                <p className="text-sm text-mcm-gray mb-1">Settlement Amount</p>
                <div className="flex items-baseline gap-3">
                  <p
                    className="text-5xl font-medium text-mcm-blue tabular-nums"
                    aria-label={`Settlement amount: $${offer.settlementAmount.toLocaleString()}`}
                  >
                    ${offer.settlementAmount.toLocaleString()}
                  </p>
                  <p
                    className="text-xl line-through text-[#A1A1AA]"
                    aria-label={`Original balance: $${offer.originalBalance.toLocaleString()}`}
                  >
                    ${offer.originalBalance.toLocaleString()}
                  </p>
                </div>
                <p className="text-lg font-medium text-[#388E3C] mt-1">
                  You save ${offer.savingsAmount.toLocaleString()} ({offer.savingsPercent}%)
                </p>
                <div className="mt-3">
                  <Progress
                    value={offer.savingsPercent}
                    aria-label={`You save ${offer.savingsPercent}%`}
                    className="h-3 bg-[#E4E4E7] [&>div]:bg-mcm-green"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              {/* Installment terms */}
              {offer.installment && (
                <>
                  <h2 className="font-medium mb-4">Payment Terms</h2>
                  <dl className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                      <dt className="text-xs text-mcm-gray uppercase mb-1">Monthly Payment</dt>
                      <dd className="font-medium tabular-nums">${offer.installment.monthlyPayment.toFixed(2)}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-mcm-gray uppercase mb-1">Duration</dt>
                      <dd className="font-medium">{offer.installment.termMonths} months</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-mcm-gray uppercase mb-1">First Payment Due</dt>
                      <dd>{new Date(offer.installment.firstPaymentDue).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-mcm-gray uppercase mb-1">Total Payments</dt>
                      <dd>{offer.installment.totalPayments}</dd>
                    </div>
                  </dl>
                  <Separator className="my-6" />
                </>
              )}

              {/* FAQ */}
              <h2 className="font-medium mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible>
                {faq.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-mcm-gray">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Sticky Summary Card */}
          <div className="lg:sticky lg:top-[88px] h-fit">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-medium mb-4">Offer Summary</h2>
                <dl className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <dt className="text-mcm-gray">Settlement Amount</dt>
                    <dd className="font-medium tabular-nums text-mcm-blue">${offer.settlementAmount.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-mcm-gray">You Save</dt>
                    <dd className="font-medium tabular-nums text-[#388E3C]">${offer.savingsAmount.toLocaleString()} ({offer.savingsPercent}%)</dd>
                  </div>
                  {offer.installment && (
                    <div className="flex justify-between">
                      <dt className="text-mcm-gray">Monthly</dt>
                      <dd className="tabular-nums">${offer.installment.monthlyPayment.toFixed(2)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-mcm-gray">Offer Expires</dt>
                    <dd>{expiresAt.toLocaleDateString()}</dd>
                  </div>
                </dl>

                <Button
                  className="w-full bg-mcm-blue hover:bg-mcm-blue/90 hidden lg:flex"
                  aria-label={`Select ${offer.displayName} offer for $${offer.settlementAmount.toLocaleString()}`}
                  onClick={() => setShowConfirm(true)}
                >
                  Select This Offer
                </Button>
                <Button
                  variant="ghost"
                  className="w-full mt-2 hidden lg:flex"
                  onClick={onViewOthers}
                >
                  View Other Offers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E4E4E7] p-4 lg:hidden">
        <Button
          className="w-full bg-mcm-blue hover:bg-mcm-blue/90"
          aria-label={`Select ${offer.displayName} offer for $${offer.settlementAmount.toLocaleString()}`}
          onClick={() => setShowConfirm(true)}
        >
          Select This Offer
        </Button>
      </footer>

      {/* Confirmation dialog — leads to Disclosure */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Ready to proceed?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-mcm-gray py-4">
            You'll review the full disclosure and terms before your offer is finalized.
            No payment is taken at this step.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>Cancel</Button>
            <Button
              className="bg-mcm-blue hover:bg-mcm-blue/90"
              onClick={() => { setShowConfirm(false); onSelectOffer(offer.offerId) }}
            >
              Review Terms
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
```
