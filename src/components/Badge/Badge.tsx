import { HTMLAttributes, forwardRef } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', children, className = '', ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
