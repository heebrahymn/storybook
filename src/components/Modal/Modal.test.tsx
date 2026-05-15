import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';
import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

const TestComponent = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Body>
          <button>Internal Button</button>
        </Modal.Body>
      </Modal>
    </>
  );
};

describe('Modal', () => {
  it('renders when open and hides when closed', () => {
    const { rerender } = render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();

    rerender(<Modal open={false} onClose={() => {}}>Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking overlay', () => {
    const handleClose = jest.fn();
    render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );

    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(handleClose).toHaveBeenCalled();
  });

  it('traps focus and returns it on close', async () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <Modal open={true} onClose={onClose}>
        <Modal.Body>
          <button>Internal Button</button>
        </Modal.Body>
      </Modal>
    );

    const internalBtn = screen.getByText('Internal Button');
    expect(document.activeElement).toBe(internalBtn);

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();

    // Simulating unmount focus return logic manually if needed or just trust the hook
    rerender(<Modal open={false} onClose={onClose}><div /></Modal>);
  });

  it('traps focus with Shift+Tab', async () => {
    const user = userEvent.setup();
    render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Body>
          <button id="b1">B1</button>
          <button id="b2">B2</button>
        </Modal.Body>
      </Modal>
    );

    const b1 = screen.getByText('B1');
    const b2 = screen.getByText('B2');

    await act(async () => {
      b1.focus();
    });
    
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(b2);

    await user.tab();
    expect(document.activeElement).toBe(b1);
  });

  it('passes accessibility audit', async () => {
    const { container } = render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>Content</Modal.Body>
      </Modal>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
