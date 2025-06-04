import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable, { Column } from './DataTable';
import { createEntity, updateEntity, deleteEntity, getEntities } from '../../services/adminService';

const NotificationManagement: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const columns: Column[] = [
    { id: 'ID', label: 'ID', type: 'number' },
    { id: 'thread_id', label: 'Thread ID', type: 'number' },
    { id: 'user_id', label: 'User ID', type: 'number' },
    { id: 'from_user_id', label: 'From User ID', type: 'number' },
    { id: 'comment_id', label: 'Comment ID', type: 'number' },
    { id: 'like_id', label: 'Like ID', type: 'number' },
    { id: 'message', label: 'Message', type: 'text' },
    { id: 'is_read', label: 'Is Read', type: 'boolean' },
    { id: 'create_at', label: 'Created At', type: 'date' },
    { id: 'new_thread', label: 'New Thread', type: 'boolean' },
    { id: 'new_follower', label: 'New Follower', type: 'boolean' },
    { id: 'new_comment', label: 'New Comment', type: 'boolean' },
    { id: 'new_reply', label: 'New Reply', type: 'boolean' },
    { id: 'new_like', label: 'New Like', type: 'boolean' },
  ];

  const fetchNotifications = async () => {
    try {
      const data = await getEntities('notifications');
      setNotifications(data);
    } catch (err) {
      setError('Failed to fetch notifications');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAdd = async (data: any) => {
    try {
      await createEntity('notifications', data);
      setSuccess('Notification created successfully');
      fetchNotifications();
    } catch (err) {
      setError('Failed to create notification');
    }
  };

  const handleEdit = async (id: number, data: any) => {
    try {
      await updateEntity('notifications', id, data);
      setSuccess('Notification updated successfully');
      fetchNotifications();
    } catch (err) {
      setError('Failed to update notification');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEntity('notifications', id);
      setSuccess('Notification deleted successfully');
      fetchNotifications();
    } catch (err) {
      setError('Failed to delete notification');
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={notifications}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Notification"
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

export default NotificationManagement; 