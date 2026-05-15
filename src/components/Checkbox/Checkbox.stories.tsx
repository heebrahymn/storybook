import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Interaction/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Checkbox Label',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate state',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};
