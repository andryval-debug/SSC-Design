# Component — Command

**Source:** MCM - DS / Command canvas (node `60:436`)
**shadcn/ui:** `command`

---

## Description

A fast, keyboard-first command palette / search input. Used standalone or as the inner component of Combobox, popover search, or full-screen command menus (⌘K).

---

## Anatomy

- **CommandInput:** Search field at top — filters all items as you type
- **CommandList:** Scrollable results container
- **CommandGroup:** Labeled section of results
- **CommandItem:** Individual selectable result
- **CommandSeparator:** Divider between groups
- **CommandEmpty:** Shown when no results match

**Key styles:**
- Input height: 40px, border-bottom: `1px solid #E4E4E7`
- Item height: 32px, `padding: 6px 8px`
- Selected/focused item: `background: #F4F4F5`
- Border-radius of container: `8px`

---

## Accessibility

- **`role="combobox"`** on the input
- **`role="listbox"`** on the list
- **`role="option"`** on each item with `aria-selected`
- **`aria-activedescendant`** tracks the currently highlighted item
- **Keyboard:** `Up`/`Down` arrows navigate · `Enter` selects · `Escape` closes

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add command
```

```tsx
import {
  Command, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList, CommandSeparator,
} from "@/components/ui/command"

<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Account">
      <CommandItem>View Account Summary</CommandItem>
      <CommandItem>Make a Payment</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Notifications</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```
