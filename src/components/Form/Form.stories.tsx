import type { Meta, StoryObj } from '@storybook/react';
import { FormItem } from './Form';
import { Input } from '../Input/Input';
import { Checkbox } from '../Checkbox/Checkbox';
import { Select } from '../Select/Select';
import React from 'react';

const meta: Meta<typeof FormItem> = {
  title: 'Showcase/Form',
  component: FormItem,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof FormItem> = {
  args: {
    label: 'Username',
    htmlFor: 'username',
    children: <Input placeholder="Enter your username" />,
  },
};

export const Required: StoryObj<typeof FormItem> = {
  args: {
    label: 'Email',
    htmlFor: 'email',
    required: true,
    children: <Input type="email" placeholder="you@example.com" />,
  },
};

export const WithError: StoryObj<typeof FormItem> = {
  args: {
    label: 'Password',
    htmlFor: 'password',
    error: 'Password must be at least 8 characters long',
    children: <Input type="password" />,
  },
};

export const FullForm: StoryObj<any> = {
  render: () => (
    <form style={{ maxWidth: '400px' }} onSubmit={(e) => e.preventDefault()}>
      <FormItem label="Full Name" htmlFor="name" required>
        <Input placeholder="John Doe" />
      </FormItem>
      <FormItem label="Email" htmlFor="email" required helperText="We will never share your email.">
        <Input type="email" placeholder="john@example.com" />
      </FormItem>
      <FormItem label="Role" htmlFor="role">
        <Select
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Viewer', value: 'viewer' },
          ]}
        />
      </FormItem>
      <FormItem htmlFor="terms">
        <Checkbox label="I agree to the terms and conditions" />
      </FormItem>
      <button type="submit" style={{
        backgroundColor: 'var(--ayo-color-primary)',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Submit
      </button>
    </form>
  ),
};
