# Screen — One-Time Payment

**Source:** MCM - SSC / One-Time Payment screen
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

The payment entry screen where a user makes a single payment toward their account balance. Contains a payment amount field, payment method selection, confirmation summary, and a submit CTA. Supports 4 responsive breakpoints.

---

## Breakpoints

| Breakpoint | Width | Layout notes |
|---|---|---|
| Desktop | 1440px | 2-column: left form, right order summary card |
| Tablet Landscape | 1024px | 2-column, compressed — summary stacks below on narrow viewports |
| Tablet Portrait | 768px | Single column, summary below form |
| Mobile | 375px | Single column, summary collapsed/expandable, sticky submit footer |

---

## Components used

| Component | Purpose |
|---|---|
| `Form` | react-hook-form + zod validation |
| `Input` | Payment amount field |
| `Label` | Field labels |
| `Select` | Payment method selection |
| `RadioGroup` | Payment date: "Today" vs "Choose a date" |
| `Calendar` / `DatePicker` | Date picker when "Choose a date" is selected |
| `Card` | Order summary panel |
| `Separator` | Between summary rows |
| `Button` (Default) | "Submit Payment" |
| `Button` (Ghost) | "Cancel" |
| `Alert` (Destructive) | Payment error feedback |
| `Dialog` | Payment confirmation dialog before submit |

---

## Key styles

- Page background: `#EDEDF2`
- Form card: `background: #FFFFFF`, `border-radius: 8px`, `padding: 32px`
- Summary card: `background: #FFFFFF`, `border-radius: 8px`, `padding: 24px`
- Amount input: Mulish 500 24px, centered, `border-radius: 6px`
- Amount prefix "$": `color: #555555`, Mulish 400 24px
- Summary total row: Mulish 500 16px `color: #133B62`
- "Submit Payment" button: full-width, `background: #133B62`
- Mobile sticky footer: `background: #FFFFFF`, `border-top: 1px solid #E4E4E7`

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **One-Time Payment** → Dev Mode
2. Open all 4 breakpoint frames (1440, 1024, 768, 375px)
3. Select the amount input — inspect font size, text alignment, height (40px)
4. Select the summary card — inspect row spacing, divider color
5. Select the mobile sticky footer — inspect `position: sticky`, `bottom: 0`, padding
6. Check the date picker trigger — calendar popup dimensions and positioning

---

## Validation rules

| Field | Rule |
|---|---|
| Payment amount | Required, > 0, ≤ account balance, max 2 decimal places |
| Payment method | Required — must select an option |
| Payment date | Required — defaults to today |

```tsx
const paymentSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(v => parseFloat(v) > 0, "Amount must be greater than $0")
    .refine(v => parseFloat(v) <= accountBalance, `Amount cannot exceed your balance of $${accountBalance}`),
  paymentMethodId: z.string().min(1, "Please select a payment method"),
  paymentDate: z.date(),
})
```

---

## Confirmation dialog

Before submitting, show a confirmation `Dialog` summarizing:
- Payment amount
- Payment method (masked account number)
- Payment date

User must click "Confirm Payment" to proceed.

---

## Accessibility

- `<main>` with `aria-label="Make a one-time payment"`
- All form fields have `<label>` via `htmlFor`
- Amount field: `aria-label="Payment amount in dollars"`, `inputMode="decimal"` for mobile keyboards
- Inline error messages linked via `aria-describedby`
- `aria-invalid="true"` on fields with validation errors
- Payment method Select: announces the selected option clearly
- Date picker: see `calendar.md` and `date-picker.md` for full keyboard nav
- Confirmation dialog: `role="dialog"`, `aria-labelledby` → dialog title, focus trap
- After submission: `aria-live="polite"` announces success or error
- Mobile sticky footer: ensure it doesn't obscure content; use `padding-bottom` on the scroll container
- Loading/processing state on submit button: `aria-busy="true"`, `aria-label="Processing payment..."`, disabled

---

