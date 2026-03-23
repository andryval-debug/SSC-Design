# Component — Table

**Source:** MCM - DS / Table canvas
**shadcn/ui:** `table`

---

## Description

The base table component — semantic HTML table elements with consistent MCM styling. Used directly for simple static tables, or as the foundation for Data Table (with sorting, filtering, pagination).

---

## Key styles

| Element | Value |
|---|---|
| Header row background | `#F4F4F5` |
| Header font | Mulish 500 (Medium), 12px, `#71717A` |
| Body row height | 48px |
| Row hover | `background: #F9F9F9` |
| Row border | `1px solid #E4E4E7` (bottom only) |
| Cell padding | `12px 16px` |
| Footer background | `#FAFAFA` |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Table** canvas → Dev Mode
2. Select header row → Inspect: background, font-weight, font-size
3. Select body row → Inspect: height, border, padding, hover state
4. Check cell alignment (text: left for labels, right for numbers/amounts)

---

## Accessibility

- **Semantic HTML required:** `<table>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, `<td>`
- **`scope="col"`** on `<th>` in `<thead>`
- **`scope="row"`** on row header cells in `<tbody>`
- **`<caption>`** or `aria-label` on the table for screen reader context
- Numeric/financial data: right-align for scanning, use monospace or tabular-nums
- Avoid merging cells (`colspan`/`rowspan`) when possible — confuses screen readers

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add table
```

```tsx
import {
  Table, TableBody, TableCaption, TableCell,
  TableFooter, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

const payments = [
  { id: "INV001", date: "2026-03-01", amount: 250.00, status: "Paid" },
  { id: "INV002", date: "2026-02-01", amount: 250.00, status: "Paid" },
  { id: "INV003", date: "2026-01-01", amount: 250.00, status: "Pending" },
]

<Table aria-label="Payment history">
  <TableCaption>Your recent payments.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead scope="col">Invoice</TableHead>
      <TableHead scope="col">Date</TableHead>
      <TableHead scope="col" className="text-right">Amount</TableHead>
      <TableHead scope="col">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {payments.map(p => (
      <TableRow key={p.id}>
        <TableCell className="font-medium">{p.id}</TableCell>
        <TableCell>{p.date}</TableCell>
        <TableCell className="text-right tabular-nums">${p.amount.toFixed(2)}</TableCell>
        <TableCell>{p.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2} className="font-medium">Total</TableCell>
      <TableCell className="text-right font-medium tabular-nums">$750.00</TableCell>
      <TableCell />
    </TableRow>
  </TableFooter>
</Table>
```
