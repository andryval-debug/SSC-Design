# Component — Card

**Source:** MCM - DS / Card canvas (node `46:65`)
**shadcn/ui:** `card`

---

## Description

A container that groups related content and actions about a single subject. Cards are surfaces — they hold other components (text, buttons, images, lists).

---

## Anatomy

- **CardHeader:** Title + optional description
- **CardContent:** Main body area
- **CardFooter:** Actions — typically buttons
- **Container:** `background: #FFFFFF`, `border: 1px solid #E4E4E7`, `border-radius: 8px`, `padding: 24px`
- **Shadow:** Subtle `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Card** canvas → Dev Mode
2. Select the card container → Inspect: border, padding, border-radius, shadow
3. Select inner sections (Header/Content/Footer) to see individual padding/gap values
4. Check typography inside: Title uses `--type-subh2`, Description uses `--type-body` with muted color

---

## Accessibility

- Cards are not interactive by default — they are layout containers
- If the entire card is clickable, use `<a>` or `<button>` as the wrapper with a descriptive `aria-label`
- Avoid duplicating links — if a card has a title link + a "Learn more" link pointing to the same URL, use `aria-hidden="true"` on the secondary link
- Ensure sufficient contrast between card background and page background (border helps differentiate)

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add card
```

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

<Card>
  <CardHeader>
    <CardTitle>Account Summary</CardTitle>
    <CardDescription>Your current balance and payment status.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-2xl font-semibold text-mcm-blue">$1,234.56</p>
    <p className="text-sm text-mcm-gray">Due: March 25, 2026</p>
  </CardContent>
  <CardFooter className="flex gap-2">
    <Button>Make Payment</Button>
    <Button variant="ghost">View Details</Button>
  </CardFooter>
</Card>

// Clickable card
<Card asChild>
  <a href="/account/details" aria-label="View account details">
    <CardHeader>
      <CardTitle>Account Details</CardTitle>
    </CardHeader>
  </a>
</Card>
```
