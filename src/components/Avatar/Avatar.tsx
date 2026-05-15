import React, { forwardRef, useState, useEffect, HTMLAttributes } from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size = 'md', shape = 'circle', className = '', ...rest }, ref) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setHasError(false);
    }, [src]);

    const getInitials = (fullName?: string) => {
      if (!fullName) return '';
      const parts = fullName.split(' ');
      if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
      }
      return fullName[0].toUpperCase();
    };

    const renderContent = () => {
      if (src && !hasError) {
        return (
          <img
            src={src}
            alt={alt || name}
            className={styles.img}
            onError={() => setHasError(true)}
          />
        );
      }
      return <span className={styles.initials}>{getInitials(name)}</span>;
    };

    return (
      <div
        ref={ref}
        className={`${styles.avatar} ${styles[size]} ${styles[shape]} ${className}`}
        {...rest}
      >
        {renderContent()}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ children, className = '', ...rest }) => {
  return (
    <div className={`${styles.group} ${className}`} {...rest}>
      {children}
    </div>
  );
};
