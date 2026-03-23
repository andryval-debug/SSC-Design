# Component — Footer

**Source:** MCM - SSC / Footer
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

The persistent bottom footer present on all SSC screens. Contains legal disclaimer text, compliance information, secondary links (Privacy Policy, Terms of Use, FDCPA Notice), and the MCM copyright line. Full-width, dark background.

---

## Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | 1440px | 2-column: left copy/links, right logo — all inline |
| Tablet Landscape | 1024px | Same 2-column, reduced padding |
| Tablet Portrait | 768px | Single column, stacked — links then disclaimer |
| Mobile | 375px | Single column, centered, 16px padding |

---

## Key styles

- Background: `#333333` (`--mcm-gray-footer`)
- Text color: `rgba(255,255,255,0.75)` for body text
- Link color: `rgba(255,255,255,0.85)`, hover: `#FFFFFF`, underlined
- Disclaimer text: Mulish 400 12px, `line-height: 1.6`
- Copyright text: Mulish 400 12px
- Footer logo: white variant, `height: 24px`
- Padding: `40px 80px` (desktop) · `32px` (tablet) · `24px 16px` (mobile)
- Separator above footer: `border-top: 1px solid rgba(255,255,255,0.1)`

---

## Content

```
MCM Capital Group, LLC is a debt collector. This is an attempt to collect a debt.
Any information obtained will be used for that purpose.

© 2026 MCM Capital Group, LLC. All rights reserved.

[Privacy Policy] [Terms of Use] [FDCPA Notice] [Accessibility Statement] [Contact Us]
```

*(Exact legal copy must be reviewed by the MCM compliance team.)*

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Footer** frame → Dev Mode
2. Select the footer container → inspect `background-color: #333333`, padding
3. Select the disclaimer text → confirm Mulish 12px, `color: rgba(255,255,255,0.75)`
4. Select a link → inspect underline, hover color
5. Check mobile frame: text alignment and stacking

---

## Accessibility

- `<footer>` element (landmark role `contentinfo`)
- `aria-label="Site footer"` for clarity when multiple landmark regions exist
- All footer links are `<a>` elements with descriptive text — no "click here"
- Links meet contrast ratio against `#333333` background (minimum 4.5:1)
  - `rgba(255,255,255,0.75)` = ~`#BFBFBF` on `#333333` ≈ 5.7:1 ✅
- "Accessibility Statement" link: include if an accessibility page exists
- FDCPA Notice must be readable — if collapsed, must be expandable without a mouse
- Do not use italics alone to indicate importance — also use a visible heading or label

---

## React

```tsx
import { Separator } from "@/components/ui/separator"

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "FDCPA Notice", href: "/fdcpa" },
  { label: "Accessibility Statement", href: "/accessibility" },
  { label: "Contact Us", href: "/contact" },
]

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="bg-[#333333] text-white/75 px-10 py-10 md:px-20"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Links row */}
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
          {footerLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-white/85 hover:text-white underline underline-offset-2 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Separator className="bg-white/10 mb-6" />

        {/* Disclaimer */}
        <p className="text-xs leading-relaxed mb-4">
          MCM Capital Group, LLC is a debt collector. This is an attempt to collect a debt.
          Any information obtained will be used for that purpose.
        </p>

        {/* Copyright + logo */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} MCM Capital Group, LLC. All rights reserved.
          </p>
          <img
            src="/mcm-logo-white.svg"
            alt="MCM"
            className="h-6"
          />
        </div>

      </div>
    </footer>
  )
}
```
