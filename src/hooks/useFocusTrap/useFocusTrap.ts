import { useEffect, RefObject } from 'react';

export const useFocusTrap = (ref: RefObject<HTMLElement | null>, active: boolean) => {
  useEffect(() => {
    if (!active || !ref.current) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !ref.current) return;

      const el = ref.current;
      if (!el.contains(e.target as Node)) return;

      const focusableElements = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const firstFocusable = ref.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )[0];
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, ref]);
};
