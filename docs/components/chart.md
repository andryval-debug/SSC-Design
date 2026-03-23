# Component — Chart

**Source:** MCM - DS / Chart canvas (node `449:6176`) — marked 🔺 (in progress)
**shadcn/ui:** `chart` (via `recharts`)

---

## Description

Data visualization components including bar charts, line charts, area charts, and pie/donut charts. Built on Recharts with MCM color tokens applied as the palette.

---

## MCM chart palette (from brand tokens)

| Role | Color | Token |
|---|---|---|
| Primary series | `#133B62` | `--mcm-blue` |
| Secondary series | `#0069AA` | `--mcm-blue-light` |
| Tertiary series | `#42820D` | `--mcm-green` |
| Quaternary series | `#7AC043` | `--mcm-green-light` |
| Highlight / alert | `#D32F2F` | `--color-error` |
| Neutral | `#555555` | `--mcm-gray` |

---

## Chart types

| Type | Use case |
|---|---|
| **Bar** | Compare values across categories (monthly payments) |
| **Line** | Trends over time (balance history) |
| **Area** | Volume/cumulative trends |
| **Pie / Donut** | Part-to-whole (payment breakdown) |

---

## Key styles

- Grid lines: `#E4E4E7`, dashed
- Axis labels: Mulish 12px, `#71717A`
- Tooltip: `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 6px`, `padding: 12px`
- Legend: Mulish 12px, inline colored dots

---

## Accessibility

- **`role="img"` with `aria-label`** on the chart container describing what it shows
- Always provide a **data table equivalent** — screen readers cannot interpret SVG charts
- Use `<title>` and `<desc>` inside the SVG for screen reader access
- Color is not the only differentiator — use patterns, labels, or icons alongside color for data series
- Chart tooltips must be keyboard accessible (focus on data points via arrow keys)

---

## React

```bash
npm install recharts
npx shadcn-ui@latest add chart
```

```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", amount: 250 },
  { month: "Feb", amount: 250 },
  { month: "Mar", amount: 312 },
]

const chartConfig = {
  amount: { label: "Payment", color: "#0069AA" },
}

<ChartContainer config={chartConfig} aria-label="Monthly payment history">
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" />
    <XAxis dataKey="month" tick={{ fontFamily: "Mulish", fontSize: 12 }} />
    <YAxis tick={{ fontFamily: "Mulish", fontSize: 12 }} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="amount" fill="#0069AA" radius={[4,4,0,0]} />
  </BarChart>
</ChartContainer>

{/* Accessible data table — always include */}
<table className="sr-only" aria-label="Monthly payment history data">
  <thead><tr><th>Month</th><th>Amount</th></tr></thead>
  <tbody>{data.map(d => <tr key={d.month}><td>{d.month}</td><td>${d.amount}</td></tr>)}</tbody>
</table>
```
