# Screen — Login

**Source:** MCM - SSC / Login screen
**Figma file:** MCM - SSC (IshU3hueKvtEaZhTymMLIx)

---

## Description

The entry point for authenticated users. Collects credentials (username + password) and routes to Account Summary on success. Includes a "Forgot password?" recovery link and branding header.

---

## Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | 1440px | Centered card, max-width 480px, full-page background |
| Tablet Landscape | 1024px | Same centered card layout, slightly reduced margins |
| Tablet Portrait | 768px | Full-width card with side padding 32px |
| Mobile | 375px | Full-width, padding 16px, stacked vertically |

---

## Components used

| Component | Purpose |
|---|---|
| `Input` | Username and password fields |
| `Label` | Field labels (`htmlFor` required) |
| `Button` (Default) | "Log In" primary CTA |
| `Button` (Ghost/Link) | "Forgot password?" secondary action |
| `Form` | react-hook-form + zod validation wrapper |
| `Alert` (Destructive) | Error state: invalid credentials message |

---

## Key styles

- Page background: `#EDEDF2` (`--mcm-gray-bg`)
- Card: `background: #FFFFFF`, `border-radius: 8px`, `padding: 40px` (desktop) / `24px` (mobile)
- Logo: MCM logo centered above the card, `height: 48px`
- Input error state: border `#D32F2F`, error message text `12px` below field
- "Log In" button: full-width, `background: #133B62` (`--mcm-blue`)

---

## Dev Mode (Figma)

1. Open **MCM - SSC** → **Login** frame → Dev Mode
2. Select the card container → inspect `border-radius`, `padding`, `box-shadow`
3. Select the Input components → confirm height `40px`, border color `#E4E4E7`
4. Toggle the error state variant → inspect Alert color and positioning
5. Check the mobile frame for stacking order and padding changes

---

## Validation rules

| Field | Rule |
|---|---|
| Username | Required, min 3 chars |
| Password | Required, min 8 chars |

```tsx
const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})
```

---

## Accessibility

- `<main>` landmark wraps the login card
- `<h1>` "Log In" as the page heading
- All inputs have associated `<label>` via `htmlFor`
- Error messages are linked to inputs via `aria-describedby`
- Invalid state: `aria-invalid="true"` on the input, `role="alert"` on the error message
- "Forgot password?" link has descriptive text — not just "click here"
- **Keyboard:** Tab through fields → Enter submits the form
- Password field: include a show/hide toggle with `aria-label="Show password"` / `"Hide password"`
- Focus returns to the first error field after a failed submission
- No CAPTCHA without an accessible alternative

---

## React

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

const loginSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export function LoginScreen() {
  const form = useForm({ resolver: zodResolver(loginSchema) })
  const [serverError, setServerError] = React.useState("")

  async function onSubmit(values) {
    const result = await signIn(values)
    if (!result.ok) setServerError("Invalid username or password.")
  }

  return (
    <main className="min-h-screen bg-mcm-gray-bg flex items-center justify-center px-4">
      <div className="w-full max-w-[480px] bg-white rounded-lg p-10 shadow-sm">
        <img src="/mcm-logo.svg" alt="MCM" className="h-12 mx-auto mb-8" />
        <h1 className="text-xl font-medium text-center mb-6">Log In</h1>

        {serverError && (
          <Alert variant="destructive" className="mb-4" role="alert">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
            <FormField name="username" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="password" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" autoComplete="current-password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <Button type="submit" className="w-full bg-mcm-blue hover:bg-mcm-blue/90">
              Log In
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-sm text-mcm-blue-light hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </main>
  )
}
```
