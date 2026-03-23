# Screen — DX API: Account Info

**Source:** MCM - SSC / DX API Account Info
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

A developer/internal-facing screen (or data-layer documentation view) that displays the raw account information returned by the DX API endpoint. Used by developers and QA to inspect the account data model that drives the SSC screens. May also appear as a debug panel in staging environments.

---

## API endpoint reference

```
GET /api/dx/account/{accountId}
Authorization: Bearer {token}
```

---

## Response schema

```ts
interface DXAccountInfo {
  accountId: string               // e.g. "MCM-12345678"
  accountHolder: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      state: string
      zip: string
    }
  }
  account: {
    originalCreditor: string      // original lender name
    originalBalance: number       // in dollars
    currentBalance: number        // remaining amount owed
    chargeOffDate: string         // ISO 8601 date
    status: "Active" | "Past Due" | "Settled" | "Closed" | "Disputed"
    lastPaymentDate: string | null
    lastPaymentAmount: number | null
    daysPastDue: number
  }
  eligibility: {
    isEligibleForOffer: boolean
    ineligibilityReason?: string
    offersAvailable: number
  }
  session: {
    isAuthenticated: boolean
    expiresAt: string             // ISO 8601 datetime
  }
}
```

---

## Key styles (debug panel)

- Background: `#F4F4F5`
- Panel: `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 8px`, `padding: 24px`
- Field labels: Mulish 500 12px `#71717A` uppercase
- Field values: Mulish 400 14px `#18181B`
- Error fields: `color: #D32F2F`
- JSON viewer (if showing raw): `font-family: monospace`, `font-size: 12px`, `background: #F4F4F5`

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **DX API Account Info** frame → Dev Mode
2. Identify the data field layout — labels above values, or key-value rows
3. Check for status color coding (e.g., "Past Due" in red)
4. Note spacing between field groups (typically `gap: 16px` between sections)

---

## Accessibility

- If rendered as a visible screen/panel: `<section aria-labelledby="account-info-heading">`
- `<dl>` (description list) is the appropriate HTML structure for key-value pairs
  - `<dt>` for field label, `<dd>` for field value
- Status values: use color + text label — not color alone
- Monetary values: `aria-label="Current balance: $1,250.00"` — formatted for screen readers
- Date fields: formatted as human-readable text (`March 18, 2026`) not ISO strings in visible UI
- If this is a developer-only debug view: consider `aria-hidden="true"` on the entire panel in production builds

---

## React

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const statusVariant: Record<string, string> = {
  Active: "bg-[#388E3C] text-white",
  "Past Due": "bg-[#D32F2F] text-white",
  Settled: "bg-[#0069AA] text-white",
  Closed: "bg-[#71717A] text-white",
  Disputed: "bg-[#F57C00] text-white",
}

export function DXAccountInfoPanel({ data }: { data: DXAccountInfo }) {
  return (
    <Card className="max-w-[720px]">
      <CardHeader>
        <CardTitle id="account-info-heading">Account Information</CardTitle>
        <p className="text-sm text-mcm-gray">Account ID: {data.accountId}</p>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Account Holder */}
        <section aria-labelledby="holder-heading">
          <h3 id="holder-heading" className="text-xs font-medium uppercase text-[#71717A] mb-3">
            Account Holder
          </h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-xs text-[#71717A]">Name</dt>
              <dd>{data.accountHolder.firstName} {data.accountHolder.lastName}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#71717A]">Email</dt>
              <dd>{data.accountHolder.email}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#71717A]">Phone</dt>
              <dd>{data.accountHolder.phone}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#71717A]">Address</dt>
              <dd>{data.accountHolder.address.street}, {data.accountHolder.address.city}, {data.accountHolder.address.state} {data.accountHolder.address.zip}</dd>
            </div>
          </dl>
        </section>

        <Separator />

        {/* Account Details */}
        <section aria-labelledby="account-details-heading">
          <h3 id="account-details-heading" className="text-xs font-medium uppercase text-[#71717A] mb-3">
            Account Details
          </h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-xs text-[#71717A]">Status</dt>
              <dd>
                <Badge className={statusVariant[data.account.status] ?? "bg-gray-400 text-white"}>
                  {data.account.status}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#71717A]">Original Creditor</dt>
              <dd>{data.account.originalCreditor}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#71717A]">Original Balance</dt>
              <dd
                className="tabular-nums"
                aria-label={`Original balance: $${data.account.originalBalance.toLocaleString()}`}
              >
                ${data.account.originalBalance.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#71717A]">Current Balance</dt>
              <dd
                className="tabular-nums font-medium text-mcm-blue"
                aria-label={`Current balance: $${data.account.currentBalance.toLocaleString()}`}
              >
                ${data.account.currentBalance.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-[#71717A]">Charge-Off Date</dt>
              <dd>{new Date(data.account.chargeOffDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</dd>
            </div>
            <div>
              <dt className="text-xs text-[#71717A]">Days Past Due</dt>
              <dd className={data.account.daysPastDue > 0 ? "text-[#D32F2F] font-medium" : ""}>
                {data.account.daysPastDue}
              </dd>
            </div>
          </dl>
        </section>

        <Separator />

        {/* Eligibility */}
        <section aria-labelledby="eligibility-heading">
          <h3 id="eligibility-heading" className="text-xs font-medium uppercase text-[#71717A] mb-3">
            Offer Eligibility
          </h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-xs text-[#71717A]">Eligible for Offer</dt>
              <dd>
                <Badge className={data.eligibility.isEligibleForOffer ? "bg-[#388E3C] text-white" : "bg-[#D32F2F] text-white"}>
                  {data.eligibility.isEligibleForOffer ? "Yes" : "No"}
                </Badge>
              </dd>
            </div>
            {data.eligibility.ineligibilityReason && (
              <div>
                <dt className="text-xs text-[#71717A]">Reason</dt>
                <dd className="text-[#D32F2F]">{data.eligibility.ineligibilityReason}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs text-[#71717A]">Offers Available</dt>
              <dd>{data.eligibility.offersAvailable}</dd>
            </div>
          </dl>
        </section>

      </CardContent>
    </Card>
  )
}
```
