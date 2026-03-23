# Component — Form

**Source:** MCM - DS / Form canvas (node `60:290`)
**shadcn/ui:** `form` (built on `react-hook-form` + `zod`)

---

## Description

A form composition system providing validation, error messaging, and accessible field wrappers. Not a visual component by itself — wraps Input, Select, Checkbox, etc. with consistent validation patterns.

---

## Structure

```
Form
└── FormField (react-hook-form Controller)
    └── FormItem
        ├── FormLabel         ← Scale 09 — Label/Default
        ├── FormControl       ← wraps Input, Select, etc.
        ├── FormDescription   ← Scale 12 — Support Text
        └── FormMessage       ← Scale 12 — error, color: --color-error
```

---

## Key styles

- `FormLabel`: Mulish 500, 14px — color: `#18181B` · error state: `#D32F2F`
- `FormDescription`: 12px Regular, color: `#71717A`
- `FormMessage`: 12px Regular, color: `#D32F2F`
- `FormItem` gap: `4px` between label, control, and message

---

## Dev Mode (Figma)
1. Open **MCM - DS** → **Form** canvas → Dev Mode
2. Select a form field group → Inspect: gap between label/input/helper, error color
3. Check error state: input border changes to `--color-error`, message appears below

---

## Accessibility

- Each field has `<label>` linked to its control via `htmlFor` / `id`
- Error messages linked to their input via `aria-describedby`
- `aria-invalid="true"` on invalid inputs
- `aria-required="true"` on required fields
- Use `<fieldset>` + `<legend>` for groups of related inputs (e.g. checkboxes)
- Live validation feedback uses `aria-live="polite"` to not interrupt mid-typing

---

## React (shadcn/ui)

```bash
npm install react-hook-form zod @hookform/resolvers
npx shadcn-ui@latest add form input
```

```tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

export function PaymentForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)} className="space-y-6">
        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email address</FormLabel>
            <FormControl>
              <Input type="email" placeholder="you@example.com" {...field} />
            </FormControl>
            <FormDescription>We'll send your receipt here.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```
