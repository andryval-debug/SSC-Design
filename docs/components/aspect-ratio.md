# Component — Aspect Ratio

**Source:** MCM - DS / Aspect Ratio canvas (node `21:535`)
**shadcn/ui:** `aspect-ratio` (via `@radix-ui/react-aspect-ratio`)

---

## Description

A utility component that constrains a child element to a specific width-to-height ratio. Used for images, video embeds, map previews, and media cards to maintain consistent proportions across breakpoints.

---

## Common ratios

| Ratio | Use case |
|---|---|
| `16 / 9` | Video embeds, hero banners |
| `4 / 3` | Product images, thumbnails |
| `1 / 1` | Avatar images, square cards |
| `3 / 2` | Offer card images |
| `21 / 9` | Wide cinematic banners |

---

## Key styles

| Element | Value |
|---|---|
| Container | `position: relative`, `width: 100%` |
| Inner (Radix) | `position: absolute`, `inset: 0` |
| Content | `width: 100%`, `height: 100%`, `object-fit: cover` |
| Border radius | Inherited from parent (typically `border-radius: 8px`) |

---

## Dev Mode (Figma)

1. Open **MCM - DS** → **Aspect Ratio** canvas → Dev Mode
2. Select the frame wrapping the image/media element
3. Note the frame width — the height is computed (`width ÷ ratio`)
4. Check `object-fit` and overflow handling on the child image

---

## Accessibility

- The `AspectRatio` wrapper is purely layout — it carries no semantic meaning
- Always provide `alt` text on `<img>` elements inside the ratio container
- For decorative images: `alt=""` to suppress screen reader announcement
- For video embeds: include `<title>` inside the `<iframe>` and a visible caption or `aria-label`
- Never place interactive controls solely inside the ratio container without ensuring they are keyboard accessible
- Ensure media content meets color contrast if overlaid with text (minimum 4.5:1 WCAG AA)

---

## React

```bash
npx shadcn-ui@latest add aspect-ratio
```

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"

// Image with 16:9 ratio
<div className="w-full max-w-lg">
  <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
    <img
      src="/offer-banner.jpg"
      alt="Special offer: 0% APR for 12 months"
      className="h-full w-full object-cover"
    />
  </AspectRatio>
</div>

// Video embed
<div className="w-full">
  <AspectRatio ratio={16 / 9}>
    <iframe
      src="https://www.youtube.com/embed/..."
      title="MCM account overview video"
      className="h-full w-full rounded-lg"
      allowFullScreen
    />
  </AspectRatio>
</div>

// Square offer card image
<AspectRatio ratio={1 / 1} className="overflow-hidden rounded-md bg-mcm-gray-bg">
  <img src="/offer-thumbnail.jpg" alt="Cash back offer" className="object-cover" />
</AspectRatio>
```
