import React, { useEffect, useState } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  topic: string;
  replies: number;
  views: number;
}

interface PostingsProps {
  userId: string;
}

const Postings: React.FC<PostingsProps> = ({ userId }) => {
  const [filter, setFilter] = useState<'threads' | 'posts'>('threads');
  // In a real app, you would fetch this data from an API
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!userId) return;

    const getAllThread = async () => {
      try {
        const response = await fetch(`https://localhost:8081/api/getAllThread?userID=${userId}`);
        if (response.ok) {
          const res = await response.json();
          console.log(res);
          setPosts(res.threads);
        }
      } catch (error) {
        console.error('Failed to fetch avatar:', error);
      }
    };

    getAllThread();
  }, [userId]);
  return (
    <div className="postings">
      <div className="postings-filter">
        <button
          className={`filter-button ${filter === 'threads' ? 'active' : ''}`}
          onClick={() => setFilter('threads')}
        >
          Threads
        </button>
        <button
          className={`filter-button ${filter === 'posts' ? 'active' : ''}`}
          onClick={() => setFilter('posts')}
        >
          Posts
        </button>
      </div>

      <div className="postings-list">
        {posts.map(post => (
          <div key={post.id} className="posting-item">
            <div className="posting-main">
              <h3 className="posting-title">{post.title}</h3>
              <div className="posting-preview">{post.content}</div>
            </div>
            <div className="posting-meta">
              <span className="posting-date">{new Date(post.date).toLocaleString()} in</span>
              <span className="posting-forum"> {post.topic}</span>
              <div className="posting-stats">
                <span>{post.replies} replies </span>
                <span>{post.views} views</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postings; 