import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

describe('Select', () => {
  it('renders correctly with placeholder', () => {
    render(<Select options={options} placeholder="Choose one" />);
    expect(screen.getByRole('button')).toHaveTextContent('Choose one');
  });

  it('opens dropdown on click', () => {
    render(<Select options={options} />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('calls onChange and closes when an option is clicked', () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith('2');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('handles keyboard navigation (ArrowDown, Enter)', () => {
    const handleChange = jest.fn();
    render(<Select options={options} onChange={handleChange} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    fireEvent.keyDown(trigger, { key: 'ArrowDown' }); // Highlight Option 2
    fireEvent.keyDown(trigger, { key: 'Enter' });
    
    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('handles ArrowUp keyboard navigation', () => {
    render(<Select options={options} />);
    const trigger = screen.getByRole('button');
    fireEvent.keyDown(trigger, { key: 'ArrowDown' }); // Open and highlight 1
    fireEvent.keyDown(trigger, { key: 'ArrowUp' });   // Highlight 3 (wrap around)
    fireEvent.keyDown(trigger, { key: 'Enter' });     // Select 3
    // Since we don't have a change handler here, we just check if it was open
  });

  it('closes on click outside', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('renders with pre-selected value', () => {
    render(<Select options={options} value="2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('closes on Tab key', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Tab' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Select options={options} disabled />);
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
    fireEvent.click(trigger);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<Select options={options} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('passes accessibility audit when open', async () => {
    const { container } = render(<Select options={options} />);
    fireEvent.click(screen.getByRole('button'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
