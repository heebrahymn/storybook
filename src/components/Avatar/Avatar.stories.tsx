import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';
import React from 'react';

const meta: Meta<typeof Avatar> = {
  title: 'Foundation/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    name: 'Jane Smith',
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    name: 'Square Avatar',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar size="sm" name="Small" />
      <Avatar size="md" name="Medium" />
      <Avatar size="lg" name="Large" />
      <Avatar size="xl" name="Extra Large" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Charlie" />
      <Avatar name="David" />
    </AvatarGroup>
  ),
};
