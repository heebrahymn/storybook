import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import styles from './Toast.module.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextType {
  toast: {
    success: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'message'>>) => void;
    error: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'message'>>) => void;
    warning: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'message'>>) => void;
    info: (message: string, options?: Partial<Omit<ToastItem, 'id' | 'type' | 'message'>>) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const addToast = useCallback((type: ToastType, message: string, options?: any) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, type, message, ...options };
    setToasts((prev) => [...prev, newToast]);

    const duration = options?.duration ?? 4000;
    if (duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (m: string, o?: any) => addToast('success', m, o),
    error: (m: string, o?: any) => addToast('error', m, o),
    warning: (m: string, o?: any) => addToast('warning', m, o),
    info: (m: string, o?: any) => addToast('info', m, o),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {isMounted &&
        ReactDOM.createPortal(
          <div className={styles.container}>
            {toasts.map((t) => (
              <div
                key={t.id}
                role={t.type === 'error' || t.type === 'warning' ? 'alert' : 'status'}
                className={`${styles.toast} ${styles[t.type]}`}
              >
                <div className={styles.content}>
                  {t.title && <span className={styles.title}>{t.title}</span>}
                  <span className={styles.message}>{t.message}</span>
                </div>
                <button
                  className={styles.closeButton}
                  onClick={() => removeToast(t.id)}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
