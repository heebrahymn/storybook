# Product Requirements Document
# `@ayo-ui/react` — Public React Component Library

> **Status:** APPROVED (Multi-Agent Review Complete)
> **Version:** 1.0.0-planning
> **Date:** 2026-05-15
> **Author:** Ayodele Ibraheem

---

## Table of Contents

1. [Understanding Summary](#1-understanding-summary)
2. [Non-Goals](#2-non-goals)
3. [Technical Stack](#3-technical-stack)
4. [Component Set](#4-component-set-v10--14-components)
5. [Component API Contract](#5-component-api-contract-universal-rules)
6. [Form Component API](#6-form-component-api-explicit-contract)
7. [Design Token System](#7-design-token-system)
8. [ThemeProvider Contract](#8-themeprovider-contract)
9. [Project Structure](#9-project-structure)
10. [Build Configuration](#10-build-configuration)
11. [Testing Strategy](#11-testing-strategy)
12. [Storybook Documentation Standards](#12-storybook-documentation-standards)
13. [GitHub Actions CI/CD](#13-github-actions-cicd)
14. [Accessibility Commitment](#14-accessibility-commitment)
15. [README Structure](#15-readme-structure)
16. [Decision Log](#16-decision-log)
17. [Multi-Agent Review Resolutions](#17-multi-agent-review--accepted-resolutions)
18. [Implementation Readiness Checklist](#18-implementation-readiness-checklist)

---

## 1. Understanding Summary

| Field | Detail |
|---|---|
| **What** | A public npm-installable React 18 component library with full TypeScript support, WCAG 2.1 accessibility, Storybook documentation, and automated CI/CD |
| **Why** | Showcase senior-level frontend engineering for portfolio, client, and employer use; provide a reusable toolkit for open-source adoption |
| **Who (Primary)** | Personal/portfolio projects; client and employer engagements |
| **Who (Secondary)** | Small teams building internal design systems; open-source community |
| **Package Name** | `@ayo-ui/react` |
| **License** | MIT |

---

## 2. Non-Goals (Explicit)

- No React 17 support
- No CSS-in-JS runtime (no Emotion, no Styled Components)
- No bundled icon set
- No animation library dependency (CSS-only transitions)
- No form validation engine (Form component is RHF-compatible, not opinionated)
- No monorepo structure in v1.0
- No IE11 support

---

## 3. Technical Stack

| Concern | Decision | Rationale |
|---|---|---|
| **Framework** | React 18+ (peer dep) | Concurrent features, modern hooks |
| **Language** | TypeScript 5+ | Bundled types, no `@types/*` needed |
| **Build Tool** | tsup (esbuild-powered) | Zero-config ESM+CJS, fastest build |
| **Type Generation** | `tsc --emitDeclarationOnly` | Reliable generics (DataTable\<T\>) |
| **Styling** | Vanilla CSS + CSS Modules | Zero runtime, scoped, SSR-safe |
| **Theming** | CSS Custom Properties + ThemeProvider | Flexible, composable, zero overhead |
| **Documentation** | Storybook (react-vite) | Industry standard |
| **Testing** | Jest + RTL + axe-core + jest-axe | Coverage >85%, a11y hard gate |
| **CI/CD** | GitHub Actions | Quality gate + automated release |
| **Versioning** | Changesets | Industry standard for component libs |
| **Bundle output** | ESM + CJS, tree-shakeable | Broad compatibility |
| **Browser targets** | Chrome 90+, Firefox 88+, Safari 14+ | Matches React 18 support matrix |

---

## 4. Component Set (v1.0 — 14 Components)

### Foundation Tier

| Component | Key Engineering Challenge |
|---|---|
| `Button` | Variants, loading state, icon slots, `forwardRef` |
| `Badge` | Design token showcase, minimal surface area |
| `Spinner` | CSS animation, `aria-busy` accessibility |
| `Avatar` | Image fallback → initials, avatar groups |

### Interaction Tier

| Component | Key Engineering Challenge |
|---|---|
| `Input` | Controlled/uncontrolled, validation states, prefix/suffix slots |
| `Checkbox` | Indeterminate state via `ref.indeterminate` (WCAG signal) |
| `Select` | Custom dropdown, keyboard navigation, ARIA combobox pattern |
| `Tooltip` | Floating UI positioning, focus + hover triggers |
| `Toast` | Imperative API `toast.success()` + `useToast` hook |

### Showcase Tier

| Component | Key Engineering Challenge |
|---|---|
| `Modal` | Focus trap, scroll lock, Portal, SSR guard, `isMounted` |
| `Tabs` | Compound component pattern, ARIA tabpanel association |
| `Accordion` | Compound component, CSS animation, keyboard nav |
| `Form` | Compound component, RHF-compatible, validation display |
| `DataTable` | TypeScript generic `DataTable<T>`, sorting, pagination |

---

## 5. Component API Contract (Universal Rules)

Every component **MUST**:

1. Use `forwardRef` on all interactive elements
2. Spread `...rest` onto the root DOM element
3. Set `displayName` explicitly
4. Accept and merge `className` prop without overriding library classes
5. Use CSS custom properties exclusively — no hardcoded colours or sizes
6. Be SSR-safe (no `document`/`window` access at render time)

### Example — Button

```tsx
import { forwardRef, ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'solid' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', isLoading, leftIcon,
     rightIcon, children, disabled, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={[styles.button, styles[variant], styles[size], className]
          .filter(Boolean).join(' ')}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading && <Spinner size="sm" aria-hidden />}
        {leftIcon && <span aria-hidden>{leftIcon}</span>}
        {children}
        {rightIcon && <span aria-hidden>{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
```

---

## 6. Form Component API (Explicit Contract)

```tsx
<Form onSubmit={handleSubmit(onSubmit)}>
  <Form.Field label="Email" error={errors.email?.message}>
    <Input {...register('email')} />
  </Form.Field>
  <Form.Field label="Password" error={errors.password?.message}>
    <Input type="password" {...register('password')} />
  </Form.Field>
  <Form.Submit>Sign In</Form.Submit>
</Form>
```

**Sub-components exported:** `Form.Field` · `Form.Submit` · `Form.Label` · `Form.Error`

---

## 7. Design Token System

### Token File: `src/tokens/tokens.css`

All tokens use the `--ayo-` prefix to prevent collision with consumer app CSS variables.

```css
/* ============================================
   @ayo-ui/react — Design Token System
   Consumer import: import '@ayo-ui/react/styles'
   ============================================ */

:root {
  /* ── Color: Brand ──────────────────────────── */
  --ayo-color-primary:        #6366f1;
  --ayo-color-primary-hover:  #4f46e5;
  --ayo-color-primary-active: #4338ca;
  --ayo-color-primary-subtle: #eef2ff;

  /* ── Color: Semantic ───────────────────────── */
  --ayo-color-success: #22c55e;
  --ayo-color-warning: #f59e0b;
  --ayo-color-danger:  #ef4444;
  --ayo-color-info:    #3b82f6;

  /* ── Color: Neutral ────────────────────────── */
  --ayo-color-text:           #0f172a;
  --ayo-color-text-muted:     #64748b;
  --ayo-color-border:         #e2e8f0;
  --ayo-color-surface:        #ffffff;
  --ayo-color-surface-raised: #f8fafc;
  --ayo-color-overlay:        rgba(0, 0, 0, 0.5);

  /* ── Typography ────────────────────────────── */
  --ayo-font-sans:     'Inter', system-ui, -apple-system, sans-serif;
  --ayo-font-mono:     'JetBrains Mono', 'Fira Code', monospace;
  --ayo-text-xs:       0.75rem;
  --ayo-text-sm:       0.875rem;
  --ayo-text-md:       1rem;
  --ayo-text-lg:       1.125rem;
  --ayo-text-xl:       1.25rem;
  --ayo-font-normal:   400;
  --ayo-font-medium:   500;
  --ayo-font-semibold: 600;
  --ayo-font-bold:     700;

  /* ── Spacing ───────────────────────────────── */
  --ayo-space-1:  0.25rem;
  --ayo-space-2:  0.5rem;
  --ayo-space-3:  0.75rem;
  --ayo-space-4:  1rem;
  --ayo-space-5:  1.25rem;
  --ayo-space-6:  1.5rem;
  --ayo-space-8:  2rem;
  --ayo-space-10: 2.5rem;

  /* ── Border Radius ─────────────────────────── */
  --ayo-radius-sm:   4px;
  --ayo-radius-md:   8px;
  --ayo-radius-lg:   12px;
  --ayo-radius-xl:   16px;
  --ayo-radius-full: 9999px;

  /* ── Shadows ───────────────────────────────── */
  --ayo-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --ayo-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --ayo-shadow-lg: 0 10px 15px rgba(0,0,0,0.10);
  --ayo-shadow-xl: 0 20px 25px rgba(0,0,0,0.10);

  /* ── Transitions ───────────────────────────── */
  --ayo-duration-fast:   100ms;
  --ayo-duration-normal: 200ms;
  --ayo-duration-slow:   300ms;
  --ayo-easing-default:  cubic-bezier(0.4, 0, 0.2, 1);

  /* ── Z-Index Scale ─────────────────────────── */
  --ayo-z-dropdown: 1000;
  --ayo-z-modal:    1100;
  --ayo-z-toast:    1200;
  --ayo-z-tooltip:  1300;
}

/* ── Dark Mode (automatic) ─────────────────── */
@media (prefers-color-scheme: dark) {
  :root {
    --ayo-color-text:           #f1f5f9;
    --ayo-color-text-muted:     #94a3b8;
    --ayo-color-border:         #1e293b;
    --ayo-color-surface:        #0f172a;
    --ayo-color-surface-raised: #1e293b;
    --ayo-color-overlay:        rgba(0, 0, 0, 0.7);
  }
}
```

---

## 8. ThemeProvider Contract

```tsx
// Thin injector — zero runtime CSS generation
export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const cssVars = useMemo(() => {
    if (!theme) return {}
    return Object.entries(theme).reduce((acc, [key, value]) => {
      const cssVar = TOKEN_MAP[key as keyof AyoTheme]
      if (cssVar && value) acc[cssVar] = value
      return acc
    }, {} as Record<string, string>)
  }, [theme])

  return <div style={cssVars as React.CSSProperties}>{children}</div>
}
```

### 3 Ways Consumers Can Theme

```tsx
// Way 1: Pure CSS (zero JS, zero runtime)
:root { --ayo-color-primary: #e11d48; }

// Way 2: React ThemeProvider (programmatic, dynamic)
<ThemeProvider theme={{ colorPrimary: '#e11d48', radiusMd: '4px' }}>
  <App />
</ThemeProvider>

// Way 3: Scoped theming (section-level, not global)
<ThemeProvider theme={{ colorPrimary: '#e11d48' }}>
  <CheckoutFlow />
</ThemeProvider>
```

---

## 9. Project Structure

```
@ayo-ui/react/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Quality gate — every PR
│       └── release.yml         # Changesets publish + Storybook deploy
├── .changeset/
│   └── config.json
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── Button.module.css
│   │   └── ... (14 components, same pattern)
│   ├── tokens/
│   │   └── tokens.css
│   ├── hooks/
│   │   ├── useFocusTrap.ts
│   │   └── useToast.ts
│   ├── ThemeProvider/
│   │   └── ThemeProvider.tsx
│   └── index.ts                # Single barrel export
├── storybook/
│   ├── main.ts
│   └── preview.ts
├── tsconfig.json
├── tsup.config.ts
├── jest.config.ts
├── jest.setup.ts
├── package.json
├── README.md
└── CHANGELOG.md                # Auto-generated by Changesets
```

---

## 10. Build Configuration

### `tsup.config.ts`

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,                         // Types generated separately via tsc
  splitting: true,                    // Tree-shaking per component
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  injectStyle: false,                 // CSS stays as separate files (SSR-safe)
  treeshake: true,
})
```

> **Note:** Types are generated via `tsc --emitDeclarationOnly` (not tsup's built-in `dts`).
> This preserves TypeScript generics such as `DataTable<T>` reliably.

### `package.json` (Critical Fields)

```json
{
  "name": "@ayo-ui/react",
  "version": "0.0.0",
  "description": "Accessible React component library with full theming",
  "keywords": ["react", "ui", "components", "accessible", "wcag", "typescript"],
  "license": "MIT",
  "main":   "./dist/index.js",
  "module": "./dist/index.mjs",
  "types":  "./dist/index.d.ts",
  "exports": {
    ".": {
      "import":  "./dist/index.mjs",
      "require": "./dist/index.js",
      "types":   "./dist/index.d.ts"
    },
    "./styles": "./dist/tokens.css"
  },
  "files": ["dist"],
  "sideEffects": ["**/*.css"],
  "publishConfig": { "access": "public" },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "scripts": {
    "build":           "tsup && tsc --emitDeclarationOnly",
    "dev":             "tsup --watch",
    "test":            "jest --coverage",
    "storybook":       "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "lint":            "eslint src --ext .ts,.tsx",
    "typecheck":       "tsc --noEmit",
    "changeset":       "changeset",
    "release":         "changeset publish"
  }
}
```

---

## 11. Testing Strategy

### Three-Layer Test Suite Per Component

| Layer | What It Tests |
|---|---|
| **Rendering** | All prop combinations render correctly; `forwardRef` works; `className` merges |
| **Behaviour** | Click, keyboard, focus events produce correct outcomes |
| **Accessibility** | `axe-core` passes (hard gate); keyboard navigation verified |

### Coverage Thresholds (Hard Gate in CI)

```
branches:   85%
functions:  85%
lines:      85%
statements: 85%
```

A PR **cannot be merged** if coverage drops below these thresholds.

### `jest.config.ts` Key Settings

```ts
{
  testEnvironment: 'jsdom',
  moduleNameMapper: { '\\.css$': 'identity-obj-proxy' },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.tsx',   // Excluded
    '!src/index.ts',           // Excluded
  ],
  coverageThresholds: {
    global: { branches: 85, functions: 85, lines: 85, statements: 85 }
  }
}
```

### Special Test Cases Per Component

| Component | Critical Test |
|---|---|
| `Modal` | Focus returns to trigger on close; Escape key closes; scroll lock applied/removed |
| `Select` | Arrow keys navigate options; ARIA combobox attributes correct |
| `DataTable` | Sort order matches expected; TypeScript generic `T` enforced at compile time |
| `Toast` | `useToast()` hook renders notification correctly |
| `Checkbox` | Indeterminate state set via `ref.indeterminate` |
| `Tabs` | ARIA `tabpanel` association correct |
| `Form` | Works with React Hook Form `register` |
| `Modal` + `Toast` | `isMounted` guard prevents SSR crash |

### Consumer Integration Test (CI)

A minimal Next.js app in the CI pipeline that:
1. Installs the built `dist/` output directly
2. Renders key components
3. Confirms styles are applied correctly

This catches silent CSS Module failures that `identity-obj-proxy` masks in Jest.

---

## 12. Storybook Documentation Standards

### Storybook Stack

```
@storybook/react-vite          — Framework
@storybook/addon-essentials    — Controls, Actions, Docs, Viewport
@storybook/addon-a11y          — Live axe-core panel
@storybook/addon-interactions  — Play function step-through
@storybook/addon-themes        — Dark/light mode toolbar toggle
```

### Story Hierarchy

```
Foundation/
  ├── Button
  ├── Badge
  ├── Spinner
  └── Avatar
Interaction/
  ├── Input
  ├── Checkbox
  ├── Select
  ├── Tooltip
  └── Toast
Showcase/
  ├── Modal
  ├── Tabs
  ├── Accordion
  ├── Form
  └── DataTable
System/
  ├── Tokens        ← Visual design token reference
  └── ThemeProvider ← Live theming demo
```

### Mandatory Stories Per Component

| Story | Purpose |
|---|---|
| `Default` | Component with zero props — the baseline |
| `AllVariants` | Every `variant` prop rendered side-by-side |
| `AllSizes` | Every `size` prop rendered side-by-side |
| `Disabled` | Disabled state |
| `Loading` | Loading/pending state (where applicable) |
| `DarkMode` | Rendered on dark background |
| `Playground` | All props exposed as Storybook Controls |

### Story Format (CSF3)

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Foundation/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const AllVariants: Story = { render: () => <> ... </> }
export const Playground: Story = { args: { children: 'Customise me' } }
```

### System/Tokens Page

A documentation-only story rendering all design tokens visually:
- Colour swatches with hex values
- Spacing scale with pixel measurements
- Border radius preview
- Shadow cards
- Typography scale

---

## 13. GitHub Actions CI/CD

### Workflow Overview

```
.github/workflows/
├── ci.yml       → Runs on every PR and push to main
└── release.yml  → Runs on merge to main (Changesets + Storybook deploy)
```

### `ci.yml` — 6 Hard Gates (Every PR)

| Gate | Failure Behaviour |
|---|---|
| ESLint | PR blocked |
| TypeScript typecheck (`tsc --noEmit`) | PR blocked |
| All tests pass | PR blocked |
| Coverage ≥ 85% | PR blocked |
| Library builds successfully | PR blocked |
| Built output is importable (`node -e "require('./dist/index.js')"`) | PR blocked |

### `release.yml` — Automated Publishing

**Changesets release flow:**

```
Developer makes changes
      ↓
Runs: npx changeset → describes change (patch/minor/major)
      ↓
Opens PR → CI quality gate runs
      ↓  (blocked if any gate fails)
Merged to main
      ↓
Changesets Action creates "Version Packages" PR automatically
      ↓
"Version Packages" PR merged
      ↓
GitHub Actions:
  ├── Bumps version in package.json
  ├── Updates CHANGELOG.md
  ├── Publishes @ayo-ui/react to npm
  └── Creates GitHub Release with notes

Storybook deploy (independent job):
  └── Deploys to https://{username}.github.io/ayo-ui/
      (triggered on every merge to main, not gated on release)
```

> **Key design decision:** Storybook deploy is **decoupled from the release job**.
> The Storybook always reflects `main` — the current source of truth.

### Required Secrets

| Secret | Source | Purpose |
|---|---|---|
| `NPM_TOKEN` | npmjs.com → Access Tokens | Publish to npm registry |
| `GITHUB_TOKEN` | Auto-provided by GitHub | Create releases, manage PRs |
| `CODECOV_TOKEN` | codecov.io | Upload coverage reports |

---

## 14. Accessibility Commitment

- **Standard:** WCAG 2.1 Level AA on every component
- **Hard gate:** `axe-core` violations = **failed test** (not a warning)
- **Keyboard navigation:** Tested with `@testing-library/user-event` on every interactive component
- **Storybook:** `addon-a11y` panel active for visual review during development
- **Focus management:** Modal traps focus; returns to trigger element on close
- **Decorative elements:** All decorative icons marked `aria-hidden`
- **Interactive elements:** All have accessible names via label, `aria-label`, or content
- **ARIA patterns used:**
  - Modal → `role="dialog"`, `aria-modal`, `aria-labelledby`
  - Select → ARIA combobox pattern
  - Tabs → `role="tablist"`, `role="tab"`, `role="tabpanel"`
  - Toast → `role="status"` or `role="alert"` depending on severity
  - Spinner → `aria-busy`, `aria-label`

---

## 15. README Structure (v1.0 Mandatory)

```markdown
# @ayo-ui/react
{Tagline} · {npm badge} · {coverage badge} · {license badge} · {Storybook badge}

## Installation
## Quick Start
## ThemeProvider Setup
## Component List (table with Storybook links)
## Accessibility
## Contributing
## Changelog
## License
```

---

## 16. Decision Log

| # | Decision | Alternatives Considered | Rationale |
|---|---|---|---|
| 1 | **Styling: Vanilla CSS + CSS Modules** | CSS-in-JS, plain CSS | Zero runtime, scoped, SSR-safe |
| 2 | **Theming: CSS vars + ThemeProvider** | ThemeProvider only, CSS only | Best of both — zero overhead |
| 3 | **Build: tsup** | Vite library mode, Rollup | Zero-config, fastest, industry standard for libs |
| 4 | **Types: `tsc --emitDeclarationOnly`** | tsup `dts: true` | Preserves TypeScript generics reliably |
| 5 | **Versioning: Changesets** | Semantic Release | Human-written changelogs, deliberate versioning |
| 6 | **Structure: Single package** | Turborepo monorepo | YAGNI — complexity without v1 benefit |
| 7 | **React 18+ only** | React 17 support | Modern APIs, React 17 end-of-support |
| 8 | **Package: `@ayo-ui/react`** | Unscoped name | Professional, mirrors major libraries |
| 9 | **14 components** | Minimal (4), Comprehensive (20+) | Quality over quantity, covers key complexity tiers |
| 10 | **Dark mode: `prefers-color-scheme`** | Manual toggle only | Free automatic dark mode, no JS needed |

---

## 17. Multi-Agent Review — Accepted Resolutions

> This design was reviewed by Skeptic, Constraint Guardian, User Advocate, and Arbiter agents.
> Final disposition: **✅ APPROVED**

| # | Objection | Agent | Resolution Applied |
|---|---|---|---|
| 1 | CSS Modules + tsup can silently fail | Skeptic | Consumer integration test app added to CI |
| 2 | Scoped npm packages are private by default | Skeptic | `"publishConfig": { "access": "public" }` added to `package.json` |
| 3 | DataTable generics may collapse in `.d.ts` | Skeptic | Use `tsc --emitDeclarationOnly` separately from tsup |
| 4 | Portal-based components crash on SSR | Constraint Guardian | `isMounted` guard via `useEffect` on Modal and Toast |
| 5 | CSS bundle not tree-shaken per component | Constraint Guardian | **Rejected** — expected behaviour, documented |
| 6 | Storybook deploy gated on release job | Constraint Guardian | Storybook deploy decoupled — triggers on every `main` merge |
| 7 | No README or onboarding path defined | User Advocate | README structure added to v1.0 scope |
| 8 | Toast imperative API not discoverable | User Advocate | `useToast` hook exported + JSDoc comments added |
| 9 | Form component API was ambiguous | User Advocate | Explicit compound component API defined (Section 6) |

---

## 18. Implementation Readiness Checklist

- [x] Understanding Lock confirmed by user
- [x] All 8 clarifying questions answered
- [x] Design approach selected: **Approach 1 — Single Package + tsup**
- [x] All 7 design sections reviewed and confirmed
- [x] Multi-agent review complete (Skeptic · Constraint Guardian · User Advocate · Arbiter)
- [x] 8 of 9 objections accepted and resolved in design
- [x] 1 objection rejected with documented rationale
- [x] Decision Log complete (10 entries)
- [x] Arbiter disposition: **APPROVED**

### ✅ Ready for Implementation

---

*Generated via structured brainstorming + multi-agent design review.*
*Antigravity AI · 2026-05-15*
