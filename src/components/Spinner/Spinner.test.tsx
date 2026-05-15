import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('Spinner', () => {
  it('renders correctly with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('md');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with correct size', () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('sm');

    rerender(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('lg');
  });

  it('uses custom label for accessibility', () => {
    render(<Spinner label="Fetching data..." />);
    expect(screen.getByLabelText('Fetching data...')).toBeInTheDocument();
    expect(screen.getByText('Fetching data...')).toBeInTheDocument();
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
