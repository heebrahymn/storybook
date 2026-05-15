import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import React from 'react';

const meta: Meta<typeof Input> = {
  title: 'Interaction/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Invalid input',
    hasError: true,
  },
};

export const WithPrefix: Story = {
  args: {
    placeholder: 'Search...',
    prefixElement: <span>🔍</span>,
  },
};

export const WithSuffix: Story = {
  args: {
    placeholder: '0.00',
    suffixElement: <span>USD</span>,
  },
};

export const FullExample: Story = {
  args: {
    placeholder: 'Price',
    prefixElement: <span>$</span>,
    suffixElement: <span>USD</span>,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Cannot type here',
    disabled: true,
  },
};
