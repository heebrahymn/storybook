import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Column } from './DataTable';
import React from 'react';
import { Badge } from '../Badge/Badge';

interface User {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
}

const data: User[] = [
  { id: '1', name: 'Ayodele Ibraheem', role: 'Engineer', status: 'active' },
  { id: '2', name: 'John Smith', role: 'Designer', status: 'inactive' },
  { id: '3', name: 'Sarah Wilson', role: 'Manager', status: 'active' },
];

const columns: Column<User>[] = [
  { header: 'Name', accessor: 'name', key: 'name' },
  { header: 'Role', accessor: 'role', key: 'role' },
  {
    header: 'Status',
    key: 'status',
    accessor: (user) => (
      <Badge variant={user.status === 'active' ? 'success' : 'default'}>
        {user.status}
      </Badge>
    ),
  },
  {
    header: 'Actions',
    key: 'actions',
    accessor: () => <button style={{ cursor: 'pointer' }}>Edit</button>,
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Showcase/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof DataTable> = {
  args: {
    columns,
    data,
  },
};

export const Empty: StoryObj<typeof DataTable> = {
  args: {
    columns,
    data: [],
    emptyMessage: 'No users found matching your criteria.',
  },
};
