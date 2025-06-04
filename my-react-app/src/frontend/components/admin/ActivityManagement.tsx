import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable, { Column } from './DataTable';
import { createEntity, updateEntity, deleteEntity, getEntities } from '../../services/adminService';

const ActivityManagement: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const columns: Column[] = [
    { id: 'ID', label: 'ID', type: 'number' },
    { id: 'user_id', label: 'User ID', type: 'number' },
    { id: 'activity_type', label: 'Activity Type', type: 'text' },
    { id: 'description', label: 'Description', type: 'text' },
    { id: 'created_at', label: 'Created At', type: 'date' },
  ];

  const fetchActivities = async () => {
    try {
      const data = await getEntities('activities');
      // Sort activities by created_at in descending order
      const sortedData = data.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setActivities(sortedData);
    } catch (err) {
      setError('Failed to fetch activities');
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleAdd = async (data: any) => {
    try {
      await createEntity('activities', {
        ...data,
        created_at: new Date().toISOString()
      });
      setSuccess('Activity created successfully');
      fetchActivities();
    } catch (err) {
      setError('Failed to create activity');
    }
  };

  const handleEdit = async (id: number, data: any) => {
    try {
      await updateEntity('activities', id, data);
      setSuccess('Activity updated successfully');
      fetchActivities();
    } catch (err) {
      setError('Failed to update activity');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEntity('activities', id);
      setSuccess('Activity deleted successfully');
      fetchActivities();
    } catch (err) {
      setError('Failed to delete activity');
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={activities}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Activity"
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

export default ActivityManagement; 