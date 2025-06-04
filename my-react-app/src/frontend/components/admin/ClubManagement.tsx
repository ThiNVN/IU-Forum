import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable, { Column } from './DataTable';
import { createEntity, updateEntity, deleteEntity, getEntities } from '../../services/adminService';

const ClubManagement: React.FC = () => {
  const [clubs, setClubs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const columns: Column[] = [
    { id: 'id', label: 'ID', type: 'number' },
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'description', label: 'Description', type: 'text' },
    { id: 'president_id', label: 'President ID', type: 'number' },
    { id: 'link', label: 'Link', type: 'text' },
    { id: 'created_at', label: 'Created At', type: 'date' },
    { id: 'logo', label: 'Logo', type: 'image' },
  ];

  const fetchClubs = async () => {
    try {
      const data = await getEntities('clubs');
      setClubs(data);
    } catch (err) {
      setError('Failed to fetch clubs');
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleAdd = async (data: any) => {
    try {
      await createEntity('clubs', data);
      setSuccess('Club created successfully');
      fetchClubs();
    } catch (err) {
      setError('Failed to create club');
    }
  };

  const handleEdit = async (id: number, data: any) => {
    try {
      await updateEntity('clubs', id, data);
      setSuccess('Club updated successfully');
      fetchClubs();
    } catch (err) {
      setError('Failed to update club');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEntity('clubs', id);
      setSuccess('Club deleted successfully');
      fetchClubs();
    } catch (err) {
      setError('Failed to delete club');
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={clubs}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Club"
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

export default ClubManagement; 