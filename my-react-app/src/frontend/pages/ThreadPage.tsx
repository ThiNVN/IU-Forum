import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Thread from '../components/Thread';
import '../styles/forum.css';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  avatar: string;
}

interface ThreadData {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
}

const ThreadPage: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [thread, setThread] = useState<ThreadData | null>(null);

  useEffect(() => {
    const fetchThreadAndAllComment = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/getThreadAndAllComment?threadId=${threadId}`);
        if (response.ok) {
          const res = await response.json();
          const threadData = res.result; // Assuming it's a single object, not an array

          const mappedThread: ThreadData = {
            id: threadData.id,
            title: threadData.title,
            content: threadData.content,
            author: threadData.author || 'Anonymous',
            createdAt: threadData.createdAt ? new Date(threadData.createdAt).toISOString().slice(0, 10) : 'Unknown',
            comments: threadData.comments.map((comment: any) => ({
              id: comment.id,
              author: comment.author,
              content: comment.content,
              createdAt: comment.createdAt ? new Date(comment.createdAt).toISOString().slice(0, 10) : 'Unknown',
              avatar: comment.avatar
            }))
          };

          setThread(mappedThread);
        } else {
          console.error('Error fetching thread:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch thread:', error);
      }
    };

    fetchThreadAndAllComment();
  }, [threadId]);

  if (!thread) return <div>Loading...</div>;

  return (
    <div className="forum-container">
      <Thread
        id={thread.id}
        title={thread.title}
        content={thread.content}
        author={thread.author}
        createdAt={thread.createdAt}
        comments={thread.comments}
      />
    </div>
  );
};

export default ThreadPage;
