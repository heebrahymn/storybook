import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import React from 'react';

const meta: Meta<typeof Tabs> = {
  title: 'Showcase/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs defaultValue="account">
      <Tabs.List>
        <Tabs.Tab id="account">Account</Tabs.Tab>
        <Tabs.Tab id="password">Password</Tabs.Tab>
        <Tabs.Tab id="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="account">
        <p>Make changes to your account here. Click save when you're done.</p>
      </Tabs.Panel>
      <Tabs.Panel id="password">
        <p>Change your password here. After saving, you'll be logged out.</p>
      </Tabs.Panel>
      <Tabs.Panel id="settings">
        <p>Manage your notifications and other preferences.</p>
      </Tabs.Panel>
    </Tabs>
  ),
};
