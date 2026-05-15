import React, { ReactNode, HTMLAttributes } from 'react';
import styles from './Form.module.css';

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  htmlFor?: string;
}

export const FormItem = ({
  children,
  label,
  error,
  helperText,
  required,
  htmlFor,
  className = '',
  ...rest
}: FormItemProps) => {
  const errorId = error ? `${htmlFor}-error` : undefined;
  const helperId = helperText ? `${htmlFor}-helper` : undefined;

  return (
    <div className={`${styles.formItem} ${className}`} {...rest}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={`${styles.label} ${required ? styles.required : ''}`}
        >
          {label}
        </label>
      )}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement, {
            id: htmlFor,
            'aria-invalid': !!error,
            'aria-describedby': [errorId, helperId].filter(Boolean).join(' ') || undefined,
            hasError: !!error, // Pass down hasError for components that support it
          } as any);
        }
        return child;
      })}
      {error && (
        <span id={errorId} role="alert" className={styles.errorText}>
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={helperId} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};
