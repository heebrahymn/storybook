import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import React, { useState } from 'react';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
];

const meta: Meta<typeof Select> = {
  title: 'Interaction/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select an option...',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('1');
    return <Select options={options} value={value} onChange={setValue} />;
  },
};

export const WithError: Story = {
  args: {
    options,
    hasError: true,
  },
};

export const Disabled: Story = {
  args: {
    options,
    disabled: true,
  },
};
