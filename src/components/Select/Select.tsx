import { forwardRef, useState, useRef, useEffect, KeyboardEvent } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: string;
  id?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, value, onChange, placeholder = 'Select an option', disabled, hasError, className = '', id }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = `${id || 'select'}-listbox`;

    const selectedOption = options.find((opt) => opt.value === value);

    const toggleOpen = () => {
      if (!disabled) setIsOpen(!isOpen);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
          setHighlightedIndex((prev) => (prev + 1) % options.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) setIsOpen(true);
          setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && highlightedIndex >= 0) {
            onChange?.(options[highlightedIndex].value);
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'Tab':
          setIsOpen(false);
          break;
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={containerRef} className={`${styles.container} ${isOpen ? styles.open : ''} ${className}`}>
        <button
          ref={ref}
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          className={`${styles.trigger} ${hasError ? styles.error : ''}`}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        >
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
          <span className={styles.icon}>▼</span>
        </button>

        {isOpen && (
          <ul
            id={listboxId}
            role="listbox"
            className={styles.dropdown}
            aria-label="Options"
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                className={`${styles.option} ${value === option.value ? styles.selected : ''} ${
                  highlightedIndex === index ? styles.highlighted : ''
                }`}
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
