import { render, screen } from '@testing-library/react';
import { FormItem } from './Form';
import { Input } from '../Input/Input';
import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('FormItem', () => {
  it('renders label and input correctly', () => {
    render(
      <FormItem label="Email" htmlFor="email">
        <Input placeholder="Enter email" />
      </FormItem>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toHaveAttribute('id', 'email');
  });

  it('renders error message and applies aria-invalid', () => {
    render(
      <FormItem label="Name" htmlFor="name" error="Name is required">
        <Input />
      </FormItem>
    );

    expect(screen.getByText('Name is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'name-error');
  });

  it('renders helper text', () => {
    render(
      <FormItem label="Username" htmlFor="user" helperText="Choose a unique name">
        <Input />
      </FormItem>
    );

    expect(screen.getByText('Choose a unique name')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'user-helper');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(
      <FormItem label="Test" htmlFor="test">
        <Input />
      </FormItem>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
