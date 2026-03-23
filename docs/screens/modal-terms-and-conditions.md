# Screen — Modal: Terms and Conditions

**Source:** MCM - SSC / Modals / Terms and Conditions
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

A modal dialog that presents the full Terms and Conditions before a user finalizes acceptance of a settlement offer. Contains scrollable legal content with "Accept" and "Decline" actions. Differs from the Disclosure screen in that it appears as an overlay rather than a full page.

---

## Breakpoints

| Breakpoint | Modal width | Modal height |
|---|---|---|
| Desktop 1440px | 640px | 80vh, scrollable |
| Tablet Landscape 1024px | 600px | 80vh |
| Tablet Portrait 768px | 90vw | 80vh |
| Mobile 375px | 100vw | Full screen (sheet behavior) |

---

## Components used

| Component | Purpose |
|---|---|
| `Dialog` | Modal shell |
| `DialogContent` | Container with focus trap |
| `DialogHeader` | Title area |
| `DialogTitle` | "Terms and Conditions" |
| `ScrollArea` | Scrollable T&C body |
| `DialogFooter` | Accept / Decline actions |
| `Button` (Default) | "Accept" — enabled after scroll gate |
| `Button` (Ghost) | "Decline" |
| `Separator` | Between sections |

---

## Key styles

- Overlay: `rgba(0, 0, 0, 0.5)`
- Modal: `background: #FFFFFF`, `border-radius: 8px`, `padding: 0` (header/footer have own padding)
- Header: `padding: 24px 24px 0`
- Scroll body: `height: calc(80vh - 140px)`, `padding: 16px 24px`
- Footer: `padding: 16px 24px`, `border-top: 1px solid #E4E4E7`
- Body text: Mulish 14px, `color: #555555`, `line-height: 1.6`
- Section headings: Mulish 500 16px

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Modals** → **Terms and Conditions** → Dev Mode
2. Select DialogContent → inspect max-width, border-radius, padding breakdown
3. Select the scroll body area → confirm height and overflow
4. Check the footer CTA bar — Accept button disabled vs enabled states
5. Inspect the mobile full-screen variant

---

## Scroll-gate logic

Same pattern as the Disclosure screen — the "Accept" button is disabled until the user scrolls to ≥ 95% of the T&C content.

See `useScrollGate` hook in [disclosure.md](./disclosure.md).

---

## Accessibility

- `role="dialog"` with `aria-modal="true"` (handled by `Dialog`)
- `aria-labelledby` → DialogTitle id
- **Focus trap:** Tab cycles within the modal only
- **Escape key:** Closes the modal and treats as "Decline" — warn the user before dismissing if they haven't explicitly accepted
- The scroll container has `tabindex="0"` for keyboard scroll + `aria-label="Terms and conditions text"`
- `aria-live="polite"` announces when Accept becomes available
- "Decline" is always enabled — do not gate the exit
- Heading structure within T&C text uses `<h2>`/`<h3>` for skip navigation
- Close (×) button: `aria-label="Close terms and conditions"`

---

## React

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function TermsAndConditionsModal({ open, onAccept, onDecline, termsContent }) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const unlocked = useScrollGate(scrollRef)

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onDecline()}>
      <DialogContent className="max-w-[640px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>

        <div
          ref={scrollRef}
          tabIndex={0}
          aria-label="Terms and conditions text — scroll to the bottom to enable Accept"
          className="overflow-y-auto h-[calc(80vh-140px)] px-6 py-4 text-sm text-mcm-gray leading-relaxed focus:outline-none focus:ring-2 focus:ring-mcm-blue focus:ring-inset"
        >
          {termsContent}
        </div>

        {!unlocked && (
          <p className="text-xs text-mcm-gray px-6 pb-2">
            Scroll to the bottom to enable Accept.
          </p>
        )}
        {unlocked && (
          <span aria-live="polite" className="sr-only">
            You may now accept the terms.
          </span>
        )}

        <Separator />
        <DialogFooter className="px-6 py-4">
          <Button variant="ghost" onClick={onDecline}>Decline</Button>
          <Button
            disabled={!unlocked}
            aria-disabled={!unlocked}
            onClick={onAccept}
            className="bg-mcm-blue hover:bg-mcm-blue/90"
          >
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```
