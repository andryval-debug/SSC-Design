# Component — Tabs

**Source:** MCM - DS / Tabs canvas
**shadcn/ui:** `tabs`

---

## Description

A set of layered sections (tab panels) that display one at a time. Used to organize related content into categories without navigating to a new page.

---

## Key styles

| Element | Value |
|---|---|
| Tab list background | `#F4F4F5` |
| Tab list border-radius | `8px` |
| Tab trigger padding | `6px 12px` |
| Active tab | `background: #FFFFFF`, `box-shadow: 0 1px 3px rgba(0,0,0,0.1)`, `color: #18181B` |
| Inactive tab | `color: #71717A`, hover: `color: #18181B` |
| Font | Mulish 500, 14px |

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Tabs** canvas → Dev Mode
2. Select tab list → Inspect: background, padding, border-radius
3. Select active tab trigger → Inspect: background, shadow, font
4. Select inactive tab → Inspect: color difference from active

---

## Accessibility

- **`role="tablist"`** on the container, **`role="tab"`** on each trigger, **`role="tabpanel"`** on each panel
- Active tab: `aria-selected="true"`; others: `aria-selected="false"`
- Tab trigger: `aria-controls` → ID of its panel; panel: `aria-labelledby` → ID of its tab
- **Keyboard:** `Left`/`Right` arrows cycle through tabs (auto-activates) · `Tab` moves focus into the active panel · `Home`/`End` jump to first/last tab
- Avoid using tabs for a step-by-step process — use a Stepper instead

---

## React (shadcn/ui)

```bash
npx shadcn-ui@latest add tabs
```

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="summary">
  <TabsList>
    <TabsTrigger value="summary">Account Summary</TabsTrigger>
    <TabsTrigger value="payments">Payments</TabsTrigger>
    <TabsTrigger value="offers">Offers</TabsTrigger>
  </TabsList>
  <TabsContent value="summary">
    <p>Your current balance and account overview.</p>
  </TabsContent>
  <TabsContent value="payments">
    <p>Payment history and upcoming payments.</p>
  </TabsContent>
  <TabsContent value="offers">
    <p>Custom and marketing offers available to you.</p>
  </TabsContent>
</Tabs>
```
