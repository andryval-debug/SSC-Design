# Foundation — Typography

**Source:** MCM - DS - Foundation / Typography canvas
**Font family:** Mulish
**Breakpoints:** Mobile (375px) · Tablet Portrait (768px) · Tablet Landscape (1024px) · Desktop (1440px)

---

## Branding / Display Scale

| Figma Token | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| `Branding/Heading 1/Desktop` | 56px | 400 Regular | 1.143 | -1.79% |
| `Branding/Heading 2/Desktop` | 48px | 400 Regular | 1.167 | -2.08% |
| `Branding/Heading 3/Desktop` | 32px | 400 Regular | 1.25  | -3.13% |

---

## Scale 01 — Headings

**Figma token:** `Heading 1/Desktop` · **HTML:** `<h1>`–`<h6>`

| Breakpoint | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Desktop | 48px | 500 | 1.167 | -2.08% |
| Tablet Landscape | 40px | 500 | 1.2 | -2.00% |
| Tablet Portrait | 36px | 500 | 1.222 | -2.00% |
| Mobile | 28px | 500 | 1.286 | -1.79% |
| Hero / Cover | 60px | 300 | 1.2 | -0.83% |

**Usage:** H1 → primary page/section title only. H2–H6 → progressive hierarchy, never skip levels.

**Accessibility:**
- Contrast ≥ 4.5:1 against background (WCAG AA)
- Use semantic HTML tags — `<h1>` through `<h6>` in logical order
- Never use headings purely for visual size — use CSS instead
- Screen readers announce headings for navigation; logical order is critical for users with disabilities

---

## Scale 02 — Subheadings

**HTML:** `<h4>`, `<h5>`, `<h6>`

| Level | Desktop | Mobile | Weight | Use |
|---|---|---|---|---|
| Subheading 1 | 32px | 24px | 600 | Key secondary sections beneath H1–H3 |
| Subheading 2 | 24px | 20px | 600 | Less prominent subsections |
| Subheading 3 | 20px | 16px | 600 | Smallest — labels within sections |

**Accessibility:**
- Contrast ≥ 4.5:1 (normal text), ≥ 3:1 (large text — WCAG AA)
- Use `rem`/`em` units in implementation to respect user font-size preferences
- Screen readers use `<h4>`, `<h5>`, `<h6>` for document outline

---

## Scale 03 — Paragraphs (Body)

**Breakpoints:** Mobile · Tablet Portrait · Tablet Landscape · Desktop

| Breakpoint | Size | Weight | Line Height |
|---|---|---|---|
| Desktop | 16px | 400 | 1.75 |
| Desktop (large) | 18px | 400 | 1.778 |
| Mobile | 14px | 400 | 1.714 |

**Usage:** Long-form content, descriptions, prose. Generous line-height (1.75) for readability.

**Accessibility:** Minimum 1.5 line-height recommended (WCAG AA). Use `rem` units.

---

## Scale 04 — Captions

**Breakpoints:** Mobile · Tablet Portrait · Tablet Landscape

| Breakpoint | Size | Weight | Line Height |
|---|---|---|---|
| Desktop / Tablet | 12px | 400 | 1.667 |
| Mobile | 11px | 400 | 1.636 |

**Usage:** Image captions, footnotes, supplementary info beneath visuals. HTML: `<figcaption>`, `<small>`.

**Accessibility:** Minimum 12px for readability. Ensure captions are associated with their figures via `<figure>` + `<figcaption>`.

---

## Scale 05 — Quotes / Blockquotes

**HTML:** `<blockquote>` · **Breakpoints:** Mobile · Tablet Portrait · Tablet Landscape

| Breakpoint | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Desktop | 20px | 300 Light | 1.6 | -1.00% |
| Mobile | 18px | 300 Light | 1.556 | -1.00% |

**Usage:** Pull quotes, testimonials, cited content.

**Accessibility:** Use `<blockquote>` with `<cite>` for the source. Screen readers announce blockquotes as quotes.

---

## Scale 06 — Overline / Eyebrow Text

**Breakpoints:** Mobile · Tablet Portrait · Tablet Landscape

| Property | Value |
|---|---|
| Size | 11px |
| Weight | 700 Bold |
| Line Height | 1.455 |
| Letter Spacing | +0.08em (uppercase tracking) |
| Transform | `text-transform: uppercase` |

