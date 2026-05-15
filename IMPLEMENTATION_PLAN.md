# Implementation Plan
# `@ayo-ui/react` — Public React Component Library

> **Source:** PRD.md (APPROVED)
> **Date:** 2026-05-15
> **Total Phases:** 9 | **Total Tasks:** 78

---

## Progress Tracker

| Phase | Title | Tasks | Status |
|---|---|---|---|
| 1 | Project Scaffolding & Tooling | 12 | ⬜ Not Started |
| 2 | Design Token System & ThemeProvider | 6 | ⬜ Not Started |
| 3 | Foundation Components | 16 | ⬜ Not Started |
| 4 | Interaction Components | 20 | ⬜ Not Started |
| 5 | Showcase Components | 20 | ⬜ Not Started |
| 6 | Storybook Stories & Docs | 6 | ⬜ Not Started |
| 7 | GitHub Actions CI/CD | 6 | ⬜ Not Started |
| 8 | README & Documentation | 4 | ⬜ Not Started |
| 9 | Final QA & Release Prep | 8 | ⬜ Not Started |

---

## Phase 1 — Project Scaffolding & Tooling

> **Goal:** A buildable, testable TypeScript project with no components yet.
> **Done when:** `npm run build`, `npm test`, and `npm run storybook` all succeed on an empty component.

### Tasks

- [ ] **1.1** Initialise `package.json` with name `@ayo-ui/react`, version `0.0.0`, license MIT
- [ ] **1.2** Add `publishConfig: { "access": "public" }` to `package.json`
- [ ] **1.3** Install **production** peer deps: `react@^18`, `react-dom@^18`
- [ ] **1.4** Install **dev** deps: `typescript`, `tsup`, `@types/react`, `@types/react-dom`
- [ ] **1.5** Install **test** deps: `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jest-axe`, `axe-core`, `identity-obj-proxy`, `ts-jest`
- [ ] **1.6** Install **Storybook**: `npx storybook@latest init --type react_vite --no-open`
- [ ] **1.7** Install **Storybook addons**: `@storybook/addon-a11y`, `@storybook/addon-interactions`, `@storybook/addon-themes`
- [ ] **1.8** Install **Changesets**: `@changesets/cli` — run `npx changeset init`
- [ ] **1.9** Create `tsconfig.json` targeting ES2020, JSX react-jsx, strict mode, `declarationDir: dist/types`
- [ ] **1.10** Create `tsup.config.ts` — entry `src/index.ts`, formats `['esm','cjs']`, splitting, treeshake, external react/react-dom, `dts: false`
- [ ] **1.11** Create `jest.config.ts` — jsdom env, CSS module mock, coverage thresholds at 85%, exclude stories and barrel
- [ ] **1.12** Create `jest.setup.ts` — import `@testing-library/jest-dom`, extend `expect` with `toHaveNoViolations` from `jest-axe`

---

## Phase 2 — Design Token System & ThemeProvider

> **Goal:** Tokens are importable via `@ayo-ui/react/styles`. ThemeProvider correctly injects CSS vars.
> **Done when:** A consumer app can override `--ayo-color-primary` and see the change.

### Tasks

- [ ] **2.1** Create `src/tokens/tokens.css` with all 8 token categories (Color Brand, Color Semantic, Color Neutral, Typography, Spacing, Radius, Shadows, Transitions, Z-Index) plus `prefers-color-scheme: dark` overrides — all prefixed `--ayo-`
- [ ] **2.2** Create `src/ThemeProvider/ThemeProvider.tsx` — thin injector using `element.style.setProperty`, `useMemo` on token map, scoped to `<div>` not `:root`
- [ ] **2.3** Create `TOKEN_MAP` record mapping `AyoTheme` keys to CSS variable names
- [ ] **2.4** Export `ThemeProvider` and `AyoTheme` type from `src/index.ts`
- [ ] **2.5** Write tests for ThemeProvider — verify CSS vars injected, verify `useMemo` prevents re-render, verify scoped div wrapper
- [ ] **2.6** Add `"./styles": "./dist/tokens.css"` to `exports` map in `package.json`

---

## Phase 3 — Foundation Components (4 Components)

> **Goal:** Button, Badge, Spinner, Avatar — each with tests + CSS.
> **Done when:** All 3 test layers pass + axe-core hard gate green for each.

