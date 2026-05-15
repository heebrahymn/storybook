import React, { forwardRef } from 'react';
import styles from './Spinner.module.css';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', label = 'Loading...', className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={`${styles.spinner} ${styles[size]} ${className}`}
        {...rest}
      >
        <span style={{ 
          position: 'absolute', 
          width: '1px', 
          height: '1px', 
          padding: 0, 
          margin: '-1px', 
          overflow: 'hidden', 
          clip: 'rect(0, 0, 0, 0)', 
          whiteSpace: 'nowrap', 
          borderWidth: 0 
        }}>
          {label}
        </span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
