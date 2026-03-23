# Component — Combobox

**Source:** MCM - DS / Combobox canvas (node `60:435`)
**shadcn/ui:** `combobox` (composed from `Popover` + `Command`)

---

## Description

An autocomplete input combining a text field with a dropdown list. The user can type to filter options or select from the list. Built by composing `Popover` + `Command`.

---

## States

| State | Description |
|---|---|
| **Closed** | Shows selected value or placeholder |
| **Open** | Dropdown visible with filterable list |
| **Selected** | Shows selected option with check icon |
| **Empty** | No results match search query |
| **Disabled** | Not interactive |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Combobox** canvas → Dev Mode
2. Select trigger → Inspect: height 40px, border `#E4E4E7`, padding
3. Select open state → Inspect popover: width, shadow, border-radius

---

## Accessibility

- **`role="combobox"`** on the input element
- **`aria-expanded`** reflects open/closed state
- **`aria-haspopup="listbox"`** indicates a dropdown is available
- **`aria-autocomplete="list"`** for filter-as-you-type
- **`role="listbox"`** on the dropdown, `role="option"` on each item
- **`aria-selected="true"`** on the currently selected option
- **Keyboard:** `Down`/`Up` arrows navigate the list · `Enter` selects · `Escape` closes

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add popover command
```

```tsx
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
]

const [open, setOpen] = React.useState(false)
const [value, setValue] = React.useState("")

<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
      {value ? options.find(o => o.value === value)?.label : "Select status..."}
      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-[200px] p-0">
    <Command>
      <CommandInput placeholder="Search status..." />
      <CommandEmpty>No status found.</CommandEmpty>
      <CommandGroup>
        {options.map(option => (
          <CommandItem key={option.value} value={option.value}
            onSelect={(v) => { setValue(v === value ? "" : v); setOpen(false) }}>
            <Check className={`mr-2 h-4 w-4 ${value === option.value ? "opacity-100" : "opacity-0"}`} />
            {option.label}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover>
```
