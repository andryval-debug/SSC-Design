# Component — Accordion

**Source:** MCM - DS / Accordion canvas (node `1:434`)
**shadcn/ui:** `accordion`

---

## Description

A vertically stacked set of interactive headings that each reveal a section of content. Only one section is open at a time by default (single mode), or multiple can be open simultaneously (multiple mode).

---

## Variants

| Property | Values |
|---|---|
| Type | `single` · `multiple` |
| State | Default · Open · Disabled |

---

## Anatomy

- **Trigger:** Clickable header row with chevron icon — rotates 180° when open
- **Content:** Collapsible panel below the trigger
- **Separator:** Subtle border between items

**Key styles:**
- Border bottom: `1px solid #E4E4E7`
- Trigger padding: `16px 0`
- Content padding: `0 0 16px`
- Chevron rotation: 180° on open (CSS transition)

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Accordion** canvas → Dev Mode
2. Select the trigger frame → Inspect: padding, font, icon size
3. Select the content panel → Inspect: max-height transition, padding
4. Toggle State between Default/Open to compare collapsed vs expanded

---

## Accessibility

- **Role:** `<button>` on the trigger with `aria-expanded="true|false"`
- **`aria-controls`:** Points to the content panel ID
- **`id` on panel:** Linked via `aria-labelledby` from the trigger
- **Keyboard:** `Enter`/`Space` to toggle · `Tab` to navigate between triggers · `Up`/`Down` arrows to move between items
- **Focus:** Visible focus ring on trigger required
- **Disabled item:** `aria-disabled="true"` + `tabindex="-1"`

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add accordion
```

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Single open at a time
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the design system.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple open simultaneously
<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
</Accordion>
```
