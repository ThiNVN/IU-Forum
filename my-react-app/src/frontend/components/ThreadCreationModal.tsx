import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import RichTextEditor from './RichTextEditor';
import '../styles/forum.css';

interface Tag {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  title: string;
}

interface ThreadCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  topics: Topic[];
  existingTags: Tag[];
}

const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv',
  'application/zip',
  'application/x-rar-compressed',
  'video/mp4'
];

const ThreadCreationModal: React.FC<ThreadCreationModalProps> = ({
  isOpen,
  onClose,
  topics,
  existingTags
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [followThread, setFollowThread] = useState<boolean>(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleTagSelect = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleAddNewTag = () => {
    if (newTag.trim() && !existingTags.some(tag => tag.name === newTag.trim())) {
      // Here you would typically make an API call to create the new tag
      setNewTag('');
    }
  };

  const handleFileAttach = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => ALLOWED_FILE_TYPES.includes(file.type));
    setAttachedFiles([...attachedFiles, ...validFiles]);
  };

  const handleSubmit = async () => {
    // Here you would typically make an API call to create the thread
    const formData = new FormData();
    formData.append('topicId', selectedTopic);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('followThread', followThread.toString());
    selectedTags.forEach(tag => formData.append('tags[]', tag));
    attachedFiles.forEach(file => formData.append('files[]', file));

    // API call would go here
    console.log('Submitting thread:', formData);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6">
          <Dialog.Title className="text-2xl font-bold mb-4">
            Create New Thread
          </Dialog.Title>

          <div className="space-y-4">
            {/* Topic Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Topic
              </label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="forum-input"
              >
                <option value="">Select a topic</option>
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {existingTags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagSelect(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag.id)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add new tag"
                  className="forum-input flex-1"
                />
                <button
                  onClick={handleAddNewTag}
                  className="forum-button"
                >
                  Add Tag
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thread Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="forum-input"
                placeholder="Enter thread title"
              />
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                isPreview={isPreview}
              />
            </div>

            {/* File Attachment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attach Files
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileAttach}
                accept={ALLOWED_FILE_TYPES.join(',')}
                className="forum-input"
              />
              {attachedFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Attached files:</p>
                  <ul className="mt-1">
                    {attachedFiles.map((file, index) => (
                      <li key={index} className="text-sm text-gray-500">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="forum-button"
                >
                  {isPreview ? 'Edit' : 'Preview'}
                </button>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={followThread}
                    onChange={(e) => setFollowThread(e.target.checked)}
                    className="form-checkbox"
                  />
                  <span className="text-sm text-gray-700">Follow Thread</span>
                </label>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="forum-button"
                  disabled={!selectedTopic || !title || !content}
                >
                  Create Thread
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ThreadCreationModal; 