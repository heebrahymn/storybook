import { render, screen } from '@testing-library/react';
import { DataTable, Column } from './DataTable';
import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { header: 'ID', accessor: 'id', key: 'id' },
  { header: 'Name', accessor: 'name', key: 'name' },
  { header: 'Email', accessor: 'email', key: 'email' },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

describe('DataTable', () => {
  it('renders table headers and data', () => {
    render(<DataTable columns={columns} data={data} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('renders custom empty message when no data', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Nothing found" />);
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('renders custom cell content via accessor function', () => {
    const customCols: Column<User>[] = [
      { header: 'Action', key: 'action', accessor: (u) => <button>Edit {u.name}</button> }
    ];
    render(<DataTable columns={customCols} data={data} />);
    expect(screen.getByText('Edit John Doe')).toBeInTheDocument();
  });

  it('passes accessibility audit', async () => {
    const { container } = render(<DataTable columns={columns} data={data} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
