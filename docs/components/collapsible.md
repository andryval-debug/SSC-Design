# Component — Collapsible

**Source:** MCM - DS / Collapsible canvas (node `60:434`)
**shadcn/ui:** `collapsible`

---

## Description

An interactive component which expands/collapses content. Unlike Accordion, Collapsible is a single standalone toggle — not part of a stacked group.

---

## States

| State | Description |
|---|---|
| **Closed** | Content hidden |
| **Open** | Content visible |
| **Disabled** | Not togglable |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Collapsible** canvas → Dev Mode
2. Select trigger → Inspect: padding, chevron icon, font
3. Toggle Open/Closed state to compare content visibility

---

## Accessibility

- **`aria-expanded="true|false"`** on the trigger button
- **`aria-controls`** → ID of the collapsible content panel
- **Keyboard:** `Enter`/`Space` to toggle
- Focus remains on the trigger button after toggling

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add collapsible
```

```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from "lucide-react"

const [isOpen, setIsOpen] = React.useState(false)

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
  <div className="flex items-center justify-between">
    <h4 className="text-sm font-semibold">Additional details</h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="icon" aria-label={isOpen ? "Collapse" : "Expand"}>
        <ChevronsUpDown className="h-4 w-4" />
      </Button>
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent className="pt-2">
    <p className="text-sm text-mcm-gray">Hidden content revealed here.</p>
  </CollapsibleContent>
</Collapsible>
```
