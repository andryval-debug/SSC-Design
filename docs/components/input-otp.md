# Component — Input OTP

**Source:** MCM - DS / Input OTP canvas (node `76:89`)
**shadcn/ui:** `input-otp` (via `input-otp` package)

---

## Description

A one-time password input field composed of individual character slots. Used for verification codes (SMS, email, authenticator apps).

---

## Variants

| Property | Values |
|---|---|
| Length | 4 · 6 digits |
| Separator | None · Dash in middle |
| State | Empty · Partial · Complete · Error |

---

## Key styles

- Slot size: 40×40px (default), `border: 1px solid #E4E4E7`, `border-radius: 6px`
- Active slot (focused): `border-color: #0069AA`, `ring: 2px #0069AA`
- Filled slot: `background: #F4F4F5`, font Mulish 500 16px
- Error state: `border-color: #D32F2F`
- Separator dash: `color: #A1A1AA`

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Input OTP** canvas → Dev Mode
2. Select individual slot → Inspect: size, border, border-radius
3. Check active/filled states for border and background changes

---

## Accessibility

- **`<input type="text" inputMode="numeric" pattern="[0-9]*">`** (or `type="tel"`) on each slot — or a single hidden `<input>` with the composed group as visual only
- **`aria-label`** on the group: `"One-time password, 6 digits"`
- **`autocomplete="one-time-code"`** on the input for browser/SMS autofill support
- **Auto-advance:** Focus should move automatically to the next slot after each digit entry
- **Paste support:** Pasting a full code should fill all slots
- Screen reader should announce: "Enter digit 1 of 6", "Enter digit 2 of 6", etc.

---

## React (shadcn/ui)

```bash
npm install input-otp
npx shadcn-ui@latest add input-otp
```

```tsx
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"

// 6-digit with separator
<InputOTP maxLength={6} aria-label="One-time password">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>

// With SMS autofill
<InputOTP maxLength={6} autoComplete="one-time-code">
  <InputOTPGroup>
    {[0,1,2,3,4,5].map(i => <InputOTPSlot key={i} index={i} />)}
  </InputOTPGroup>
</InputOTP>
```
