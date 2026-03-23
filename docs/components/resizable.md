# Component — Resizable

**Source:** MCM - DS / Resizable canvas (node `296:243`)
**shadcn/ui:** `resizable` (via `react-resizable-panels`)

---

## Description

A layout component that creates resizable panels divided by draggable handles. Used for split-view layouts, side-by-side editors, or adjustable sidebars.

---

## Key styles

| Element | Value |
|---|---|
| Handle width (vertical split) | 4px |
| Handle height (horizontal split) | 4px |
| Handle color | `#E4E4E7` |
| Handle hover | `#0069AA` |
| Handle grip icon | 4 dots, `color: #A1A1AA` |
| Cursor | `col-resize` (vertical) / `row-resize` (horizontal) |

---

## Accessibility

- Handle: `role="separator"` with `aria-orientation`
- **`aria-valuenow`** on the handle showing current split percentage
- **`aria-valuemin="0"` and `aria-valuemax="100"`**
- **Keyboard:** `Left`/`Right` (or `Up`/`Down`) arrows resize by increments · `Home`/`End` jump to min/max
- `aria-label="Resize panels"` on the handle

---

## React

```bash
npm install react-resizable-panels
npx shadcn-ui@latest add resizable
```

```tsx
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal" className="min-h-[400px] rounded-lg border">
  <ResizablePanel defaultSize={25} minSize={15}>
    <div className="p-4">
      <h3 className="font-medium">Navigation</h3>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle aria-label="Resize navigation panel" />
  <ResizablePanel defaultSize={75}>
    <div className="p-4">
      <h3 className="font-medium">Content</h3>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
```
