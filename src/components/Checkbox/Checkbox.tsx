import React, { forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate, className = '', disabled, ...rest }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const combinedRef = (ref as React.MutableRefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate, combinedRef]);

    return (
      <label className={`${styles.container} ${disabled ? styles.disabled : ''} ${className}`}>
        <input
          type="checkbox"
          ref={combinedRef}
          className={styles.input}
          disabled={disabled}
          {...rest}
        />
        {label && <span>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