### Component Rules (apply to every component in Phases 3–5)
- Use `forwardRef` on all interactive elements
- Spread `...rest` onto root DOM element
- Set `displayName` explicitly
- Merge `className` — never override library classes
- Use CSS custom properties only — no hardcoded values
- No `document`/`window` at render time (SSR-safe)

---

### 3.1 — Button

- [ ] **3.1a** Create `src/components/Button/Button.module.css` — variants (solid, outline, ghost), sizes (sm, md, lg), loading, disabled states using `--ayo-*` tokens
- [ ] **3.1b** Create `src/components/Button/Button.tsx` — `ButtonProps` extends `ButtonHTMLAttributes`, `forwardRef`, `isLoading`, `leftIcon`, `rightIcon`, `aria-busy`, `aria-disabled`
- [ ] **3.1c** Write `Button.test.tsx` — Rendering (children, variants, loading, forwardRef, className merge) + Behaviour (onClick, disabled blocks click, loading blocks click) + Accessibility (axe all states, keyboard Tab + Enter)
- [ ] **3.1d** Export Button from `src/index.ts`

### 3.2 — Badge

- [ ] **3.2a** Create `Badge.module.css` — variants (default, success, warning, danger, info), sizes (sm, md)
- [ ] **3.2b** Create `Badge.tsx` — `BadgeProps` extends `HTMLAttributes<HTMLSpanElement>`, `forwardRef`
- [ ] **3.2c** Write `Badge.test.tsx` — Rendering + Accessibility (axe passes)
- [ ] **3.2d** Export Badge from `src/index.ts`

### 3.3 — Spinner

- [ ] **3.3a** Create `Spinner.module.css` — CSS keyframe animation, sizes (sm, md, lg)
- [ ] **3.3b** Create `Spinner.tsx` — `aria-label` prop, `role="status"`, `aria-busy` support
- [ ] **3.3c** Write `Spinner.test.tsx` — Rendering (sizes, label) + Accessibility (axe passes, `role="status"` present)
- [ ] **3.3d** Export Spinner from `src/index.ts`

### 3.4 — Avatar

- [ ] **3.4a** Create `Avatar.module.css` — sizes (sm, md, lg, xl), shape (circle, square), group overlap
- [ ] **3.4b** Create `Avatar.tsx` — image with `onError` fallback to initials, `AvatarGroup` sub-component
- [ ] **3.4c** Write `Avatar.test.tsx` — image render, fallback to initials on error, group renders multiple, axe passes
- [ ] **3.4d** Export Avatar and AvatarGroup from `src/index.ts`

---

## Phase 4 — Interaction Components (5 Components)

> **Goal:** Input, Checkbox, Select, Tooltip, Toast — the interactive layer.
> **Done when:** All 3 test layers pass for each. Select keyboard nav verified. Toast imperative API works.

### 4.1 — Input

- [ ] **4.1a** Create `Input.module.css` — states (default, focus, error, disabled), sizes (sm, md, lg), prefix/suffix slot styles
- [ ] **4.1b** Create `Input.tsx` — controlled/uncontrolled, `hasError` prop, `prefixElement`/`suffixElement` slots, `forwardRef` to `<input>`
- [ ] **4.1c** Write `Input.test.tsx` — controlled value, uncontrolled, error state class, prefix/suffix render, axe passes all states
- [ ] **4.1d** Export Input from `src/index.ts`

### 4.2 — Checkbox

- [ ] **4.2a** Create `Checkbox.module.css` — checked, unchecked, indeterminate, disabled visual states
- [ ] **4.2b** Create `Checkbox.tsx` — `forwardRef` to `<input type="checkbox">`, expose `indeterminate` via `useEffect` on ref, `label` prop
- [ ] **4.2c** Write `Checkbox.test.tsx` — checked/unchecked toggle, indeterminate state set on DOM ref, axe passes, label associated correctly
- [ ] **4.2d** Export Checkbox from `src/index.ts`

### 4.3 — Select

