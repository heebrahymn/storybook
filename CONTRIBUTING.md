# Contributing to @ayo-ui/react

First off, thank you for considering contributing to @ayo-ui/react! It's people like you that make the web a better place.

## Development Workflow

1. **Fork and Clone**: Fork the repository and clone it to your local machine.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start Storybook**:
   ```bash
   npm run storybook
   ```
   This will start the development server at `http://localhost:6006`.
4. **Make Changes**:
   - Follow the established patterns (CSS Modules, forwardRef, TypeScript).
   - Ensure you add tests for any new features or bug fixes.
5. **Run Tests**:
   ```bash
   npm test
   ```
   All tests must pass and coverage should remain above 85%.
6. **Add a Changeset**:
   ```bash
   npx changeset
   ```
   Follow the prompts to describe your changes.
7. **Submit a PR**: Push your changes to your fork and open a Pull Request.

## Coding Standards

- Use **TypeScript** for all logic.
- Use **CSS Modules** for all styling.
- Every component must be wrapped in `forwardRef`.
- Every component must pass an `axe-core` accessibility audit.

Thank you!
