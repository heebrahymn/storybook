import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
    expect(screen.getByRole('button')).toHaveClass('solid', 'md');
  });

  it('renders correctly with different variants and sizes', () => {
    const { rerender } = render(<Button variant="outline" size="sm">Small Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('outline', 'sm');

    rerender(<Button variant="ghost" size="lg">Large Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('ghost', 'lg');
  });

  it('handles loading state correctly', () => {
    render(<Button isLoading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveClass('loading');
    expect(screen.getByLabelText('Loading...')).toBeInTheDocument();
  });

  it('handles disabled state correctly', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('merges custom className correctly', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class', 'button');
  });

  it('renders icons correctly', () => {
    render(
      <Button leftIcon={<span data-testid="left">L</span>} rightIcon={<span data-testid="right">R</span>}>
        Icon Button
      </Button>
    );
    expect(screen.getByTestId('left')).toBeInTheDocument();
    expect(screen.getByTestId('right')).toBeInTheDocument();
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes accessibility audit when loading', async () => {
    const { container } = render(<Button isLoading>Loading Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

import React from 'react';
