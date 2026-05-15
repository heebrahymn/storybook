import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import React from 'react';

const meta: Meta<typeof Accordion> = {
  title: 'Showcase/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Accordion> = {
  render: () => (
    <Accordion>
      <Accordion.Item id="item-1">
        <Accordion.Trigger id="item-1">Is it accessible?</Accordion.Trigger>
        <Accordion.Content id="item-1">
          Yes. It adheres to the WAI-ARIA design pattern.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id="item-2">
        <Accordion.Trigger id="item-2">Is it unstyled?</Accordion.Trigger>
        <Accordion.Content id="item-2">
          Yes. It's unstyled by default, giving you full control over the look and feel.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id="item-3">
        <Accordion.Trigger id="item-3">Can it be animated?</Accordion.Trigger>
        <Accordion.Content id="item-3">
          Yes! You can use CSS animations or a library like Framer Motion.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};

export const AllowMultiple: StoryObj<typeof Accordion> = {
  render: () => (
    <Accordion allowMultiple defaultExpanded={['item-1']}>
      <Accordion.Item id="item-1">
        <Accordion.Trigger id="item-1">Section 1</Accordion.Trigger>
        <Accordion.Content id="item-1">Content for section 1.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id="item-2">
        <Accordion.Trigger id="item-2">Section 2</Accordion.Trigger>
        <Accordion.Content id="item-2">Content for section 2.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
