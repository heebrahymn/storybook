import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import styles from './Button.module.css';
import { Spinner } from '../Spinner/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${
          isLoading ? styles.loading : ''
        } ${className}`}
        {...rest}
      >
        {isLoading && (
          <span className={styles.spinnerWrapper}>
            <Spinner size={size === 'lg' ? 'md' : 'sm'} />
          </span>
        )}
        {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
        {children}
        {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
