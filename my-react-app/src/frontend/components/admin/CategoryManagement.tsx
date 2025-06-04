import React, { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable, { Column } from './DataTable';
import { createEntity, updateEntity, deleteEntity, getEntities } from '../../services/adminService';

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const columns: Column[] = [
    { id: 'id', label: 'ID', type: 'number' },
    { id: 'title', label: 'Name', type: 'text' },
    { id: 'description', label: 'Description', type: 'text' },
  ];

  const fetchCategories = async () => {
    try {
      const data = await getEntities('categories');
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (data: any) => {
    try {
      await createEntity('categories', data);
      setSuccess('Category created successfully');
      fetchCategories();
    } catch (err) {
      setError('Failed to create category');
    }
  };

  const handleEdit = async (id: number, data: any) => {
    try {
      await updateEntity('categories', id, data);
      setSuccess('Category updated successfully');
      fetchCategories();
    } catch (err) {
      setError('Failed to update category');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEntity('categories', id);
      setSuccess('Category deleted successfully');
      fetchCategories();
    } catch (err) {
      setError('Failed to delete category');
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={categories}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        title="Category"
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

export default CategoryManagement; 