import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable, { Column } from './DataTable';
import { createEntity, updateEntity, deleteEntity, getEntities } from '../../services/adminService';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const columns: Column[] = [
    { id: 'ID', label: 'ID', type: 'number' },
    { id: 'username', label: 'Username', type: 'text' },
    { id: 'full_name', label: 'Full Name', type: 'text' },
    { id: 'avatar', label: 'Avatar', type: 'image' },
    { id: 'age', label: 'Age', type: 'number' },
    { id: 'school', label: 'School', type: 'text' },
    { id: 'major', label: 'Major', type: 'text' },
    { id: 'bio', label: 'Bio', type: 'text' },
    { id: 'is_admin', label: 'Is Admin', type: 'boolean' },
    { id: 'created_at', label: 'Created At', type: 'date' },
    { id: 'last_login', label: 'Last Login', type: 'date' },
    { id: 'total_message', label: 'Total Messages', type: 'number' },
    { id: 'total_reaction', label: 'Total Reactions', type: 'number' },
    { id: 'point', label: 'Points', type: 'number' },
    { id: 'title', label: 'Title', type: 'text' },
    { id: 'location', label: 'Location', type: 'text' },
    { id: 'occupation', label: 'Occupation', type: 'text' },
  ];

  const fetchUsers = async () => {
    try {
      const data = await getEntities('users');
      console.log(data);
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async (data: any) => {
    try {
      await createEntity('users', data);
      setSuccess('User created successfully');
      fetchUsers();
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const handleEdit = async (id: number, data: any) => {
    try {
      await updateEntity('users', id, data);
      setSuccess('User updated successfully');
      fetchUsers();
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEntity('users', id);
      setSuccess('User deleted successfully');
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="User"
      />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserManagement; 