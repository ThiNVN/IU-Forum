import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable, { Column } from './DataTable';
import { getTags, createTag, updateTag, deleteTag } from '../../services/adminService';

const TagManagement: React.FC = () => {
    const [tags, setTags] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const columns: Column[] = [
        { id: 'ID', label: 'ID', type: 'number' },
        { id: 'name', label: 'Name', type: 'text' },
    ];

    const fetchTags = async () => {
        try {
            const data = await getTags();
            setTags(data);
        } catch (err) {
            setError('Failed to fetch tags');
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    const handleAdd = async (newTag: any) => {
        try {
            await createTag(newTag);
            setSuccess('Tag created successfully');
            fetchTags();
        } catch (err) {
            setError('Failed to create tag');
        }
    };

    const handleEdit = async (id: number, updatedTag: any) => {
        try {
            await updateTag(id, updatedTag);
            setSuccess('Tag updated successfully');
            fetchTags();
        } catch (err) {
            setError('Failed to update tag');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTag(id);
            setSuccess('Tag deleted successfully');
            fetchTags();
        } catch (err) {
            setError('Failed to delete tag');
        }
    };

    return (
        <div>
            <DataTable
                columns={columns}
                data={tags}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                title="Tag Management"
            />
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Snackbar>
            <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess(null)}>
                <Alert severity="success" onClose={() => setSuccess(null)}>
                    {success}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TagManagement; 