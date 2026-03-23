# Component — Data Table

**Source:** MCM - DS / Data Table canvas (node `244:2897`)
**shadcn/ui:** `data-table` (composed from `Table` + `@tanstack/react-table`)

---

## Description

A powerful table component for displaying complex data sets. Supports sorting, filtering, pagination, row selection, and column visibility. Built on `@tanstack/react-table` (TanStack Table v8).

---

## Features

| Feature | Description |
|---|---|
| Sorting | Click column headers to sort asc/desc |
| Filtering | Global or per-column text filter |
| Pagination | Configurable page size + prev/next navigation |
| Row selection | Checkbox column for multi-select |
| Column visibility | Show/hide columns via dropdown |

---

## Key styles

- Header row: `background: #F4F4F5`, `font-weight: 500`, `font-size: 12px`
- Body row height: 48px
- Row hover: `background: #F9F9F9`
- Selected row: `background: #EFF6FF` (light blue tint)
- Border: `1px solid #E4E4E7` between rows
- Pagination: uses standard `Button` and `Select` components

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Data Table** canvas → Dev Mode
2. Select header row → Inspect: background, font-weight, height, padding
3. Select body row → Inspect: height, border, hover state
4. Check the pagination area for button and select component references

---

## Accessibility

- **`<table>`** with `<thead>`, `<tbody>`, `<tfoot>` — semantic HTML structure
- **`scope="col"`** on `<th>` header cells
- **`scope="row"`** on row header cells
- **`aria-sort="ascending|descending|none"`** on sortable column headers
- **`aria-label`** on the table describing its content: `aria-label="Account transactions"`
- **`caption`** element (or `aria-label`) for table title
- **Row selection:** Checkbox column — each checkbox has `aria-label="Select row {id}"`
- **Keyboard:** Tab to navigate between interactive elements (sort buttons, checkboxes, pagination)

---

## React (shadcn/ui)

```bash
npm install @tanstack/react-table
npx shadcn-ui@latest add table
```

```tsx
// columns.tsx
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  date: string
}

export const columns: ColumnDef<Payment>[] = [
  { accessorKey: "date",   header: "Date" },
  { accessorKey: "amount", header: "Amount",
    cell: ({ row }) => `$${row.getValue<number>("amount").toFixed(2)}` },
  { accessorKey: "status", header: "Status",
    cell: ({ row }) => <Badge variant={row.getValue("status") === "failed" ? "destructive" : "secondary"}>
      {row.getValue("status")}
    </Badge> },
]

// data-table.tsx
import { DataTable } from "@/components/data-table"
<DataTable columns={columns} data={payments} />
```
