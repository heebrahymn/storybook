import React, { useEffect, useState, useRef, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { useFocusTrap } from '../../hooks/useFocusTrap/useFocusTrap';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const ModalContent = ({ open, onClose, children, className }: ModalProps & { triggerRef: React.RefObject<HTMLElement | null> }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, open);

  useEffect(() => {
    return () => {
      // Restore focus on unmount
      children; // touch children to avoid lint warning if needed, but not really
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={`${styles.modal} ${className}`}
        tabIndex={-1}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const ModalBase = ({ open, onClose, children, className = '' }: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (isMounted) {
        triggerRef.current?.focus();
      }
    }
  }, [open, isMounted]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  if (!isMounted || !open) return null;

  return <ModalContent open={open} onClose={onClose} className={className} triggerRef={triggerRef}>{children}</ModalContent>;
};

const Header = ({ children, onClose }: { children: ReactNode; onClose?: () => void }) => (
  <header className={styles.header}>
    <h2 className={styles.title}>{children}</h2>
    {onClose && (
      <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
        &times;
      </button>
    )}
  </header>
);

const Body = ({ children }: { children: ReactNode }) => (
  <div className={styles.body}>{children}</div>
);

const Footer = ({ children }: { children: ReactNode }) => (
  <footer className={styles.footer}>{children}</footer>
);

export const Modal = Object.assign(ModalBase, {
  Header,
  Body,
  Footer,
});