## React

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function OneTimePaymentScreen({ accountBalance, paymentMethods }) {
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [dateMode, setDateMode] = React.useState<"today" | "choose">("today")
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())

  const paymentSchema = z.object({
    amount: z.string()
      .min(1, "Amount is required")
      .refine(v => parseFloat(v) > 0, "Amount must be greater than $0")
      .refine(v => parseFloat(v) <= accountBalance, `Cannot exceed $${accountBalance}`),
    paymentMethodId: z.string().min(1, "Please select a payment method"),
  })

  const form = useForm({ resolver: zodResolver(paymentSchema) })
  const amount = form.watch("amount")
  const methodId = form.watch("paymentMethodId")
  const selectedMethod = paymentMethods.find(m => m.id === methodId)

  async function onConfirm() {
    setIsSubmitting(true)
    try {
      await submitPayment({ amount: parseFloat(amount), methodId, date: selectedDate })
      // redirect to confirmation screen
    } finally {
      setIsSubmitting(false)
      setShowConfirm(false)
    }
  }

  return (
    <main aria-label="Make a one-time payment" className="min-h-screen bg-mcm-gray-bg p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-2xl font-medium mb-6">One-Time Payment</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Payment Form */}
          <Card>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(() => setShowConfirm(true))} noValidate className="space-y-6">

                  {/* Amount */}
                  <FormField name="amount" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-mcm-gray">$</span>
                          <Input
                            {...field}
                            type="text"
                            inputMode="decimal"
                            placeholder="0.00"
                            aria-label="Payment amount in dollars"
                            className="pl-7 text-xl font-medium text-center"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Payment Method */}
                  <FormField name="paymentMethodId" control={form.control} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a payment method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentMethods.map(m => (
                            <SelectItem key={m.id} value={m.id}>
                              {m.label} ending in {m.last4}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* Payment Date */}
                  <div>
                    <p className="text-sm font-medium mb-2">Payment Date</p>
                    <RadioGroup value={dateMode} onValueChange={(v) => setDateMode(v as "today" | "choose")} className="flex gap-4">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="today" id="today" />
                        <label htmlFor="today" className="text-sm">Today</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="choose" id="choose" />
                        <label htmlFor="choose" className="text-sm">Choose a date</label>
                      </div>
                    </RadioGroup>
                    {dateMode === "choose" && (
                      <div className="mt-3">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={(d) => d && setSelectedDate(d)}
                          disabled={(d) => d < new Date()}
                          aria-label="Select payment date"
                        />
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="hidden lg:block w-full bg-mcm-blue hover:bg-mcm-blue/90">
                    Review Payment
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="h-fit">
            <CardContent className="p-6">
              <h2 className="font-medium mb-4">Payment Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-mcm-gray">Payment Amount</span>
                  <span className="tabular-nums font-medium">${parseFloat(amount || "0").toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mcm-gray">Payment Method</span>
                  <span>{selectedMethod ? `···${selectedMethod.last4}` : "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-mcm-gray">Payment Date</span>
                  <span>{selectedDate.toLocaleDateString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-mcm-blue">
                  <span>Total</span>
                  <span className="tabular-nums">${parseFloat(amount || "0").toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile sticky footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E4E4E7] p-4 lg:hidden">
        <Button
          className="w-full bg-mcm-blue hover:bg-mcm-blue/90"
          onClick={form.handleSubmit(() => setShowConfirm(true))}
        >
          Review Payment
        </Button>
      </footer>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 text-sm py-4">
            <div className="flex justify-between">
              <span className="text-mcm-gray">Amount</span>
              <span className="tabular-nums font-medium">${parseFloat(amount || "0").toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-mcm-gray">Method</span>
              <span>{selectedMethod?.label} ···{selectedMethod?.last4}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-mcm-gray">Date</span>
              <span>{selectedDate.toLocaleDateString()}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowConfirm(false)}>Edit</Button>
            <Button
              className="bg-mcm-blue hover:bg-mcm-blue/90"
              onClick={onConfirm}
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              aria-label={isSubmitting ? "Processing payment..." : "Confirm payment"}
            >
              {isSubmitting ? "Processing..." : "Confirm Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
```
