import React, { createContext, useContext, useState, ReactNode, HTMLAttributes } from 'react';
import styles from './Tabs.module.css';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  children: ReactNode;
}

const TabsBase = ({ defaultValue, children, className = '', ...rest }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const baseId = React.useId();

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, baseId }}>
      <div className={`${styles.tabs} ${className}`} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const List = ({ children }: { children: ReactNode }) => (
  <div role="tablist" className={styles.list}>
    {children}
  </div>
);

const Tab = ({ id, children, disabled }: { id: string; children: ReactNode; disabled?: boolean }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Tab must be used within Tabs');

  const { activeTab, setActiveTab, baseId } = context;
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      id={`${baseId}-tab-${id}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${id}`}
      aria-disabled={disabled}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      className={`${styles.tab} ${isActive ? styles.activeTab : ''}`}
      onClick={() => !disabled && setActiveTab(id)}
    >
      {children}
    </button>
  );
};

const Panel = ({ id, children }: { id: string; children: ReactNode }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Panel must be used within Tabs');

  const { activeTab, baseId } = context;
  if (activeTab !== id) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${id}`}
      aria-labelledby={`${baseId}-tab-${id}`}
      className={styles.panel}
    >
      {children}
    </div>
  );
};

export const Tabs = Object.assign(TabsBase, {
  List,
  Tab,
  Panel,
});