- [ ] **4.3a** Create `Select.module.css` — dropdown container, option list, selected state, keyboard-focused option highlight
- [ ] **4.3b** Create `Select.tsx` — ARIA combobox pattern (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`), keyboard nav (ArrowUp/Down, Enter, Escape), `forwardRef`
- [ ] **4.3c** Write `Select.test.tsx` — opens on click, ArrowDown moves focus, Enter selects, Escape closes, axe passes open + closed states
- [ ] **4.3d** Export Select from `src/index.ts`

### 4.4 — Tooltip

- [ ] **4.4a** Install `@floating-ui/react` (only allowed external dep beyond React)
- [ ] **4.4b** Create `Tooltip.module.css` — floating panel styles, arrow, enter/exit CSS transitions
- [ ] **4.4c** Create `Tooltip.tsx` — `useFloating` from `@floating-ui/react`, triggers on hover + focus, `role="tooltip"`, `aria-describedby` on trigger
- [ ] **4.4d** Write `Tooltip.test.tsx` — shows on hover, shows on focus, hides on blur, axe passes, aria-describedby set correctly
- [ ] **4.4e** Export Tooltip from `src/index.ts`

### 4.5 — Toast

- [ ] **4.5a** Create `src/hooks/useToast.ts` — internal event emitter, `useToast()` hook returns `{ toast }`, `toast.success()`, `toast.error()`, `toast.info()`, `toast.warning()`
- [ ] **4.5b** Create `Toast.module.css` — slide-in animation from bottom-right, variants, dismiss button
- [ ] **4.5c** Create `ToastProvider.tsx` — subscribes to events, renders toast list in a portal with `isMounted` SSR guard, auto-dismiss after duration
- [ ] **4.5d** Create `Toast.tsx` — individual toast item, `role="status"` for info/success, `role="alert"` for warning/error
- [ ] **4.5e** Write `Toast.test.tsx` — `useToast` renders toast, auto-dismiss after timeout, dismiss on button click, axe passes per variant
- [ ] **4.5f** Export `ToastProvider`, `useToast`, `Toast` from `src/index.ts`

---

## Phase 5 — Showcase Components (5 Components)

> **Goal:** Modal, Tabs, Accordion, Form, DataTable — the portfolio centrepiece.
> **Done when:** DataTable<T> generics compile correctly. Modal focus trap + Escape verified. Form works with RHF.

### 5.1 — Modal

- [ ] **5.1a** Create `src/hooks/useFocusTrap.ts` — traps Tab/Shift+Tab within container, returns ref to attach
- [ ] **5.1b** Create `Modal.module.css` — backdrop overlay, dialog panel, enter/exit CSS transitions
- [ ] **5.1c** Create `Modal.tsx` — `ReactDOM.createPortal`, `isMounted` SSR guard, `useFocusTrap`, scroll lock (`document.body.style.overflow`), Escape key closes, `role="dialog"`, `aria-modal`, `aria-labelledby`
- [ ] **5.1d** Create compound sub-components: `Modal.Header`, `Modal.Body`, `Modal.Footer`
- [ ] **5.1e** Write `Modal.test.tsx` — renders when open, hidden when closed, Escape closes, focus trapped inside, focus returns to trigger on close, scroll lock applied/removed, axe passes
- [ ] **5.1f** Export Modal from `src/index.ts`

### 5.2 — Tabs

- [ ] **5.2a** Create `Tabs.module.css` — tab list, tab button, panel, active indicator
- [ ] **5.2b** Create `Tabs.tsx` — compound: `Tabs`, `Tabs.List`, `Tabs.Tab`, `Tabs.Panel` — `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`
- [ ] **5.2c** Write `Tabs.test.tsx` — clicking tab shows correct panel, keyboard ArrowLeft/Right navigates, ARIA associations correct, axe passes
- [ ] **5.2d** Export Tabs from `src/index.ts`

### 5.3 — Accordion

- [ ] **5.3a** Create `Accordion.module.css` — panel collapse/expand CSS height animation, chevron rotation
- [ ] **5.3b** Create `Accordion.tsx` — compound: `Accordion`, `Accordion.Item`, `Accordion.Trigger`, `Accordion.Content` — `aria-expanded`, `aria-controls`, keyboard Enter/Space triggers
- [ ] **5.3c** Write `Accordion.test.tsx` — click expands/collapses, Enter key toggles, aria-expanded correct, axe passes
- [ ] **5.3d** Export Accordion from `src/index.ts`

### 5.4 — Form

- [ ] **5.4a** Create `Form.module.css` — field wrapper, label, error message styles
- [ ] **5.4b** Create `Form.tsx` — compound: `Form`, `Form.Field`, `Form.Label`, `Form.Error`, `Form.Submit` — `Form.Field` provides id to label/input via context, `Form.Error` uses `role="alert"`
- [ ] **5.4c** Verify React Hook Form compatibility: `Form.Field` children accept `{...register('fieldName')}`
- [ ] **5.4d** Write `Form.test.tsx` — label associated with input via id, error message shown when error prop set, `role="alert"` on error, axe passes
- [ ] **5.4e** Export Form from `src/index.ts`

### 5.5 — DataTable

- [ ] **5.5a** Create `DataTable.module.css` — table, thead, tbody, tr, th, td, sort indicator, pagination controls
- [ ] **5.5b** Create `DataTable.tsx` — generic `DataTable<T extends Record<string, unknown>>`, `columns` prop typed as `ColumnDef<T>[]`, client-side sorting via `useMemo`, pagination with `currentPage`/`onPageChange`, `aria-sort` on sortable headers, `role="grid"`, `scope="col"` on headers
- [ ] **5.5c** Write `DataTable.test.tsx` — renders rows from data, clicking header sorts ascending then descending, pagination shows correct page, `aria-sort` attribute updates on sort, axe passes
- [ ] **5.5d** Run `tsc --noEmit` to verify `DataTable<T>` generics compile and the type is preserved in `.d.ts` output
- [ ] **5.5e** Export DataTable and ColumnDef type from `src/index.ts`

---

## Phase 6 — Storybook Stories & Documentation

> **Goal:** Every component has the mandatory 7 stories. System/Tokens page exists.
> **Done when:** `npm run storybook` loads with no errors and all stories render correctly.

### Tasks

- [ ] **6.1** Configure `storybook/main.ts` — `@storybook/react-vite`, all addons, `autodocs: 'tag'`
- [ ] **6.2** Configure `storybook/preview.ts` — import `tokens.css`, background switcher (light/dark/grey), theme toolbar, a11y addon config with colour-contrast rule enabled
- [ ] **6.3** Write stories for **Foundation tier** (Button, Badge, Spinner, Avatar) — each with Default, AllVariants, AllSizes, Disabled, Loading (where applicable), DarkMode, Playground stories
- [ ] **6.4** Write stories for **Interaction tier** (Input, Checkbox, Select, Tooltip, Toast) — mandatory 7 stories each, plus `ClickInteraction` play function for interactive components
- [ ] **6.5** Write stories for **Showcase tier** (Modal, Tabs, Accordion, Form, DataTable) — mandatory 7 stories each, DataTable story uses typed generic data
- [ ] **6.6** Create `System/Tokens` story — renders all `--ayo-*` tokens visually (colour swatches, spacing scale, radius preview, shadow cards, typography scale). Create `System/ThemeProvider` story — live demo of theme switching via controls

---

## Phase 7 — GitHub Actions CI/CD

> **Goal:** Every PR is gated. Merging to main triggers Changesets + Storybook deploy.
> **Done when:** A test PR is opened and all 6 CI gates appear in the checks.

### Tasks

- [ ] **7.1** Create `.github/workflows/ci.yml` — triggers on PR + push to main, runs: typecheck → lint → test with coverage → build → dist verify (`node -e "require('./dist/index.js')"`)
- [ ] **7.2** Create `.github/workflows/release.yml` — triggers on push to main, runs Changesets Action (`changesets/action@v1`) with `publish: npm run release`, requires `NPM_TOKEN` secret
- [ ] **7.3** Add Storybook deploy job to `release.yml` as **independent job** (not `needs: release`) — builds Storybook, uploads pages artifact, deploys via `actions/deploy-pages@v4`
- [ ] **7.4** Configure `.changeset/config.json` — set `baseBranch: "main"`, `access: "public"`
- [ ] **7.5** Add Codecov upload step to `ci.yml` using `codecov/codecov-action@v4` with `fail_ci_if_error: true`
- [ ] **7.6** Enable GitHub Pages in repo settings (source: GitHub Actions). Add `NPM_TOKEN` and `CODECOV_TOKEN` to repo secrets.

---

## Phase 8 — README & Documentation

> **Goal:** A developer landing on npm or GitHub can get started in under 5 minutes.
> **Done when:** README renders correctly on GitHub with all sections populated.

### Tasks

- [ ] **8.1** Write `README.md` with all 8 mandatory sections: Installation, Quick Start, ThemeProvider Setup, Component List (table with Storybook links), Accessibility, Contributing, Changelog, License
- [ ] **8.2** Add badges to README header: npm version, coverage (Codecov), license MIT, Storybook
- [ ] **8.3** Write `CONTRIBUTING.md` — fork → clone → `npm install` → `npm run storybook` → make changes → `npx changeset` → PR
- [ ] **8.4** Add `LICENSE` file (MIT) with correct year and author name

---

## Phase 9 — Final QA & Release Prep

> **Goal:** Library is publication-ready. All gates pass. v0.1.0 published to npm.
> **Done when:** `@ayo-ui/react` is live on npmjs.com and Storybook is live on GitHub Pages.

### Tasks

- [ ] **9.1** Run full test suite: `npm test -- --coverage` — verify all thresholds ≥ 85% on branches, functions, lines, statements
- [ ] **9.2** Run `npm run typecheck` — verify zero TypeScript errors including DataTable<T> generics
- [ ] **9.3** Run `npm run build` — verify `dist/` contains `.js`, `.mjs`, `.d.ts`, and `tokens.css`
- [ ] **9.4** Verify built dist is importable: `node -e "const lib = require('./dist/index.js'); console.log(Object.keys(lib))"`
- [ ] **9.5** Run Storybook build: `npm run build-storybook` — verify `storybook-static/` builds with no errors
- [ ] **9.6** Manually verify `addon-a11y` panel shows zero violations on all component stories in Storybook dev server
- [ ] **9.7** Run `npx changeset` — add first changeset describing v0.1.0 as a minor release with the 14 components
- [ ] **9.8** Push to `main` — verify CI passes all 6 gates, Changesets creates "Version Packages" PR, merge it, verify npm publish succeeds and Storybook deploys to GitHub Pages

---

## Dependency Graph

```
Phase 1 (Scaffolding)
    └── Phase 2 (Tokens + ThemeProvider)
            ├── Phase 3 (Foundation Components)
            │       └── Phase 4 (Interaction Components)
            │               └── Phase 5 (Showcase Components)
            │                       └── Phase 6 (Storybook Stories)
            ├── Phase 7 (CI/CD)         ─── can run parallel to Phase 3–6
            └── Phase 8 (README)        ─── can run parallel to Phase 3–6
                        └── Phase 9 (Final QA + Release)
```

---

## File Creation Order (Quick Reference)

```
Phase 1:  package.json, tsconfig.json, tsup.config.ts, jest.config.ts, jest.setup.ts
Phase 2:  src/tokens/tokens.css, src/ThemeProvider/ThemeProvider.tsx
Phase 3:  src/components/{Button,Badge,Spinner,Avatar}/*
Phase 4:  src/hooks/useToast.ts, src/components/{Input,Checkbox,Select,Tooltip,Toast}/*
Phase 5:  src/hooks/useFocusTrap.ts, src/components/{Modal,Tabs,Accordion,Form,DataTable}/*
Phase 6:  storybook/main.ts, storybook/preview.ts, src/components/**/*.stories.tsx
Phase 7:  .github/workflows/ci.yml, .github/workflows/release.yml, .changeset/config.json
Phase 8:  README.md, CONTRIBUTING.md, LICENSE
Phase 9:  (validation only — no new files)
```

---

## Key Acceptance Criteria (from PRD)

| Criterion | Gate |
|---|---|
| Test coverage ≥ 85% on all metrics | CI hard gate |
| `axe-core` zero violations per component | Test failure |
| TypeScript strict mode, no errors | CI hard gate |
| ESM + CJS dual output ships | Build verification |
| `DataTable<T>` generic preserved in `.d.ts` | Manual typecheck |
| SSR-safe (no document/window at render) | `isMounted` guard |
| Storybook live on GitHub Pages | Post-release verify |
| `@ayo-ui/react` live on npm | Post-release verify |

---

*Derived from PRD.md — @ayo-ui/react*
*Antigravity AI · 2026-05-15*
