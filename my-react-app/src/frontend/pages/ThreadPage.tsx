import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Thread from '../components/Thread';
import ThreadUserSidebar from '../components/ThreadUserSidebar';
// import Sidebar from '../components/UI/Sidebar';
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
        const response = await fetch(`https://localhost:8081/api/getThreadAndAllComment?threadId=${threadId}`);
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

  // Prepare sidebar data
  const threadAuthor = {
    name: thread.author,
    avatar: thread.comments.find(c => c.author === thread.author)?.avatar || undefined,
    createdAt: thread.createdAt,
  };
  // Unique comment users, excluding thread creator
  const commentUsers = Array.from(
    new Map(
      thread.comments
        .filter(c => c.author !== thread.author)
        .map(c => [c.author, { name: c.author, avatar: c.avatar }])
    ).values()
  );

  return (

    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f0f4ff 0%, #f9f6ff 100%)',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '2rem 0',
        gap: 32,
      }}
    >
      {/* Left User Sidebar */}
      <div style={{ flex: '0 0 260px', marginRight: 32 }}>
        <ThreadUserSidebar threadAuthor={threadAuthor} commentUsers={commentUsers} />
      </div>

      {/* Main Thread Content */}
      <div style={{ flex: '1 1 600px', maxWidth: 800 }}>
    
    {/*// <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f0f4ff 0%, #f9f6ff 100%)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '2rem 0' }}>
      {/* <ThreadUserSidebar threadAuthor={threadAuthor} commentUsers={commentUsers} /> */}
      {/* <div style={{ flex: 1, marginLeft: 32, maxWidth: 800 }}> */}
        <Thread
          id={thread.id}
          title={thread.title}
          content={thread.content}
          author={thread.author}
          createdAt={thread.createdAt}
          comments={thread.comments}
        />
      </div>

      {/* Right Sidebar */}
      {/* <div style={{ flex: '0 0 300px', marginLeft: 32 }}>
        <Sidebar />
      </div> */}
    </div>
  );
};

export default ThreadPage;
