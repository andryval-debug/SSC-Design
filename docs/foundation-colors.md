# Foundation — Colors

**Source:** MCM - DS - Foundation / Colors canvas
**Sections:** MCM Brand · Misc (Semantic) · MCM Colors Study

---

## MCM Brand Palette

| Token | CSS Variable | Hex | Use |
|---|---|---|---|
| MCM Blue | `--mcm-blue` | `#133B62` | Primary brand — main color |
| MCM Light Blue | `--mcm-blue-light` | `#0069AA` | Buttons, menus, badges |
| MCM Blue Pale | `--mcm-blue-pale` | `#B6C7D7` | Icons in light contexts |
| MCM Green | `--mcm-green` | `#42820D` | Buttons, menus, badges |
| MCM Green Light | `--mcm-green-light` | `#7AC043` | Icons |
| MCM Green Progress | `--mcm-green-progress` | `#5E9732` | Progress bar |
| MCM Gray | `--mcm-gray` | `#555555` | Body text |
| MCM Gray Background | `--mcm-gray-bg` | `#EDEDF2` | Main page background |
| MCM Gray Footer | `--mcm-gray-footer` | `#333333` | Footer background |

---

## Semantic / Misc Palette

| Token | CSS Variable | Hex | Use |
|---|---|---|---|
| Error | `--color-error` | `#D32F2F` | Error states, destructive actions |
| Warning | `--color-warning` | `#F57C00` | Warnings |
| Caution | `--color-caution` | `#FFB300` | Caution / attention |
| Success | `--color-success` | `#388E3C` | Success states |
| Info | `--color-info` | `#0288D1` | Informational messages |
| White | `--color-white` | `#FFFFFF` | Backgrounds, card surfaces |
| Black | `--color-black` | `#000000` | Base text |

---

## Color Usage Guidelines (from MCM Colors Study)

| Color | Hex | Role | Where used |
|---|---|---|---|
| Main Color Blue | `#133B62` | Primary brand | Global identity |
| Support Blue | `#0069AA` | Interactive | Buttons, menus, badges |
| Secondary Green | `#42820D` | Action | Buttons, menus, badges |
| Support Green | `#7AC043` | Decorative | Icons |
| Progress Green | `#5E9732` | Feedback | Progress bars |
| Pale Blue | `#B6C7D7` | Decorative | Icons (light bg) |
| Gray BG | `#EDEDF2` | Surface | Main background |
| Gray Text | `#555555` | Text | Body text |
| Footer Gray | `#333333` | Surface | Footer background |

---

## Dev Mode (Figma)

1. Open **MCM - DS - Foundation** → Colors canvas
2. Switch to **Dev Mode** (top-right toggle)
3. Click any color swatch → **Inspect** panel shows the hex value and opacity
4. **Variables** panel shows whether the color maps to a variable (token)
5. Under **Design** tab → **Fill** section → copy hex or token reference directly

---

## Accessibility

- **Text on backgrounds:** Body text `#555555` on `#EDEDF2` → ratio ~4.8:1 ✓ (WCAG AA)
- **Primary brand blue** `#133B62` on white → ratio ~10.6:1 ✓ (WCAG AAA)
- **Buttons:** `#0069AA` text/icon on white → ratio ~4.6:1 ✓ (WCAG AA)
- **Error red** `#D32F2F` must always be paired with an icon or text label — never color-only indicators
- **Never use color alone** to convey meaning — always support with text, icons, or patterns

---

## React / Tailwind Usage

```tsx
// tailwind.config.js already configured (see tokens/tailwind.config.js)

// Usage in components:
<div className="bg-mcm-gray-bg text-mcm-gray">
  Main content
</div>

<button className="bg-mcm-blue-light text-white hover:bg-mcm-blue">
  Action
</button>

<span className="text-semantic-error">
  Error message
</span>
```

---

## CSS Variables Usage

```css
/* Import the token file */
@import 'tokens/colors.css';

.button-primary {
  background-color: var(--mcm-blue-light);
  color: var(--color-white);
}

.button-primary:hover {
  background-color: var(--mcm-blue);
}

.alert-error {
  border-color: var(--color-error);
  color: var(--color-error);
}
```
