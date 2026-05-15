import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('handles controlled value change', () => {
    const handleChange = jest.fn();
    render(<Input value="Initial" onChange={handleChange} />);
    const input = screen.getByDisplayValue('Initial');
    fireEvent.change(input, { target: { value: 'Changed' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('applies error styles when hasError is true', () => {
    const { container } = render(<Input hasError />);
    expect(container.firstChild).toHaveClass('error');
  });

  it('renders prefix and suffix elements', () => {
    render(
      <Input
        prefixElement={<span data-testid="pre">$</span>}
        suffixElement={<span data-testid="suf">.00</span>}
      />
    );
    expect(screen.getByTestId('pre')).toBeInTheDocument();
    expect(screen.getByTestId('suf')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<Input aria-label="Search" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
