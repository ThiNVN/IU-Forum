import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable, { Column } from './DataTable';
import { createEntity, updateEntity, deleteEntity, getEntities } from '../../services/adminService';

const TopicManagement: React.FC = () => {
  const [topics, setTopics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const columns: Column[] = [
    { id: 'ID', label: 'ID', type: 'number' },
    { id: 'title', label: 'Title', type: 'text' },
    { id: 'description', label: 'Description', type: 'text' },
    { id: 'category_id', label: 'Category ID', type: 'number' },
    { id: 'create_at', label: 'Created At', type: 'text' },
    { id: 'last_activity', label: 'Updated At', type: 'text' },
  ];

  const fetchTopics = async () => {
    try {
      const data = await getEntities('topics');
      setTopics(data);
    } catch (err) {
      setError('Failed to fetch topics');
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleAdd = async (data: any) => {
    try {
      await createEntity('topics', data);
      setSuccess('Topic created successfully');
      fetchTopics();
    } catch (err) {
      setError('Failed to create topic');
    }
  };

  const handleEdit = async (id: number, data: any) => {
    try {
      await updateEntity('topics', id, data);
      setSuccess('Topic updated successfully');
      fetchTopics();
    } catch (err) {
      setError('Failed to update topic');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEntity('topics', id);
      setSuccess('Topic deleted successfully');
      fetchTopics();
    } catch (err) {
      setError('Failed to delete topic');
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={topics}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Topic"
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

export default TopicManagement; 