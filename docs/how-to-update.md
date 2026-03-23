# How to Update This Documentation

This file documents the exact prompts and workflow used to generate all documentation in this repository. Use it to regenerate, extend, or update the docs when the Figma files change.

---

## Prerequisites

- Access to **Claude Code** (CLI) with the **Figma MCP** plugin configured
- Read access to the three Figma files below
- The Figma MCP tool available in your Claude session: `mcp__Andryta_MCP__get_figma_data`

---

## The three Figma files

| File | Key | Node |
|---|---|---|
| MCM - DS - Foundation | `Cb1GVguOWBkTsRX4fhXpnX` | `0-1` |
| MCM - DS | `WdJMRYrJVq6qNNTugSQyNM` | `10299-2078` |
| MCM - SSC | `IshU3hueKvtEaZhTymMLIx` | `40000239-2` |

---

## Step 1 — Verify Figma access

Send these three prompts one at a time at the start of a new session to confirm MCP access:

```
check access to file https://www.figma.com/design/Cb1GVguOWBkTsRX4fhXpnX/MCM---DS---Foundation?node-id=0-1&t=kUhE6vEwNC6ODMAM-1
```

```
check access to file https://www.figma.com/design/WdJMRYrJVq6qNNTugSQyNM/MCM---DS?node-id=10299-2078&t=5EiIp91R2EFc7Ck8-1
```

```
check access to https://www.figma.com/design/IshU3hueKvtEaZhTymMLIx/MCM---SSC?node-id=40000239-2&t=Ub2Bdm6uHvt24FTk-1
```

All three should respond with confirmation that the file is accessible and list the top-level canvas names.

---

## Step 2 — Set role and task context

Send this prompt once to set the full scope for the session:

```
His role is that of a product designer specializing in AI. His task is to guide me step by step
in creating documentation consisting of three files: Foundation, Design System, and Designs.
Documentation for each element: how to use development mode, description, and accessibility.
Create the variable elements of the Foundation, components of the Design System and screens in
React, or suggest alternatives to update automatically react elements with figma.
Use the 3 files tested before.
```

Claude will propose options. Select the one that covers both Foundation tokens and DS components.

---

## Step 3 — Foundation tokens

Send this prompt to extract all Foundation tokens (colors + typography):

```
Deep-dive the Foundation colors and typography to extract all values.
Use mulish as main font family.
```

This generates:
- `tokens/colors.css` — 17 CSS custom properties
- `tokens/typography.css` — 13-scale type system with all breakpoints
- `tokens/tailwind.config.js` — Tailwind theme extension
- `tokens/tokens.json` — W3C Design Token format for Style Dictionary
- `docs/foundation-colors.md`
- `docs/foundation-typography.md`

**Important:** Always specify "use mulish as main font family" — the Foundation file may return Roboto as the base font, but MCM DS uses Mulish (confirmed in Button/Default and Label/Default component tokens in the DS file).

---

## Step 4 — All DS components

Send this prompt to generate all component documentation:

```
Finish with all tokens from foundation and all DS components from Design System.
```

This generates one `.md` file per component in `docs/components/`. The full component list as of the initial generation:

`accordion` · `alert` · `alert-dialog` · `aspect-ratio` · `avatar` · `badge` · `breadcrumb` · `button` · `calendar` · `card` · `carousel` · `chart` · `checkbox` · `collapsible` · `combobox` · `command` · `context-menu` · `data-table` · `date-picker` · `dialog` · `drawer` · `dropdown-menu` · `form` · `hover-card` · `input` · `input-otp` · `label` · `menubar` · `navigation-menu` · `pagination` · `popover` · `progress` · `radio-group` · `resizable` · `scroll-area` · `select` · `separator` · `sheet` · `sidebar` · `skeleton` · `slider` · `switch` · `table` · `tabs` · `textarea` · `toast` · `toggle` · `toggle-group` · `tooltip`

Each file follows this template:

```
# Component — [Name]

Source: MCM - DS / [Canvas name] (node [id])
shadcn/ui: [package name]

## Description
## Variants (if applicable)
## States (if applicable)
## Key styles
## Dev Mode (Figma)
## Accessibility
## React (install command + code example)
```

---

## Step 5 — SSC Screens

Send this prompt to generate all screen documentation:

```
Now document all screens from the MCM - SSC file. For each screen include:
description, breakpoints (375px / 768px / 1024px / 1440px), components used,
key styles, Dev Mode instructions, accessibility requirements, and a React implementation.

Screens to document:
- Login
- Disclosure
- Modal: Ineligible Account
- Modal: Terms and Conditions
- Account Summary
- Custom Offers
- Marketing Offers
- One-Time Payment (all 4 breakpoints)
- Skeleton (loading state)
- Error (all error types)
- Header
- Footer
- DX API: Account Info
- DX API: Offers
- Offer Recommendation Page
```

Files are created in `docs/screens/`.

---

## How to update a single component or screen

If a component changes in Figma, send a targeted prompt:

```
Update the documentation for the [component name] component.
Fetch the latest styles from MCM - DS node [node-id] and update docs/components/[component].md.
```

If a screen changes:

```
Update the documentation for the [screen name] screen.
Fetch the latest layout from MCM - SSC and update docs/screens/[screen].md.
```

---

## How to add a new component

```
Document the new [component name] component from MCM - DS.
Follow the same template as existing component docs.
Create docs/components/[component-name].md.
```

---

## Known issues and workarounds

### MCP tool unavailable mid-session
If `mcp__Andryta_MCP__get_figma_data` drops during a long session, Claude will switch to using the already-extracted data + the confirmed shadcn/ui architecture. The output remains accurate because the MCM DS is 1:1 based on shadcn/ui.

**Fix:** Start a new Claude Code session and re-verify access with Step 1 before continuing.

### DS file response too large
Fetching the full MCM DS file at `depth: 2` may exceed token limits. If this happens:

```
Save the full DS file JSON to disk, then extract canvas names and component nodes using a python script.
```

### Font family shows as Roboto
If token files are generated with Roboto instead of Mulish, send:

```
Update all token files to use Mulish as the font family. Confirm from the Button/Default and Label/Default component tokens in the DS file.
```

### Agents cannot access MCP tools
Do not use `Agent` sub-tasks to fetch Figma data — agents do not have access to MCP tools. All `mcp__Andryta_MCP__get_figma_data` calls must be made in the main conversation.

---

## Token pipeline (for developers)

```
Figma (Foundation file)
  → Tokens Studio plugin (syncs to GitHub)
    → tokens.json (W3C format)
      → Style Dictionary
        → tokens/colors.css
        → tokens/typography.css
        → tokens/tailwind.config.js
```

Install commands:
```bash
# Tokens Studio: install as Figma plugin from the Figma Community
# Style Dictionary:
npm install -D style-dictionary
```

---

## File structure

```
mcm-design-tokens/
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── tailwind.config.js
│   └── tokens.json
├── docs/
│   ├── how-to-update.md       ← this file
│   ├── foundation-colors.md
│   ├── foundation-typography.md
│   ├── components/
│   │   └── [50 component files]
│   └── screens/
│       └── [15 screen files]
└── README.md
```
