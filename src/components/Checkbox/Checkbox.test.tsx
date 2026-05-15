import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('Checkbox', () => {
  it('renders correctly with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = jest.fn();
    render(<Checkbox label="Toggle" onChange={handleChange} />);
    const checkbox = screen.getByLabelText('Toggle');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });

  it('handles indeterminate state', () => {
    const { container } = render(<Checkbox indeterminate />);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
  });

  it('handles disabled state', () => {
    render(<Checkbox disabled label="Disabled" />);
    const checkbox = screen.getByLabelText('Disabled');
    expect(checkbox).toBeDisabled();
    expect(checkbox.parentElement).toHaveClass('disabled');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<Checkbox label="Accessible Checkbox" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
