import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('Badge', () => {
  it('renders correctly with default props', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('default', 'md');
  });

  it('renders correctly with different variants and sizes', () => {
    const { rerender } = render(<Badge variant="success" size="sm">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('success', 'sm');

    rerender(<Badge variant="danger">Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('danger', 'md');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<Badge>Accessible Badge</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
