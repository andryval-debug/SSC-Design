# Screen — DX API: Offers

**Source:** MCM - SSC / DX API Offers
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

The data layer documentation for the DX API offers endpoint that powers the Custom Offers and Marketing Offers screens. Defines the offer data contract between the backend API and the frontend SSC application.

---

## API endpoint reference

```
GET /api/dx/offers/{accountId}
Authorization: Bearer {token}
```

---

## Response schema

```ts
interface DXOffersResponse {
  accountId: string
  offersGeneratedAt: string           // ISO 8601 datetime
  expiresAt: string                   // ISO 8601 datetime — when the offer set expires
  offers: DXOffer[]
}

interface DXOffer {
  offerId: string                     // UUID
  offerType: "LumpSum" | "InstallmentPlan" | "HardshipProgram" | "BalanceReduction"
  displayName: string                 // e.g. "Lump Sum Settlement"
  settlementAmount: number            // in dollars
  originalBalance: number
  savingsAmount: number               // originalBalance - settlementAmount
  savingsPercent: number              // 0-100
  tags: Array<"recommended" | "best_value" | "limited_time" | "new">
  installment?: {
    monthlyPayment: number
    termMonths: number
    firstPaymentDue: string           // ISO 8601 date
    totalPayments: number
  }
  legalDisclosureId: string           // ref to disclosure content
  termsId: string                     // ref to T&C content
  expiresAt: string                   // ISO 8601 datetime
  isActive: boolean
}
```

---

## Frontend data mapping

| DX API field | UI element |
|---|---|
| `offerType` | Card heading / Tooltip label |
| `displayName` | Card `<h2>` title |
| `settlementAmount` | Large price display |
| `savingsAmount` / `savingsPercent` | Green "Save $X (Y%)" text |
| `tags["recommended"]` | "Recommended" badge (MCM Blue `#133B62`) |
| `tags["best_value"]` | "Best Value" badge (MCM Green `#42820D`) |
| `tags["limited_time"]` | "Limited Time" badge (Warning `#F57C00`) |
| `tags["new"]` | "New" badge (Blue Light `#0069AA`) |
| `installment.monthlyPayment` | Monthly Payment row in card |
| `installment.termMonths` | Duration row in card |
| `installment.firstPaymentDue` | First Payment row in card |
| `expiresAt` | "Expires [date]" text below card body |

---

## Error states

| HTTP status | UI behavior |
|---|---|
| `200` with empty `offers[]` | Show "No offers available" empty state, route to Marketing Offers or Contact |
| `403` | Account ineligible — show `IneligibleAccountModal` |
| `401` | Session expired — redirect to Login |
| `503` | API unavailable — show `ErrorScreen` type `"service-unavailable"` |

---

## Key styles (data view)

Same as the DX API Account Info panel:
- `<dl>` key-value pairs
- Mulish 500 12px uppercase labels in `#71717A`
- Mulish 400 14px values in `#18181B`

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **DX API Offers** frame → Dev Mode
2. Review the offer data display panel — note how each field maps to a labeled row
3. Check the offer card preview that accompanies the data — confirm that tag badges match the `tags` array values
4. Inspect error/empty state variants

---

## Accessibility

- Offer data panel uses `<dl>` / `<dt>` / `<dd>` structure
- Monetary values: formatted with locale and `aria-label` for screen readers
- Tags rendered as `<Badge>` components — always text labels, never icon-only
- Offer expiry: include absolute date, not just relative ("Expires March 31, 2026", not only "Expires in 5 days")
- When `offers` is empty: `<p role="status">No offers are currently available for your account.</p>`

---

## React — offer data fetch

```tsx
import { useEffect, useState } from "react"

interface UseOffersResult {
  offers: DXOffer[] | null
  isLoading: boolean
  error: "ineligible" | "session-expired" | "service-unavailable" | null
}

export function useOffers(accountId: string): UseOffersResult {
  const [offers, setOffers] = useState<DXOffer[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<UseOffersResult["error"]>(null)

  useEffect(() => {
    if (!accountId) return
    setIsLoading(true)
    fetch(`/api/dx/offers/${accountId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(async (res) => {
        if (res.status === 401) { setError("session-expired"); return }
        if (res.status === 403) { setError("ineligible"); return }
        if (!res.ok) { setError("service-unavailable"); return }
        const data: DXOffersResponse = await res.json()
        setOffers(data.offers)
      })
      .catch(() => setError("service-unavailable"))
      .finally(() => setIsLoading(false))
  }, [accountId])

  return { offers, isLoading, error }
}

// Usage in screen
export function OffersRoute({ accountId }: { accountId: string }) {
  const { offers, isLoading, error } = useOffers(accountId)

  if (isLoading) return <OffersSkeleton count={3} />
  if (error === "ineligible") return <IneligibleAccountModal open onClose={() => router.push("/account")} />
  if (error === "session-expired") { router.push("/login"); return null }
  if (error) return <ErrorScreen type="service-unavailable" onRetry={() => router.refresh()} />
  if (offers?.length === 0) return <MarketingOffersScreen />

  return <CustomOffersScreen offers={offers!} onSelectOffer={handleSelect} />
}
```
