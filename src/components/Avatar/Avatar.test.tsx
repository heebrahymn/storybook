import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar, AvatarGroup } from './Avatar';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="test.jpg" alt="User Avatar" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.jpg');
    expect(img).toHaveAttribute('alt', 'User Avatar');
  });

  it('renders initials when src fails or is not provided', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<Avatar name="John" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('handles image error by falling back to initials', () => {
    render(<Avatar src="invalid.jpg" name="John Doe" />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders with correct size and shape', () => {
    const { rerender } = render(<Avatar size="xl" shape="square" name="John" />);
    const avatar = screen.getByText('J').parentElement;
    expect(avatar).toHaveClass('xl', 'square');

    rerender(<Avatar size="sm" shape="circle" name="John" />);
    expect(avatar).toHaveClass('sm', 'circle');
  });

  it('AvatarGroup renders children correctly', () => {
    render(
      <AvatarGroup>
        <Avatar name="A" />
        <Avatar name="B" />
      </AvatarGroup>
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<Avatar name="John Doe" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
