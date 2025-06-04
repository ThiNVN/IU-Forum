import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable, { Column } from './DataTable';
import { getComments, createComment, updateComment, deleteComment } from '../../services/adminService';

const CommentManagement: React.FC = () => {
    const [comments, setComments] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const columns: Column[] = [
        { id: 'ID', label: 'ID', type: 'number' },
        { id: 'thread_id', label: 'Thread ID', type: 'number' },
        { id: 'user_id', label: 'User ID', type: 'number' },
        { id: 'content', label: 'Content', type: 'text' },
        { id: 'create_at', label: 'Created At', type: 'date' },
    ];

    const fetchComments = async () => {
        try {
            const data = await getComments();
            // Sort comments by create_at in descending order
            const sortedData = data.sort((a: any, b: any) => 
                new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
            );
            setComments(sortedData);
        } catch (err) {
            setError('Failed to fetch comments');
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleAdd = async (newComment: any) => {
        try {
            await createComment(newComment);
            setSuccess('Comment created successfully');
            fetchComments();
        } catch (err) {
            setError('Failed to create comment');
        }
    };

    const handleEdit = async (id: number, updatedComment: any) => {
        try {
            await updateComment(id, updatedComment);
            setSuccess('Comment updated successfully');
            fetchComments();
        } catch (err) {
            setError('Failed to update comment');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteComment(id);
            setSuccess('Comment deleted successfully');
            fetchComments();
        } catch (err) {
            setError('Failed to delete comment');
        }
    };

    return (
        <div>
            <DataTable
                columns={columns}
                data={comments}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                title="Comment Management"
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

export default CommentManagement; 