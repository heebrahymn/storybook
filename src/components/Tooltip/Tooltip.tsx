import React, { forwardRef, useState, ReactNode } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  Placement,
} from '@floating-ui/react';
import styles from './Tooltip.module.css';

export interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  placement?: Placement;
  delay?: number;
}

export const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  ({ children, content, placement = 'top', delay = 0 }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
      open: isOpen,
      onOpenChange: setIsOpen,
      placement,
      whileElementsMounted: autoUpdate,
      middleware: [offset(8), flip(), shift()],
    });

    const hover = useHover(context, { delay, move: false });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: 'tooltip' });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role,
    ]);

    const trigger = React.isValidElement(children) ? (
      React.cloneElement(children as React.ReactElement<any>, {
        ref: (node: any) => {
          refs.setReference(node);
          if (ref) {
            if (typeof ref === 'function') ref(node);
            else (ref as React.MutableRefObject<any>).current = node;
          }
          const { ref: childRef } = children as any;
          if (childRef) {
            if (typeof childRef === 'function') childRef(node);
            else childRef.current = node;
          }
        },
        ...getReferenceProps(),
      })
    ) : (
      <span ref={refs.setReference} {...getReferenceProps()} className={styles.trigger}>
        {children}
      </span>
    );

    return (
      <>
        {trigger}
        <FloatingPortal>
          {isOpen && (
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={styles.tooltip}
              {...getFloatingProps()}
            >
              {content}
            </div>
          )}
        </FloatingPortal>
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';
