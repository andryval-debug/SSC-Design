# Component — Calendar

**Source:** MCM - DS / Calendar canvas (node `37:1900`)
**shadcn/ui:** `calendar` (via `react-day-picker`)

---

## Description

A full month calendar grid for date selection. Used inside Date Picker or as a standalone inline calendar.

---

## Key styles

| Element | Value |
|---|---|
| Container width | 280px (single month) |
| Day cell | 36×36px, `border-radius: 6px` |
| Selected day | `background: #133B62`, `color: #FFFFFF` |
| Today | Underline indicator |
| Hover | `background: #F4F4F5` |
| Outside month | `color: #A1A1AA` |
| Disabled day | `color: #E4E4E7`, not interactive |
| Nav arrows | 28×28px, ghost button style |

---

## Accessibility

- **`role="grid"`** on the calendar table, `role="gridcell"` on each day
- **`aria-selected`** on selected days, **`aria-disabled`** on unavailable dates
- **`aria-current="date"`** on today
- Month/year header: `aria-label="March 2026"` (announced when navigating)
- Navigation buttons: `aria-label="Go to previous month"` / `"Go to next month"`
- **Keyboard:** `Left`/`Right`/`Up`/`Down` navigate days · `Enter`/`Space` select · `PageUp`/`PageDown` change month · `Home`/`End` jump to first/last day of week

---

## React

```bash
npm install react-day-picker date-fns
npx shadcn-ui@latest add calendar
```

```tsx
import { Calendar } from "@/components/ui/calendar"

const [date, setDate] = React.useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
  aria-label="Select payment date"
  disabled={(date) => date < new Date()}  // disable past dates
/>
```
