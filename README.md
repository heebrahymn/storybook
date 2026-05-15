# @ayo-ui/react

An accessible, premium React component library built for speed, performance, and developer experience.

![NPM Version](https://img.shields.io/npm/v/@ayo-ui/react?color=blue&style=flat-square)
![License](https://img.shields.io/npm/l/@ayo-ui/react?style=flat-square)
![Coverage](https://img.shields.io/codecov/c/github/ayodele/ayo-ui?style=flat-square)

## 🚀 Features

- **Accessible**: WAI-ARIA compliant components with 100% `axe-core` pass rate.
- **Themable**: Centralized design token system using CSS Modules and CSS Variables.
- **Type-Safe**: Written in TypeScript with strict mode and generic support (e.g., `DataTable<T>`).
- **Lightweight**: Zero-runtime CSS and minimal external dependencies.
- **Showcase Components**: Includes complex components like Modal (with focus trapping), Tabs, and DataTable.

## 📦 Installation

```bash
npm install @ayo-ui/react
```

## 🛠️ Quick Start

```tsx
import { Button, ThemeProvider } from '@ayo-ui/react';
import '@ayo-ui/react/styles';

function App() {
  return (
    <ThemeProvider>
      <Button variant="solid" onClick={() => alert('Hello!')}>
        Click Me
      </Button>
    </ThemeProvider>
  );
}
```

## 🎨 ThemeProvider Setup

The `ThemeProvider` injects the necessary CSS variables into your application. You can customize the theme by passing an `AyoTheme` object.

```tsx
import { ThemeProvider, AyoTheme } from '@ayo-ui/react';

const myTheme: AyoTheme = {
  colors: {
    primary: '#6366f1',
    secondary: '#ec4899',
  },
};

export default function Root() {
  return (
    <ThemeProvider theme={myTheme}>
      <App />
    </ThemeProvider>
  );
}
```

## 📚 Component List

| Component | Status | Description |
|---|---|---|
| **Button** | ✅ | Variants (solid, outline, ghost), sizes, loading states. |
| **Input** | ✅ | Standard text input with error states and prefix/suffix support. |
| **Select** | ✅ | Custom accessible combobox with keyboard navigation. |
| **Modal** | ✅ | Accessible dialog with focus trapping and portal rendering. |
| **Tabs** | ✅ | Fully accessible tab interface. |
| **DataTable** | ✅ | Generic data grid with sorting and pagination. |
| **Toast** | ✅ | Global notification system via imperative API. |
| **Accordion** | ✅ | Collapsible sections with height animations. |
| **Tooltip** | ✅ | Floating panels triggered by hover or focus. |

## ♿ Accessibility

Accessibility is at the core of `@ayo-ui/react`. We use:
- **Focus Trapping**: In Modals and Selects to ensure keyboard users never get lost.
- **Semantic HTML**: Correct roles, states, and properties.
- **Keyboard Support**: Full support for `Tab`, `Space`, `Enter`, `Escape`, and `Arrow` keys.

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📄 License

MIT © [Ayodele Ibraheem](https://github.com/ayodele)
