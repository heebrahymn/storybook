# Lovable / Bolt Prompt
# `@ayo-ui/react` — Public React Component Library

> **Use this prompt in:** [Lovable](https://lovable.dev) · [Bolt](https://bolt.new)
> **Source:** IMPLEMENTATION_PLAN.md
> **Date:** 2026-05-15

---

## 📋 How to Use This File

- **Lovable:** Paste the **Master Prompt** into the chat input on lovable.dev to generate the full project scaffold
- **Bolt:** Paste the **Master Prompt** into bolt.new to generate the project in a StackBlitz environment
- Use the **Phase Prompts** as follow-up messages to build each phase incrementally
- Copy one prompt at a time — do not paste all phases at once

---

## 🚀 Master Prompt (Paste First)

```
Build a public npm-installable React 18 component library called @ayo-ui/react.

TECH STACK:
- React 18 + TypeScript 5 (strict mode)
- tsup for building (ESM + CJS dual output)
- Types via tsc --emitDeclarationOnly (NOT tsup dts — needed for generics)
- Vanilla CSS + CSS Modules (zero CSS-in-JS)
- CSS Custom Properties for the design token system (--ayo- prefix on all vars)
- Jest + React Testing Library + jest-axe + axe-core for testing (>85% coverage enforced)
- Storybook with @storybook/react-vite
- Changesets for versioning
- GitHub Actions for CI/CD

PACKAGE CONFIGURATION (package.json):
{
  "name": "@ayo-ui/react",
  "version": "0.0.0",
  "license": "MIT",
  "publishConfig": { "access": "public" },
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": { "import": "./dist/index.mjs", "require": "./dist/index.js", "types": "./dist/index.d.ts" },
    "./styles": "./dist/tokens.css"
  },
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
  "peerDependencies": { "react": ">=18.0.0", "react-dom": ">=18.0.0" }
}

PROJECT STRUCTURE:
src/
  components/         ← 14 components, each with Component.tsx, Component.test.tsx, Component.stories.tsx, Component.module.css
  tokens/tokens.css   ← All CSS custom properties (--ayo- prefix)
  hooks/useFocusTrap.ts
  hooks/useToast.ts
  ThemeProvider/ThemeProvider.tsx
  index.ts            ← Single barrel export
storybook/main.ts
storybook/preview.ts
.github/workflows/ci.yml
.github/workflows/release.yml
.changeset/config.json

UNIVERSAL COMPONENT RULES (every component must follow these):
1. Use forwardRef on all interactive elements
2. Spread ...rest onto the root DOM element
3. Set displayName explicitly
4. Accept and merge className prop without overriding library classes
5. Use only CSS custom properties — no hardcoded colours or pixel values
6. SSR-safe — no document/window access at render time

COMPONENTS TO BUILD (14 total):
Foundation: Button, Badge, Spinner, Avatar
Interaction: Input, Checkbox, Select, Tooltip, Toast
Showcase: Modal, Tabs, Accordion, Form, DataTable

DESIGN TOKEN PREFIX: All CSS custom properties use --ayo- prefix.
Token categories: Color Brand, Color Semantic, Color Neutral, Typography, Spacing, Border Radius, Shadows, Transitions, Z-Index.
Dark mode: automatic via @media (prefers-color-scheme: dark).

Start by scaffolding Phase 1: the complete project setup with all config files but no components yet. 
Make sure npm run build, npm test, and npm run storybook all work before adding any components.
```

---

## Phase Prompts (Use After Master Prompt)

### Phase 2 Prompt — Design Token System & ThemeProvider

```
Now implement Phase 2: Design Token System and ThemeProvider.

Create src/tokens/tokens.css with ALL of the following CSS custom properties using the --ayo- prefix:

COLOR BRAND:
--ayo-color-primary: #6366f1
--ayo-color-primary-hover: #4f46e5
--ayo-color-primary-active: #4338ca
--ayo-color-primary-subtle: #eef2ff

COLOR SEMANTIC:
--ayo-color-success: #22c55e
--ayo-color-warning: #f59e0b
--ayo-color-danger: #ef4444
--ayo-color-info: #3b82f6

COLOR NEUTRAL:
--ayo-color-text: #0f172a
--ayo-color-text-muted: #64748b
--ayo-color-border: #e2e8f0
--ayo-color-surface: #ffffff
--ayo-color-surface-raised: #f8fafc
--ayo-color-overlay: rgba(0,0,0,0.5)

TYPOGRAPHY:
--ayo-font-sans: 'Inter', system-ui, sans-serif
--ayo-font-mono: 'JetBrains Mono', monospace
--ayo-text-xs: 0.75rem  | --ayo-text-sm: 0.875rem | --ayo-text-md: 1rem
--ayo-text-lg: 1.125rem | --ayo-text-xl: 1.25rem
--ayo-font-normal: 400 | --ayo-font-medium: 500 | --ayo-font-semibold: 600 | --ayo-font-bold: 700

SPACING (4px scale):
--ayo-space-1: 0.25rem | --ayo-space-2: 0.5rem | --ayo-space-3: 0.75rem
--ayo-space-4: 1rem | --ayo-space-5: 1.25rem | --ayo-space-6: 1.5rem
--ayo-space-8: 2rem | --ayo-space-10: 2.5rem

BORDER RADIUS:
--ayo-radius-sm: 4px | --ayo-radius-md: 8px | --ayo-radius-lg: 12px
--ayo-radius-xl: 16px | --ayo-radius-full: 9999px

SHADOWS:
--ayo-shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--ayo-shadow-md: 0 4px 6px rgba(0,0,0,0.07)
--ayo-shadow-lg: 0 10px 15px rgba(0,0,0,0.10)
--ayo-shadow-xl: 0 20px 25px rgba(0,0,0,0.10)

TRANSITIONS:
--ayo-duration-fast: 100ms | --ayo-duration-normal: 200ms | --ayo-duration-slow: 300ms
--ayo-easing-default: cubic-bezier(0.4, 0, 0.2, 1)

Z-INDEX SCALE:
--ayo-z-dropdown: 1000 | --ayo-z-modal: 1100 | --ayo-z-toast: 1200 | --ayo-z-tooltip: 1300

DARK MODE — override these under @media (prefers-color-scheme: dark):
--ayo-color-text: #f1f5f9
--ayo-color-text-muted: #94a3b8
--ayo-color-border: #1e293b
--ayo-color-surface: #0f172a
--ayo-color-surface-raised: #1e293b
--ayo-color-overlay: rgba(0,0,0,0.7)

Then create src/ThemeProvider/ThemeProvider.tsx:
- Accepts a theme prop (AyoTheme interface) and children
- Uses useMemo to build a CSS variable map
- Renders a <div style={cssVars}> wrapper (NOT :root injection — must be scoped)
- TOKEN_MAP maps AyoTheme keys to --ayo- CSS variable names
- Export ThemeProvider and AyoTheme from src/index.ts

Write tests for ThemeProvider verifying CSS vars are injected on the wrapper div.
Add "./styles": "./dist/tokens.css" to the exports map in package.json.
```

---

### Phase 3 Prompt — Foundation Components

```
Now implement Phase 3: Foundation Components (Button, Badge, Spinner, Avatar).

BUTTON:
- ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>
- Props: variant ('solid'|'outline'|'ghost'), size ('sm'|'md'|'lg'), isLoading, leftIcon, rightIcon
- forwardRef to <button>
- aria-busy={isLoading}, aria-disabled={disabled || isLoading}
- All styles in Button.module.css using --ayo- CSS vars only
- Tests: rendering (variants, forwardRef, className merge), behaviour (onClick, disabled/loading block clicks), accessibility (axe passes all states, Tab + Enter keyboard)

BADGE:
- BadgeProps extends HTMLAttributes<HTMLSpanElement>
- Props: variant ('default'|'success'|'warning'|'danger'|'info'), size ('sm'|'md')
- forwardRef to <span>
- Tests: rendering all variants + axe passes

SPINNER:
- Props: size ('sm'|'md'|'lg'), label (string — for aria-label)
- role="status", aria-label from label prop
- CSS keyframe animation (spin) — no JS animation libraries
- Tests: renders correct size, role="status" present, axe passes

AVATAR:
- Props: src, alt, name (string — used for initials fallback), size ('sm'|'md'|'lg'|'xl'), shape ('circle'|'square')
- onError fallback: show initials extracted from name prop
- AvatarGroup sub-component: renders multiple avatars with negative margin overlap
- Tests: image renders, fallback to initials on error, group renders correctly, axe passes

All components exported from src/index.ts. All CSS in *.module.css using --ayo- tokens.
```

---

### Phase 4 Prompt — Interaction Components

```
Now implement Phase 4: Interaction Components (Input, Checkbox, Select, Tooltip, Toast).

INPUT:
- InputProps extends InputHTMLAttributes<HTMLInputElement>
- Additional props: hasError (boolean), prefixElement (ReactNode), suffixElement (ReactNode)
- forwardRef to <input>
- Visual states: default, focus, error, disabled — all via --ayo- CSS vars
- Tests: controlled value, error state adds class, prefix/suffix render, axe passes all states

CHECKBOX:
- CheckboxProps extends InputHTMLAttributes<HTMLInputElement> with indeterminate (boolean) and label (string)
- forwardRef to <input type="checkbox">
- Set indeterminate on the DOM node via useEffect(()=>{ ref.current.indeterminate = indeterminate }, [indeterminate])
- Associate visible label with input via htmlFor/id
- Tests: toggle checked, indeterminate DOM property set, label association, axe passes

SELECT:
- ARIA combobox pattern: role="combobox", aria-expanded, aria-controls, aria-activedescendant
- Keyboard: ArrowDown/Up moves highlight, Enter selects highlighted, Escape closes
- Custom dropdown (not native <select>) — render list with role="listbox" and option items with role="option"
- Tests: opens on click, ArrowDown moves highlight, Enter selects, Escape closes, axe open+closed

TOOLTIP:
- Install @floating-ui/react for positioning (only allowed external dep)
- Triggers on hover AND focus — keyboard accessible
- role="tooltip" on the floating panel, aria-describedby on the trigger element
- CSS enter/exit transitions (no JS animation)
- Tests: shows on hover, shows on focus, hides on blur, aria-describedby set correctly, axe passes

TOAST:
- Create src/hooks/useToast.ts — internal event emitter pattern
  - useToast() hook returns { toast } object
  - toast.success(message), toast.error(message), toast.info(message), toast.warning(message)
  - Each accepts optional { duration, title } options
- ToastProvider renders toast list in ReactDOM.createPortal
  - isMounted SSR guard: const [isMounted, setIsMounted] = useState(false); useEffect(()=>setIsMounted(true),[])
  - if (!isMounted) return null — prevents SSR crash
  - Auto-dismiss after duration (default 4000ms)
- Individual Toast: role="status" for info/success, role="alert" for warning/error
- Slide-in animation from bottom-right — CSS only
- Export: ToastProvider, useToast, Toast from src/index.ts
- Tests: useToast renders toast, auto-dismiss fires, dismiss button works, axe passes per variant
```

---

### Phase 5 Prompt — Showcase Components

```
Now implement Phase 5: Showcase Components (Modal, Tabs, Accordion, Form, DataTable).

MODAL:
- Create src/hooks/useFocusTrap.ts — traps Tab/Shift+Tab within a container element
- Modal uses ReactDOM.createPortal to render in document.body
- isMounted SSR guard (same pattern as Toast — useEffect gated)
- Scroll lock: document.body.style.overflow = 'hidden' on open, restore on close
- Escape key closes modal
- Focus returns to trigger element on close (store trigger ref before opening)
- ARIA: role="dialog", aria-modal="true", aria-labelledby pointing to Modal.Header id
- Compound API:
  <Modal open={bool} onClose={fn}>
    <Modal.Header>Title</Modal.Header>
    <Modal.Body>Content</Modal.Body>
    <Modal.Footer>Actions</Modal.Footer>
  </Modal>
- Tests: renders when open, hidden when closed, Escape closes, focus trapped, focus returns to trigger, scroll lock applies/restores, axe passes

TABS:
- Compound: Tabs, Tabs.List, Tabs.Tab, Tabs.Panel
- role="tablist" on Tabs.List, role="tab" on each Tabs.Tab, role="tabpanel" on each Tabs.Panel
- aria-selected on active tab, aria-controls linking tab to panel, aria-labelledby linking panel to tab
- Keyboard: ArrowLeft/Right navigates between tabs
- Tests: clicking tab shows panel, ArrowRight moves focus, ARIA associations correct, axe passes

ACCORDION:
- Compound: Accordion, Accordion.Item, Accordion.Trigger, Accordion.Content
- CSS height animation for expand/collapse (not JS height — use max-height transition)
- Chevron rotation animation on trigger
- aria-expanded on trigger, aria-controls linking trigger to content
- Keyboard: Enter and Space toggle
- Tests: click expands, Enter toggles, aria-expanded correct, axe passes

FORM:
- Compound: Form, Form.Field, Form.Label, Form.Error, Form.Submit
- Form.Field generates a unique id via useId() and provides it to children via context
- Form.Label uses htmlFor={id} from context
- Form children (Input, Checkbox etc) receive id from context automatically
- Form.Error uses role="alert"
- React Hook Form compatible: Form.Field children accept {...register('fieldName')}
- Tests: label associated with input via id, error shown when error prop set, role="alert" on error, axe passes

DATATABLE:
- Generic: DataTable<T extends Record<string, unknown>>
- Props:
  columns: ColumnDef<T>[]  (ColumnDef has: key: keyof T, header: string, sortable?: boolean, render?: (value, row) => ReactNode)
  data: T[]
  pagination?: { pageSize: number }
- Client-side sorting via useMemo — clicking a sortable header cycles: none → asc → desc
- aria-sort="ascending"|"descending"|"none" on sortable <th> elements
- scope="col" on all <th>
- role="grid" on the <table>
- Pagination: previous/next buttons, page indicator, aria-label on pagination buttons
- Types: export ColumnDef<T> interface
- Tests: renders rows, click header sorts asc then desc, aria-sort updates, pagination shows correct page, axe passes
- Run tsc --noEmit after to verify DataTable<T> generic is preserved in .d.ts output
```

---

### Phase 6 Prompt — Storybook Stories

```
Now implement Phase 6: Storybook Stories for all 14 components.

STORYBOOK CONFIGURATION:
storybook/main.ts:
- Framework: @storybook/react-vite
- Addons: @storybook/addon-essentials, @storybook/addon-a11y, @storybook/addon-interactions, @storybook/addon-themes
- autodocs: 'tag'

storybook/preview.ts:
- Import ../src/tokens/tokens.css globally
- Background switcher: light (#fff), dark (#0f172a), grey (#f8fafc)
- a11y config: color-contrast rule enabled
- Theme toolbar in globalTypes

STORY HIERARCHY:
Foundation/Button, Foundation/Badge, Foundation/Spinner, Foundation/Avatar
Interaction/Input, Interaction/Checkbox, Interaction/Select, Interaction/Tooltip, Interaction/Toast
Showcase/Modal, Showcase/Tabs, Showcase/Accordion, Showcase/Form, Showcase/DataTable
System/Tokens, System/ThemeProvider

MANDATORY STORIES PER COMPONENT (using CSF3 format with satisfies Meta<typeof Component>):
- Default: component with no props
- AllVariants: all variant prop values side-by-side in a flex row
- AllSizes: all size prop values side-by-side
- Disabled: disabled state
- Loading: loading/pending state (Button, Input)
- DarkMode: on dark background
- Playground: all props exposed as Storybook Controls (argTypes with controls)

SYSTEM/TOKENS STORY:
Create a documentation-only MDX or render story showing:
- Color swatches for all --ayo-color-* vars with hex values
- Spacing scale with px measurements
- Border radius preview (boxes with each radius)
- Shadow cards (boxes with each shadow)
- Typography scale (text at each --ayo-text-* size)

SYSTEM/THEMEPROVIDER STORY:
Live demo where Storybook Controls change colorPrimary, radiusMd — and the component updates in real time using ThemeProvider.
```

---

### Phase 7 Prompt — GitHub Actions CI/CD

```
Now implement Phase 7: GitHub Actions CI/CD workflows.

FILE: .github/workflows/ci.yml
Trigger: push to main + pull_request to main
Jobs (run in sequence):
  quality:
    - actions/checkout@v4
    - actions/setup-node@v4 (node 20, cache npm)
    - npm ci
    - npm run typecheck
    - npm run lint
    - npm test -- --coverage --ci (fails if any threshold below 85%)
    - codecov/codecov-action@v4 with fail_ci_if_error: true
  build:
    needs: quality
    - npm ci
    - npm run build
    - node -e "require('./dist/index.js')" (verifies built output is importable)

FILE: .github/workflows/release.yml
Trigger: push to main
Jobs:
  release:
    permissions: contents write, pull-requests write
    steps:
    - checkout with fetch-depth: 0
    - setup-node with registry-url: https://registry.npmjs.org
    - npm ci
    - changesets/action@v1 with:
        publish: npm run release
        title: 'chore: version packages'
        commit: 'chore: version packages'
      env: GITHUB_TOKEN, NODE_AUTH_TOKEN (from NPM_TOKEN secret)

  deploy-storybook:
    IMPORTANT: This job does NOT use "needs: release" — it is INDEPENDENT
    Runs on every push to main regardless of release outcome
    permissions: pages write, id-token write
    environment: github-pages
    steps:
    - checkout, setup-node, npm ci
    - npm run build-storybook
    - actions/upload-pages-artifact@v3 (path: storybook-static)
    - actions/deploy-pages@v4

FILE: .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch"
}
```

---

### Phase 8 Prompt — README & Documentation

```
Now implement Phase 8: README and documentation files.

README.md structure (must include all 8 sections):
1. # @ayo-ui/react — header with tagline
   Badges: npm version, coverage (Codecov), license MIT, Storybook link

2. ## Installation
   npm install @ayo-ui/react
   import '@ayo-ui/react/styles'  ← add to app entry

3. ## Quick Start
   Show Button + Modal example with ThemeProvider wrapping

4. ## ThemeProvider Setup
   Show all 3 usage patterns: CSS-only override, ThemeProvider, scoped ThemeProvider

5. ## Components
   Table with columns: Component | Category | Storybook
   List all 14 components with links to GitHub Pages Storybook

6. ## Accessibility
   State WCAG 2.1 AA commitment. List key patterns used (focus trap, aria-*, role=*)

7. ## Contributing
   Fork → Clone → npm install → npm run storybook → changes → npx changeset → PR

8. ## License
   MIT — Ayodele Ibraheem

CONTRIBUTING.md: step-by-step guide for contributors
LICENSE: MIT license with current year and "Ayodele Ibraheem"
```

---

### Phase 9 Prompt — Final QA

```
Now run Phase 9: Final QA validation. Run each command and confirm it passes:

1. npm test -- --coverage
   Expected: all pass, branches/functions/lines/statements all ≥ 85%

2. npm run typecheck
   Expected: zero TypeScript errors, DataTable<T> generic compiles

3. npm run build
   Expected: dist/ contains index.js, index.mjs, index.d.ts, tokens.css

4. node -e "const lib = require('./dist/index.js'); console.log(Object.keys(lib))"
   Expected: lists all 14 component names + ThemeProvider + useToast

5. npm run build-storybook
   Expected: storybook-static/ builds with zero errors

6. npx changeset
   Add first changeset: minor release, message "Initial release — 14 accessible React components"

Confirm all 6 checks pass before marking implementation complete.
```

---

## 📌 Quick Tips for Lovable & Bolt

### Lovable Tips
- Start a **new project** and paste the Master Prompt
- After each phase completes, use the **Preview** tab to verify it looks correct
- If Lovable generates something unexpected, paste the specific Phase Prompt again and say "Fix this to match the specification exactly"
- Lovable works best when you describe one phase at a time

### Bolt Tips
- Use bolt.new and select **React + TypeScript** as the starting template
- Paste the Master Prompt in the chat
- Use the **terminal panel** in Bolt to run `npm test` and `npm run build` after each phase
- If a file is wrong, click the file in the editor and say "Rewrite this file to match [paste relevant section]"

### Both Tools
- Never paste all phase prompts at once — go phase by phase
- After Phase 3, run tests before continuing to Phase 4
- After Phase 5, run `tsc --noEmit` to verify DataTable<T> generics
- The prompts are ordered by dependency — do not skip phases

---

*Derived from IMPLEMENTATION_PLAN.md → PRD.md → @ayo-ui/react*
*Antigravity AI · 2026-05-15*
