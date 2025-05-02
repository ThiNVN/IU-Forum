import React, { useState } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  forum: string;
  replies: number;
  views: number;
}

interface PostingsProps {
  userId: string;
}

const Postings: React.FC<PostingsProps> = ({ userId }) => {
  const [filter, setFilter] = useState<'threads' | 'posts'>('threads');

  // In a real app, you would fetch this data from an API
  const posts: Post[] = [
    {
      id: '1',
      title: 'Sample Thread Title',
      content: 'This is a sample thread content...',
      date: '2024-03-18',
      forum: 'General Discussion',
      replies: 5,
      views: 100
    }
    // Add more sample posts as needed
  ];

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
              <span className="posting-date">{post.date}</span>
              <span className="posting-forum">{post.forum}</span>
              <div className="posting-stats">
                <span>{post.replies} replies</span>
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