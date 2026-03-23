# MCM Design System Documentation

**Font family:** Mulish
**Last updated:** 2026-03-18

## Figma files

| File | Link | Contents |
|---|---|---|
| Foundation | `Cb1GVguOWBkTsRX4fhXpnX` | Colors, Typography (13 scales) |
| Design System | `WdJMRYrJVq6qNNTugSQyNM` | 50+ components |
| Designs (SSC) | `IshU3hueKvtEaZhTymMLIx` | Screens — Login, Disclosure, Modals, Account Summary, Offers, One-Time Payment, etc. |

---

## Structure

```
mcm-design-tokens/
├── tokens/
│   ├── colors.css          ← CSS custom properties (17 color tokens)
│   ├── typography.css      ← Typography tokens (13 scale levels)
│   ├── tailwind.config.js  ← Tailwind theme extension
│   └── tokens.json         ← Style Dictionary source (W3C format)
│
└── docs/
    ├── foundation-colors.md
    ├── foundation-typography.md
    └── components/
        ├── button.md
        ├── input.md
        ├── badge.md
        └── alert.md
```

---

## Token pipeline (Figma → React, auto-sync)

```
Figma Foundation
  └─ Tokens Studio plugin (GitHub sync)
       └─ tokens.json
            └─ Style Dictionary
                 ├─ tokens/colors.css
                 └─ tokens/tailwind.config.js
                      └─ React / shadcn/ui components
```

**Setup:**
1. Install [Tokens Studio](https://tokens.studio/) in Figma
2. Connect it to this repo via GitHub integration
3. Push changes from Figma → triggers GitHub Action → regenerates CSS + Tailwind tokens
4. shadcn/ui components consume the Tailwind tokens automatically

---

## Components (DS → React mapping)

All MCM DS components map 1:1 to **shadcn/ui**:

```bash
# Install a component
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input label
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add alert
```

Full component list: Accordion, Alert, Alert Dialog, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Checkbox, Collapsible, Combobox, Command, Context Menu, Data Table, Date Picker, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Input OTP, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toggle, Toggle Group, Tooltip

---

## Documentation template (per component)

Each component doc covers:
1. **Description** — what it is, when to use it
2. **Variants** — all Figma variants with colors/values
3. **States** — Default / Hover / Focus / Disabled / Loading
4. **Props** — Figma component properties mapped to React props
5. **Dev Mode** — step-by-step how to inspect in Figma
6. **Accessibility** — WCAG requirements, ARIA, keyboard, contrast
7. **React** — shadcn/ui install + usage examples
