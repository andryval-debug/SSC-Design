# Component — Date Picker

**Source:** MCM - DS / Date Picker canvas (node `244:2898`)
**shadcn/ui:** `date-picker` (composed from `Popover` + `Calendar`)

---

## Description

Allows the user to select a date (or date range) from an interactive calendar popover. Built by composing `Popover` + `Calendar`.

---

## Variants

| Variant | Description |
|---|---|
| Single | One date selected |
| Range | Start + end date selected |
| With presets | Quick-select options (Today, Last 7 days, etc.) |

---

## Key styles

- Trigger: standard `Input`-style button, 40px height
- Calendar popover: `border-radius: 8px`, `padding: 12px`, `border: 1px solid #E4E4E7`
- Selected day: `background: #133B62` (MCM Blue), `color: #FFFFFF`
- Today indicator: underline or dot
- Hover day: `background: #F4F4F5`

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Date Picker** canvas → Dev Mode
2. Select trigger button → Inspect: height, padding, border
3. Select open calendar → Inspect: grid layout, selected day fill, nav arrows

---

## Accessibility

- **Trigger button:** `aria-label="Pick a date"`, `aria-haspopup="dialog"`
- **Calendar:** `role="dialog"` with `aria-label="Calendar"`
- **Grid:** `role="grid"` with `aria-label="Month Year"` (e.g. "March 2026")
- **Day cells:** `role="gridcell"`, `aria-selected`, `aria-disabled` for unavailable dates
- **Today:** `aria-current="date"`
- **Keyboard:** Arrow keys navigate days · `Enter` selects · `Escape` closes · `PageUp/Down` changes month

---

## React (shadcn/ui)

```bash
npm install date-fns
npx shadcn-ui@latest add popover calendar
```

```tsx
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const [date, setDate] = React.useState<Date>()

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
      <CalendarIcon className="mr-2 h-4 w-4" />
      {date ? format(date, "PPP") : <span className="text-muted-foreground">Pick a date</span>}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
  </PopoverContent>
</Popover>

// Date range
const [range, setRange] = React.useState<DateRange | undefined>()
<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
```
