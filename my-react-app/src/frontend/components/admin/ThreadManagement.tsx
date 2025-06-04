import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';

// Add backend base URL
const BACKEND_URL = 'https://localhost:8081'; // Update this with your backend URL

interface Thread {
  ID: number;
  title: string;
  description: string;
  content: string;
  user_id: number;
  topic_id: number;
  views: number;
  responses: number;
  create_at: string;
  last_activity: string;
}

const ThreadManagement: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    topic_id: '',
  });

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/threads`);
      // Update to handle the backend response structure
      if (response.data && response.data.result) {
        setThreads(response.data.result);
      } else {
        setThreads([]);
      }
    } catch (error) {
      console.error('Error fetching threads:', error);
      setThreads([]);
    }
  };

  const handleOpen = (thread?: Thread) => {
    if (thread) {
      setSelectedThread(thread);
      setFormData({
        title: thread.title || '',
        description: thread.description || '',
        content: thread.content || '',
        topic_id: thread.topic_id?.toString() || '',
      });
    } else {
      setSelectedThread(null);
      setFormData({
        title: '',
        description: '',
        content: '',
        topic_id: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedThread(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedThread) {
        await axios.put(`${BACKEND_URL}/api/admin/threads/${selectedThread.ID}`, formData);
      } else {
        await axios.post(`${BACKEND_URL}/api/admin/threads`, formData);
      }
      fetchThreads();
      handleClose();
    } catch (error) {
      console.error('Error saving thread:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this thread?')) {
      try {
        await axios.delete(`${BACKEND_URL}/api/admin/threads/${id}`);
        fetchThreads();
      } catch (error) {
        console.error('Error deleting thread:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Thread Management</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add New Thread
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Topic ID</TableCell>
              <TableCell>Views</TableCell>
              <TableCell>Responses</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(threads) && threads.map((thread) => (
              <TableRow key={thread.ID}>
                <TableCell>{thread.ID}</TableCell>
                <TableCell>{thread.title}</TableCell>
                <TableCell>{thread.description}</TableCell>
                <TableCell>{thread.topic_id}</TableCell>
                <TableCell>{thread.views}</TableCell>
                <TableCell>{thread.responses}</TableCell>
                <TableCell>{new Date(thread.create_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(thread)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(thread.ID)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedThread ? 'Edit Thread' : 'Add New Thread'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              margin="normal"
              multiline
              rows={4}
            />
            <TextField
              fullWidth
              label="Topic ID"
              value={formData.topic_id}
              onChange={(e) => setFormData({ ...formData, topic_id: e.target.value })}
              margin="normal"
              type="number"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedThread ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ThreadManagement; 