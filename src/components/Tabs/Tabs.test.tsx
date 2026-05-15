import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from './Tabs';
import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('Tabs', () => {
  it('renders correctly and switches tabs on click', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
        <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
      </Tabs>
    );

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Tab 2'));

    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
  });

  it('passes accessibility audit', async () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab id="tab2">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
      </Tabs>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('does not switch to disabled tabs', () => {
    render(
      <Tabs defaultValue="tab1">
        <Tabs.List>
          <Tabs.Tab id="tab1">Tab 1</Tabs.Tab>
          <Tabs.Tab id="tab2" disabled>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="tab1">Content 1</Tabs.Panel>
        <Tabs.Panel id="tab2">Content 2</Tabs.Panel>
      </Tabs>
    );

    fireEvent.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });
});
