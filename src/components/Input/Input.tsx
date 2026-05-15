import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  prefixElement?: ReactNode;
  suffixElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, prefixElement, suffixElement, className = '', disabled, ...rest }, ref) => {
    return (
      <div className={`${styles.inputWrapper} ${hasError ? styles.error : ''} ${className}`}>
        {prefixElement && <div className={styles.prefix}>{prefixElement}</div>}
        <input
          ref={ref}
          className={styles.input}
          disabled={disabled}
          {...rest}
        />
        {suffixElement && <div className={styles.suffix}>{suffixElement}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';
