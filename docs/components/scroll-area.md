# Component — Scroll Area

**Source:** MCM - DS / Scroll Area canvas (node `296:207`)
**shadcn/ui:** `scroll-area`

---

## Description

A custom-styled scrollable container that replaces native browser scrollbars with a consistent MCM design. Used when overflow content needs to scroll within a bounded container.

---

## Key styles

| Element | Value |
|---|---|
| Scrollbar width | 8px |
| Scrollbar track | `background: transparent` |
| Scrollbar thumb | `background: #E4E4E7`, `border-radius: 9999px` |
| Scrollbar thumb hover | `background: #A1A1AA` |
| Corner (both axes) | `background: transparent` |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Scroll Area** canvas → Dev Mode
2. Select scrollbar thumb → Inspect: width, border-radius, color
3. Check vertical vs horizontal scrollbar variants

---

## Accessibility

- The scroll area is a container — its contents must be accessible
- **`tabindex="0"`** on the container if users need to scroll via keyboard
- **Keyboard:** `Arrow keys` scroll when the container is focused · `Page Up/Down` · `Home/End`
- Screen readers navigate to content directly — they don't interact with custom scrollbars
- Ensure sufficient scroll affordance (visible scrollbar or shadow/fade at edges to indicate more content)

---

## React

```bash
npx shadcn-ui@latest add scroll-area
```

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const transactions = Array.from({ length: 30 }, (_, i) => ({
  id: `TXN-${1000 + i}`,
  amount: (Math.random() * 500 + 50).toFixed(2),
}))

// Vertical scroll list
<ScrollArea className="h-72 rounded-md border">
  <div className="p-4">
    <h4 className="mb-4 font-medium leading-none">Recent Transactions</h4>
    {transactions.map(tx => (
      <React.Fragment key={tx.id}>
        <div className="flex justify-between py-2 text-sm">
          <span>{tx.id}</span>
          <span className="tabular-nums">${tx.amount}</span>
        </div>
        <Separator />
      </React.Fragment>
    ))}
  </div>
</ScrollArea>

// Horizontal scroll
<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex p-4 gap-4">
    {offers.map(offer => (
      <div key={offer.id} className="w-48 shrink-0 rounded-md border p-4">
        {offer.title}
      </div>
    ))}
  </div>
</ScrollArea>
```
