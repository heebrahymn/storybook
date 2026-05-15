import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ToastProvider, useToast } from './Toast';
import React from 'react';
import '@testing-library/jest-dom';

const TestComponent = () => {
  const { toast } = useToast();
  return (
    <button onClick={() => toast.success('Success message', { title: 'Success' })}>
      Show Toast
    </button>
  );
};

describe('Toast', () => {
  it('shows toast when called', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));

    expect(await screen.findByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveClass('success');
  });

  it('removes toast when close button is clicked', async () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    const closeButton = await screen.findByLabelText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
  });

  it('auto-dismisses toast after duration', async () => {
    jest.useFakeTimers();
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Show Toast'));
    expect(await screen.findByText('Success message')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
    jest.useRealTimers();
  });

  it('uses role="alert" for error and warning toasts', async () => {
    const ErrorComponent = () => {
      const { toast } = useToast();
      return <button onClick={() => toast.error('Error')}>Error</button>;
    };

    render(
      <ToastProvider>
        <ErrorComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Error'));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('handles warning and info types', async () => {
    const MixedComponent = () => {
      const { toast } = useToast();
      return (
        <>
          <button onClick={() => toast.warning('Warning')}>Warning</button>
          <button onClick={() => toast.info('Info')}>Info</button>
        </>
      );
    };

    render(
      <ToastProvider>
        <MixedComponent />
      </ToastProvider>
    );

    fireEvent.click(screen.getByText('Warning'));
    expect(await screen.findByRole('alert')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Info'));
    expect(await screen.findByRole('status')).toBeInTheDocument();
  });
});
