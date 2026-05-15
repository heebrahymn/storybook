import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import React from 'react';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Interaction/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

export const DifferentPlacements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '4rem', padding: '4rem' }}>
      <Tooltip content="Top" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

export const PlainText: Story = {
  args: {
    content: 'Tooltips work on plain text too',
    children: <span style={{ textDecoration: 'underline' }}>Hover this text</span>,
  },
};
