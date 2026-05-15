import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import React from 'react';
import { Button } from '../Button/Button';

const ToastDemo = () => {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="solid" onClick={() => toast.success('Operation completed successfully!', { title: 'Success' })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error('Something went wrong.', { title: 'Error' })}>
        Error
      </Button>
      <Button variant="ghost" onClick={() => toast.info('New update available.')}>
        Info
      </Button>
      <Button onClick={() => toast.warning('Low battery warning.', { duration: 10000 })}>
        Long Warning
      </Button>
    </div>
  );
};

const meta: Meta<typeof ToastProvider> = {
  title: 'Interaction/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof ToastProvider> = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
