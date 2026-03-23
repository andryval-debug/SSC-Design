# Screen — Disclosure

**Source:** MCM - SSC / Disclosure screen
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

A legal disclosure screen presented before a user can proceed to accept an offer. Contains scrollable legal text with a mandatory read-to-bottom gate before the "Accept" CTA becomes enabled. Used in the offer acceptance flow.

---

## Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | 1440px | Centered content, max-width 720px, header + scrollable body + sticky footer |
| Tablet Landscape | 1024px | Same layout, reduced side padding |
| Tablet Portrait | 768px | Full-width with 32px side padding |
| Mobile | 375px | Full-width, 16px padding, footer CTA fixed at bottom |

---

## Components used

| Component | Purpose |
|---|---|
| `ScrollArea` | Scrollable legal text container |
| `Button` (Default, disabled) | "Accept" CTA — disabled until scroll reaches bottom |
| `Button` (Ghost) | "Decline" secondary action |
| `Separator` | Divides sections within disclosure text |
| `Progress` | Optional: shows how far the user has scrolled |

---

## Key styles

- Page background: `#FFFFFF`
- Disclosure text: Mulish 14px, `color: #555555` (`--mcm-gray`), `line-height: 1.6`
- Scroll container: `height: calc(100vh - 200px)`, `overflow-y: auto`
- Footer bar: `background: #FFFFFF`, `border-top: 1px solid #E4E4E7`, `padding: 16px 24px`
- "Accept" button (disabled): `opacity: 0.5`, `cursor: not-allowed`
- "Accept" button (enabled): `background: #133B62` (`--mcm-blue`)
- Section headings inside text: Mulish 500 16px

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Disclosure** frame → Dev Mode
2. Select the scroll container → inspect height, overflow, padding
3. Select the footer CTA bar → inspect position (`sticky bottom-0`), border-top
4. Check both disabled and enabled states of the Accept button
5. Inspect mobile frame for the fixed footer behavior

---

## Scroll-gate logic

The "Accept" button unlocks only when the user has scrolled to ≥ 95% of the disclosure content.

```tsx
function useScrollGate(ref: React.RefObject<HTMLDivElement>) {
  const [unlocked, setUnlocked] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el
      if (scrollTop + clientHeight >= scrollHeight * 0.95) setUnlocked(true)
    }
    el.addEventListener("scroll", onScroll)
    return () => el.removeEventListener("scroll", onScroll)
  }, [ref])
  return unlocked
}
```

---

## Accessibility

- `<main>` landmark wraps the full screen
- `<h1>` states the disclosure title (e.g., "Terms of Settlement Offer")
- The scroll container has `tabindex="0"` so keyboard users can scroll via arrow keys / Page Up/Down
- `aria-label="Disclosure text — scroll to the bottom to enable Accept"` on the scroll container
- When unlocked: `aria-disabled` removed from Accept button; announce with `aria-live="polite"` "You may now accept the offer"
- "Decline" is always enabled — users must not be trapped
- Section headings use `<h2>` within the legal text for skip navigation
- All links in legal text are underlined and meet 4.5:1 contrast
- Avoid time limits on reading; if a session timeout is possible, warn with 2-minute notice

---

## React

```tsx
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export function DisclosureScreen({ onAccept, onDecline, disclosureText }) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const unlocked = useScrollGate(scrollRef)

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 max-w-[720px] mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-medium mb-6">Disclosure</h1>

        <div
          ref={scrollRef}
          tabIndex={0}
          aria-label="Disclosure text — scroll to the bottom to enable Accept"
          className="h-[calc(100vh-220px)] overflow-y-auto border rounded-md p-6 text-sm text-mcm-gray leading-relaxed focus:outline-none focus:ring-2 focus:ring-mcm-blue"
        >
          {disclosureText}
        </div>

        {!unlocked && (
          <p aria-live="polite" className="text-xs text-mcm-gray mt-2">
            Please scroll to the bottom to continue.
          </p>
        )}
        {unlocked && (
          <p aria-live="polite" className="sr-only">
            You may now accept the offer.
          </p>
        )}
      </div>

      <footer className="sticky bottom-0 border-t border-[#E4E4E7] bg-white px-4 py-4">
        <div className="max-w-[720px] mx-auto flex gap-3 justify-end">
          <Button variant="ghost" onClick={onDecline}>Decline</Button>
          <Button
            disabled={!unlocked}
            aria-disabled={!unlocked}
            onClick={onAccept}
            className="bg-mcm-blue hover:bg-mcm-blue/90"
          >
            Accept
          </Button>
        </div>
      </footer>
    </main>
  )
}
```
