# Screen — Account Summary

**Source:** MCM - SSC / Account Summary screen
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

The primary authenticated dashboard. Displays the user's account balance, payment history, current offers available, and quick action buttons (Make a Payment, View Offers). The user lands here after successful login.

---

## Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | 1440px | 2-column: left sidebar (account info) + right content (offers, history) |
| Tablet Landscape | 1024px | 2-column, compressed sidebar |
| Tablet Portrait | 768px | Single column, stacked sections |
| Mobile | 375px | Single column, bottom nav bar |

---

## Components used

| Component | Purpose |
|---|---|
| `Card` | Account balance card, offer cards |
| `Button` (Default) | "Make a Payment" primary CTA |
| `Button` (Outline) | "View Offers" secondary CTA |
| `Badge` | Account status indicator (e.g., "Active", "Past Due") |
| `Separator` | Between sections |
| `Table` | Payment history list |
| `Skeleton` | Loading state while data fetches |
| `Progress` | Balance paid progress indicator |
| `Avatar` | User initials in header |
| `Sidebar` (MCM pattern) | Desktop navigation |

---

## Key styles

- Page background: `#EDEDF2` (`--mcm-gray-bg`)
- Account balance card: `background: #133B62` (`--mcm-blue`), `color: #FFFFFF`, `border-radius: 8px`
- Balance amount: Mulish 500 32px white
- Balance label: Mulish 400 14px `rgba(255,255,255,0.75)`
- Section headings: Mulish 500 18px `#18181B`
- Payment history rows: alternating `#FFFFFF` / `#F4F4F5`
- "Make a Payment" button: `background: #0069AA` (`--mcm-blue-light`)
- Status badge "Past Due": `background: #D32F2F`, white text
- Status badge "Active": `background: #388E3C`, white text

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Account Summary** → Dev Mode
2. Select the balance card → inspect background color, padding (24px), border-radius (8px)
3. Select the Balance amount text → confirm Mulish 500 32px
4. Select the progress bar component → note `fill: #5E9732` (`--mcm-green-progress`)
5. Switch to mobile frame → verify bottom nav and single-column stacking

---

## Data structure

```ts
interface AccountSummary {
  accountId: string
  accountHolder: string
  currentBalance: number
  originalBalance: number
  status: "Active" | "Past Due" | "Settled" | "Closed"
  lastPaymentDate: string
  lastPaymentAmount: number
  availableOffers: number
  paymentHistory: Array<{
    date: string
    amount: number
    type: "Payment" | "Fee" | "Interest"
    status: "Cleared" | "Pending" | "Failed"
  }>
}
```

---

## Accessibility

- `<main>` with `aria-label="Account summary"` for the main content region
- `<nav>` for the sidebar navigation with `aria-label="Main navigation"`
- Account balance card: `<section aria-labelledby="balance-heading">`
- Balance amount: `aria-label="Current balance: $1,250.00"` (not just the raw number)
- Payment history `<table>` has `<caption>` "Recent payment history"
- All monetary amounts use `tabular-nums` class and are formatted with locale
- Status badge color is not the only indicator — text label always present
- Progress bar: `role="progressbar"`, `aria-valuenow`, `aria-label="Balance paid: 45%"`
- Loading state: `aria-busy="true"` on the section, skeleton elements are `aria-hidden="true"`
- "Make a Payment" and "View Offers" buttons have descriptive labels, not just icons

---

## React

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AccountSummaryScreen({ account, isLoading }: { account: AccountSummary, isLoading: boolean }) {
  const paidPercent = Math.round(
    ((account.originalBalance - account.currentBalance) / account.originalBalance) * 100
  )

  if (isLoading) return <AccountSummarySkeleton />

  return (
    <main aria-label="Account summary" className="min-h-screen bg-mcm-gray-bg p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Balance Card */}
        <section aria-labelledby="balance-heading" className="lg:col-span-1">
          <Card className="bg-mcm-blue text-white border-0">
            <CardContent className="p-6">
              <p className="text-sm text-white/75 mb-1">Current Balance</p>
              <p
                id="balance-heading"
                className="text-4xl font-medium tabular-nums"
                aria-label={`Current balance: $${account.currentBalance.toLocaleString()}`}
              >
                ${account.currentBalance.toLocaleString()}
              </p>
              <div className="mt-4">
                <Progress
                  value={paidPercent}
                  aria-label={`Balance paid: ${paidPercent}%`}
                  className="h-2 bg-white/20 [&>div]:bg-mcm-green-progress"
                />
                <p className="text-xs text-white/75 mt-1">{paidPercent}% paid</p>
              </div>
              <div className="flex gap-3 mt-6">
                <Button size="sm" className="bg-mcm-blue-light hover:bg-mcm-blue-light/90">
                  Make a Payment
                </Button>
                <Button size="sm" variant="outline" className="text-white border-white/50 hover:bg-white/10">
                  View Offers
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Payment History */}
        <section aria-labelledby="history-heading" className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle id="history-heading">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <caption className="sr-only">Recent payment history</caption>
                <TableHeader>
                  <TableRow>
                    <TableHead scope="col">Date</TableHead>
                    <TableHead scope="col">Type</TableHead>
                    <TableHead scope="col" className="text-right">Amount</TableHead>
                    <TableHead scope="col">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {account.paymentHistory.map((p, i) => (
                    <TableRow key={i}>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>{p.type}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        ${p.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={p.status === "Failed" ? "destructive" : "secondary"}>
                          {p.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

      </div>
    </main>
  )
}

function AccountSummarySkeleton() {
  return (
    <main aria-label="Account summary" aria-busy="true" className="min-h-screen bg-mcm-gray-bg p-4 md:p-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton aria-hidden="true" className="h-48 rounded-lg lg:col-span-1" />
        <Skeleton aria-hidden="true" className="h-64 rounded-lg lg:col-span-2" />
      </div>
    </main>
  )
}
```
