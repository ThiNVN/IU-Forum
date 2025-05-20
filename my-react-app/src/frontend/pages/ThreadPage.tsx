import React from 'react';
import { useParams } from 'react-router-dom';
import Thread from '../components/Thread';
import '../styles/forum.css';

// Mock data - replace with actual API calls later
const mockThread = {
  id: '1',
  title: 'How to prepare for final exams?',
  content: 'I\'m looking for advice on how to effectively prepare for my upcoming final exams. What study techniques have worked best for you?',
  author: 'JohnDoe',
  createdAt: '2024-03-15',
  comments: [
    {
      id: '1',
      author: 'JaneSmith',
      content: 'I find that creating a study schedule and breaking down topics into smaller chunks works really well. Also, practice tests are super helpful!',
      createdAt: '2024-03-15',
      avatar: 'https://via.placeholder.com/40'
    },
    {
      id: '2',
      author: 'MikeJohnson',
      content: 'Don\'t forget to take breaks! The Pomodoro technique (25 minutes study, 5 minutes break) has been a game-changer for me.',
      createdAt: '2024-03-15',
      avatar: 'https://via.placeholder.com/40'
    }
  ]
};

const ThreadPage: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();

  return (
    <div className="forum-container">
      <Thread
        id={mockThread.id}
        title={mockThread.title}
        content={mockThread.content}
        author={mockThread.author}
        createdAt={mockThread.createdAt}
        comments={mockThread.comments}
      />
    </div>
  );
};

export default ThreadPage; 