import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from './Accordion';
import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

describe('Accordion', () => {
  it('toggles content when trigger is clicked', () => {
    render(
      <Accordion>
        <Accordion.Item id="item1">
          <Accordion.Trigger id="item1">Trigger 1</Accordion.Trigger>
          <Accordion.Content id="item1">Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Trigger 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Trigger 1'));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('handles allowMultiple correctly', () => {
    render(
      <Accordion allowMultiple>
        <Accordion.Item id="1">
          <Accordion.Trigger id="1">T1</Accordion.Trigger>
          <Accordion.Content id="1">C1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item id="2">
          <Accordion.Trigger id="2">T2</Accordion.Trigger>
          <Accordion.Content id="2">C2</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    fireEvent.click(screen.getByText('T1'));
    fireEvent.click(screen.getByText('T2'));
    expect(screen.getByText('C1')).toBeInTheDocument();
    expect(screen.getByText('C2')).toBeInTheDocument();
  });

  it('does not toggle when disabled', () => {
    render(
      <Accordion>
        <Accordion.Item id="1">
          <Accordion.Trigger id="1" disabled>Trigger 1</Accordion.Trigger>
          <Accordion.Content id="1">Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    fireEvent.click(screen.getByText('Trigger 1'));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('passes accessibility audit', async () => {
    const { container } = render(
      <Accordion>
        <Accordion.Item id="1">
          <Accordion.Trigger id="1">T1</Accordion.Trigger>
          <Accordion.Content id="1">C1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
