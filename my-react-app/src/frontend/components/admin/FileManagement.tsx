import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable, { Column } from './DataTable';
import { getFiles, createFile, updateFile, deleteFile } from '../../services/adminService';

const FileManagement: React.FC = () => {
    const [files, setFiles] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const columns: Column[] = [
        { id: 'ID', label: 'ID', type: 'number' },
        { id: 'user_id', label: 'User ID', type: 'number' },
        { id: 'link', label: 'File Link', type: 'text' },
        { id: 'thread_id', label: 'Thread ID', type: 'number' },
    ];

    const fetchFiles = async () => {
        try {
            const data = await getFiles();
            setFiles(data);
        } catch (err) {
            setError('Failed to fetch files');
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleAdd = async (newFile: any) => {
        try {
            await createFile(newFile);
            setSuccess('File created successfully');
            fetchFiles();
        } catch (err) {
            setError('Failed to create file');
        }
    };

    const handleEdit = async (id: number, updatedFile: any) => {
        try {
            await updateFile(id, updatedFile);
            setSuccess('File updated successfully');
            fetchFiles();
        } catch (err) {
            setError('Failed to update file');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteFile(id);
            setSuccess('File deleted successfully');
            fetchFiles();
        } catch (err) {
            setError('Failed to delete file');
        }
    };

    return (
        <div>
            <DataTable
                columns={columns}
                data={files}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                title="File Management"
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

export default FileManagement; 