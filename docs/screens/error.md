# Screen — Error

**Source:** MCM - SSC / Error screen
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

A full-page error screen displayed when a critical failure occurs — session expiry, API unavailability, unhandled exceptions, or 404/500 HTTP errors. Provides clear messaging and recovery options (retry, go home, contact support).

---

## Error types

| Type | Trigger | Primary CTA |
|---|---|---|
| Session expired | JWT expiry / auth timeout | "Log In Again" |
| Service unavailable | API 503 / network failure | "Try Again" |
| Not found | 404 route / missing resource | "Go to Home" |
| Generic error | Unhandled exception | "Try Again" or "Contact Support" |
| Payment failed | Transaction declined | "Try a Different Method" |

---

## Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | 1440px | Centered card, max-width 480px, full-page background |
| Tablet Landscape | 1024px | Same centered layout |
| Tablet Portrait | 768px | Full-width with 32px padding |
| Mobile | 375px | Full-width, 16px padding |

---

## Components used

| Component | Purpose |
|---|---|
| `Alert` (Destructive) | Inline error message variant |
| `Button` (Default) | Primary recovery CTA |
| `Button` (Ghost) | Secondary action (e.g., "Contact Support") |
| `Card` | Error content container (for inline variants) |

---

## Key styles

- Page background: `#EDEDF2`
- Error card: `background: #FFFFFF`, `border-radius: 8px`, `padding: 48px 40px`, centered
- Error icon: `color: #D32F2F`, 64px, centered
- Error heading: Mulish 500 24px `#18181B`
- Error description: Mulish 400 14px `#555555`, centered, max-width 320px
- Primary CTA: `background: #133B62`, `width: 200px`, centered
- "Contact Support" link: `color: #0069AA` (`--mcm-blue-light`)

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Error** frame → Dev Mode
2. Inspect the icon size and color
3. Check text alignment (centered vs left)
4. Inspect button width and centering
5. Check mobile frame for padding adjustments

---

## Accessibility

- `<main>` landmark with `aria-label="Error — [error type]"`
- `<h1>` states the error heading (e.g., "Session Expired", "Something Went Wrong")
- Error icon: `aria-hidden="true"` — the heading conveys the meaning
- Description text is visible and meets contrast (4.5:1 on white background)
- Primary CTA receives focus on page load via `autoFocus` or `useEffect` focus call
- Avoid vague messages like "Error 500" alone — always include a plain-language explanation
- Include a "Contact Support" option when the user cannot self-resolve
- For inline API errors (not full page): use `role="alert"` so screen readers announce immediately
- Session expiry: if a timeout is approaching, warn with 2-minute advance notice (`aria-live="assertive"`)
- After "Try Again": announce result — success or new error — via `aria-live`

---

## React

```tsx
import { Button } from "@/components/ui/button"
import { AlertCircle, WifiOff, FileQuestion } from "lucide-react"
import { useRouter } from "next/navigation"

type ErrorType = "session-expired" | "service-unavailable" | "not-found" | "payment-failed" | "generic"

interface ErrorScreenProps {
  type?: ErrorType
  message?: string
  onRetry?: () => void
}

const errorConfig: Record<ErrorType, {
  icon: React.ComponentType<{ className?: string }>
  heading: string
  description: string
  primaryLabel: string
  primaryAction: "retry" | "login" | "home"
}> = {
  "session-expired": {
    icon: AlertCircle,
    heading: "Session Expired",
    description: "Your session has timed out for security. Please log in again to continue.",
    primaryLabel: "Log In Again",
    primaryAction: "login",
  },
  "service-unavailable": {
    icon: WifiOff,
    heading: "Service Unavailable",
    description: "We're having trouble connecting to our servers. Please try again in a moment.",
    primaryLabel: "Try Again",
    primaryAction: "retry",
  },
  "not-found": {
    icon: FileQuestion,
    heading: "Page Not Found",
    description: "The page you're looking for doesn't exist or may have moved.",
    primaryLabel: "Go to Home",
    primaryAction: "home",
  },
  "payment-failed": {
    icon: AlertCircle,
    heading: "Payment Failed",
    description: "We couldn't process your payment. Please check your payment method and try again.",
    primaryLabel: "Try a Different Method",
    primaryAction: "retry",
  },
  "generic": {
    icon: AlertCircle,
    heading: "Something Went Wrong",
    description: "An unexpected error occurred. Our team has been notified.",
    primaryLabel: "Try Again",
    primaryAction: "retry",
  },
}

export function ErrorScreen({ type = "generic", message, onRetry }: ErrorScreenProps) {
  const router = useRouter()
  const config = errorConfig[type]
  const Icon = config.icon

  const primaryButtonRef = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => { primaryButtonRef.current?.focus() }, [])

  function handlePrimary() {
    if (config.primaryAction === "retry" && onRetry) onRetry()
    else if (config.primaryAction === "login") router.push("/login")
    else if (config.primaryAction === "home") router.push("/")
  }

  return (
    <main
      aria-label={`Error — ${config.heading}`}
      className="min-h-screen bg-mcm-gray-bg flex items-center justify-center px-4"
    >
      <div className="w-full max-w-[480px] bg-white rounded-lg p-12 text-center shadow-sm">
        <Icon
          className="w-16 h-16 text-[#D32F2F] mx-auto mb-6"
          aria-hidden="true"
        />
        <h1 className="text-2xl font-medium mb-3">{config.heading}</h1>
        <p className="text-sm text-mcm-gray max-w-[320px] mx-auto mb-8">
          {message ?? config.description}
        </p>
        <div className="flex flex-col gap-3 items-center">
          <Button
            ref={primaryButtonRef}
            className="bg-mcm-blue hover:bg-mcm-blue/90 min-w-[200px]"
            onClick={handlePrimary}
          >
            {config.primaryLabel}
          </Button>
          <Button variant="ghost" asChild>
            <a href="mailto:support@mcm.com" className="text-mcm-blue-light">
              Contact Support
            </a>
          </Button>
        </div>
      </div>
    </main>
  )
}
```
