import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:8081/api';

// Generic CRUD operations
export const createEntity = async (entity: string, data: any) => {
  const response = await axios.post(`${API_URL}/admin/${entity}`, data);
  return response.data;
};

export const updateEntity = async (entity: string, id: number, data: any) => {
  const response = await axios.put(`${API_URL}/admin/${entity}/${id}`, data);
  return response.data;
};

export const deleteEntity = async (entity: string, id: number) => {
  const response = await axios.delete(`${API_URL}/admin/${entity}/${id}`);
  return response.data;
};

export const getEntities = async (entity: string) => {
  const response = await axios.get(`${API_URL}/admin/${entity}`);
  console.log(response.data);
  return Array.isArray(response.data.result) ? response.data.result : response.data.data || [];
};

// Specific entity operations
export const getUserStats = async () => {
  const response = await axios.get(`${API_URL}/admin/users/stats`);
  return response.data;
};

export const getThreadStats = async () => {
  const response = await axios.get(`${API_URL}/admin/threads/stats`);
  return response.data;
};

export const getActivityStats = async () => {
  const response = await axios.get(`${API_URL}/admin/activities/stats`);
  return response.data;
};

// File operations
export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await axios.post(`${API_URL}/admin/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Batch operations
export const batchDelete = async (entity: string, ids: number[]) => {
  const response = await axios.post(`${API_URL}/admin/${entity}/batch-delete`, { ids });
  return response.data;
};

export const batchUpdate = async (entity: string, updates: { id: number; data: any }[]) => {
  const response = await axios.post(`${API_URL}/admin/${entity}/batch-update`, { updates });
  return response.data;
};

// Club Management
export const getClubs = () => getEntities('clubs');
export const createClub = (data: any) => createEntity('clubs', data);
export const updateClub = (id: number, data: any) => updateEntity('clubs', id, data);
export const deleteClub = (id: number) => deleteEntity('clubs', id);

// Activity Management
export const getActivities = () => getEntities('activities');
export const createActivity = (data: any) => createEntity('activities', data);
export const updateActivity = (id: number, data: any) => updateEntity('activities', id, data);
export const deleteActivity = (id: number) => deleteEntity('activities', id);

// Notification Management
export const getNotifications = () => getEntities('notifications');
export const createNotification = (data: any) => createEntity('notifications', data);
export const updateNotification = (id: number, data: any) => updateEntity('notifications', id, data);
export const deleteNotification = (id: number) => deleteEntity('notifications', id);

// Tag Management
export const getTags = () => getEntities('tags');
export const createTag = (data: any) => createEntity('tags', data);
export const updateTag = (id: number, data: any) => updateEntity('tags', id, data);
export const deleteTag = (id: number) => deleteEntity('tags', id);

// File Management
export const getFiles = () => getEntities('files');
export const createFile = (data: any) => createEntity('files', data);
export const updateFile = (id: number, data: any) => updateEntity('files', id, data);
export const deleteFile = (id: number) => deleteEntity('files', id);

// Comment Management
export const getComments = () => getEntities('comments');
export const createComment = (data: any) => createEntity('comments', data);
export const updateComment = (id: number, data: any) => updateEntity('comments', id, data);
export const deleteComment = (id: number) => deleteEntity('comments', id); 