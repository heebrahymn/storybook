import { createContext, useContext, useState, ReactNode } from 'react';
import styles from './Accordion.module.css';

interface AccordionContextType {
  expandedIds: string[];
  toggleId: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

const AccordionBase = ({ children, allowMultiple = false, defaultExpanded = [], className = '' }: AccordionProps) => {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);

  const toggleId = (id: string) => {
    if (allowMultiple) {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setExpandedIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <AccordionContext.Provider value={{ expandedIds, toggleId }}>
      <div className={`${styles.accordion} ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

const Item = ({ children, className = '' }: { id: string; children: ReactNode; className?: string }) => (
  <div className={`${styles.item} ${className}`}>{children}</div>
);

const Trigger = ({ id, children, disabled }: { id: string; children: ReactNode; disabled?: boolean }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('Accordion.Trigger must be used within Accordion');

  const isExpanded = context.expandedIds.includes(id);

  return (
    <button
      type="button"
      disabled={disabled}
      aria-expanded={isExpanded}
      aria-disabled={disabled}
      className={`${styles.trigger} ${isExpanded ? styles.open : ''}`}
      onClick={() => !disabled && context.toggleId(id)}
    >
      <span>{children}</span>
      <span className={styles.icon}>▼</span>
    </button>
  );
};

const Content = ({ id, children }: { id: string; children: ReactNode }) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('Accordion.Content must be used within Accordion');

  if (!context.expandedIds.includes(id)) return null;

  return (
    <div role="region" className={styles.content}>
      {children}
    </div>
  );
};

export const Accordion = Object.assign(AccordionBase, {
  Item,
  Trigger,
  Content,
});