**Usage:** Small label above a heading to provide category/context. Example: `FEATURED ARTICLE` above a title.

**Accessibility:** Uppercase is set via CSS `text-transform`, not ALL CAPS in the text — screen readers will read it normally.

---

## Scale 07 — Small Text

**Breakpoints:** Mobile · Tablet Portrait · Tablet Landscape

| Property | Value |
|---|---|
| Size | 12px |
| Weight | 400 Regular |
| Line Height | 1.5 |

**Usage:** Legal copy, fine print, disclaimers, copyright notices.

**Accessibility:** 12px is the absolute minimum. Never use Small Text for primary content. Ensure contrast ≥ 4.5:1.

---

## Scale 08 — Main Menu Item

**Breakpoints:** Mobile · Tablet Portrait · Tablet Landscape

| Breakpoint | Size | Weight | Line Height |
|---|---|---|---|
| Desktop | 16px | 500 | 1.5 |
| Tablet Portrait | 15px | 500 | 1.5 |
| Mobile | 14px | 500 | 1.5 |

**Usage:** Primary navigation links in the header menu.

**Accessibility:**
- Navigation items must be wrapped in `<nav>` with `aria-label="Main navigation"`
- Active item should have `aria-current="page"`
- Focus ring must be visible — never hide `outline` without custom replacement
- Touch target minimum: 44×44px (WCAG 2.5.5)

---

## Scale 09 — Form Element: Label

**Figma token:** `Label/Default`

| Property | Value |
|---|---|
| Font | Mulish |
| Size | 14px |
| Weight | 500 Medium |
| Line Height | 1.286 |

**Usage:** `<label>` element, always paired with an input via `htmlFor`.

**Accessibility:** Never use `placeholder` as a substitute for a visible label.

---

## Scale 10 — Form Element: Value

| Property | Value |
|---|---|
| Size | 14px |
| Weight | 400 Regular |
| Line Height | 1.286 |

**Usage:** Text content typed inside input fields.

---

## Scale 11 — Form Element: Button Text

**Figma token:** `Button/Default`

| Property | Value |
|---|---|
| Font | Mulish |
| Size | 14px |
| Weight | 500 Medium |
| Line Height | 1.286 |

---

## Scale 12 — Form Element: Support Text

**Also covers:** Helper text · Error messages · Alert text · Notification text

| Property | Value |
|---|---|
| Size | 12px |
| Weight | 400 Regular |
| Line Height | 1.5 |

**Usage:** Appears below form inputs. Color changes by context: default `--mcm-gray`, error `--color-error`.

**Accessibility:** Link to input via `aria-describedby`. Error messages use `aria-live="polite"` or `role="alert"`.

---

## Scale 13 — Form Element: Tag Text

**Also covers:** Badge text · Chip text · Pill text

| Property | Value |
|---|---|
| Size | 12px |
| Weight | 600 Semibold |
| Line Height | 1 (none) |

**Usage:** Inside `<Badge>`, `<Chip>`, `<Tag>` components. Compact, high-density labels.

---

## Dev Mode — How to use (all typography)

1. Open **MCM - DS - Foundation** → **Typography** canvas
2. Toggle **Dev Mode** (top-right button)
3. Click any text sample → **Inspect** panel shows: `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`
4. **Variables** panel → shows the token name the style references
5. **Copy** button → copies CSS or code snippet for the selected style
6. Use the breadcrumb trail to navigate between the 13 sections

---

## React / Tailwind usage

```tsx
// All typography tokens are in tailwind.config.js
// Install Mulish from Google Fonts:
// <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500;600;700&display=swap" rel="stylesheet">

// Headings
<h1 className="font-sans text-h1 font-medium tracking-tight">Page Title</h1>
<h2 className="font-sans text-subh1 font-semibold">Section</h2>
<h3 className="font-sans text-subh2 font-semibold">Subsection</h3>

// Body
<p className="font-sans text-body text-mcm-gray leading-relaxed">Content</p>

// Overline
<span className="font-sans text-overline font-bold tracking-widest uppercase text-mcm-blue-light">
  Category
</span>

// Caption
<figcaption className="font-sans text-caption text-mcm-gray">Image description</figcaption>

// Form elements
<label className="font-sans text-label font-medium">Email</label>
<p className="font-sans text-support text-semantic-error">This field is required.</p>
<span className="font-sans text-tag font-semibold">New</span>
```
