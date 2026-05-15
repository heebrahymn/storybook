import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('Tooltip', () => {
  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip content">
        <button>Hover me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    await user.hover(trigger);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Tooltip content');
  });

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Focus content">
        <button>Focus me</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    await act(async () => {
      trigger.focus();
    });

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  it('hides tooltip on Escape key', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Escape me">
        <button>Trigger</button>
      </Tooltip>
    );

    const trigger = screen.getByRole('button');
    await user.hover(trigger);
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('passes accessibility audit', async () => {
    const { container } = render(
      <Tooltip content="Accessible tooltip">
        <button>Trigger</button>
      </Tooltip>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders correctly with string children', () => {
    render(<Tooltip content="Label">Hover me</Tooltip>);
    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('does not render tooltip by default', () => {
    render(
      <Tooltip content="Tooltip Label">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
