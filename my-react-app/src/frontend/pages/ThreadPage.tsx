import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ThreadCreationModal from '../components/ThreadCreationModal';
import '../styles/forum.css';

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
}

interface Topic {
  id: string;
  title: string;
}

const ThreadPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data - replace with actual API calls
  const topic: Topic = {
    id: topicId || '',
    title: 'Sample Topic'
  };

  const threads: Thread[] = [
    {
      id: '1',
      title: 'Sample Thread 1',
      content: 'This is a sample thread content.',
      author: 'John Doe',
      createdAt: '2024-02-20T10:00:00Z',
      tags: ['discussion', 'help']
    },
    {
      id: '2',
      title: 'Sample Thread 2',
      content: 'Another sample thread content.',
      author: 'Jane Smith',
      createdAt: '2024-02-20T11:00:00Z',
      tags: ['question', 'support']
    }
  ];

  const existingTags = [
    { id: '1', name: 'discussion' },
    { id: '2', name: 'help' },
    { id: '3', name: 'question' },
    { id: '4', name: 'support' }
  ];

  const handleCreateThread = (formData: FormData) => {
    // Here you would typically make an API call to create the thread
    console.log('Creating thread:', formData);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{topic.title}</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="forum-button"
        >
          Create Thread
        </button>
      </div>

      <div className="space-y-4">
        {threads.map(thread => (
          <div
            key={thread.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/thread/${thread.id}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl font-semibold">{thread.title}</h2>
              <div className="flex gap-2">
                {thread.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">{thread.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Posted by {thread.author}</span>
              <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <ThreadCreationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        topics={[topic]}
        existingTags={existingTags}
      />
    </div>
  );
};

export default ThreadPage; 