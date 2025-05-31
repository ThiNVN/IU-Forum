import React from 'react';
import '../styles/ThreadLeftSideBar.css';
{/*
  // Old code
  interface ThreadUserSidebarProps {
  threadAuthor?: {
    name: string;
    avatar?: string;
    createdAt: string;
  };
  commentUsers?: { name: string; avatar?: string }[];
  commentAuthor?: { name: string; avatar?: string; createdAt: string };
  mode?: 'thread' | 'comment';
   */}

interface UserSidebarProps {
  author: {
    name: string;
    avatar?: string;
    createdAt: string;
  };
}

const ThreadUserSidebar: React.FC<UserSidebarProps> = ({ author }) => {
  return (
    <div className="thread-user-sidebar" style={{ minWidth: 120, maxWidth: 160, textAlign: 'center', marginRight: 16, padding: '1rem 0.5rem' }}>
      <div style={{ width: 48, height: 48, margin: '0 auto 1rem auto' }}>
        {author.avatar ? (
          <img src={author.avatar} alt={author.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
        ) : (
          <span style={{ fontSize: 24 }}>{author.name[0]}</span>
        )}
      </div>
      <div className="author name" style={{ fontWeight: 'bold' }}>{author.name}</div>
      <div className="author date" style={{ fontSize: 12, color: '#777' }}>{author.createdAt}</div>
    </div>
  );
};

{/*
  const ThreadUserSidebar: React.FC<ThreadUserSidebarProps> = ({
  threadAuthor,
  commentUsers = [],
  commentAuthor,
  mode = 'thread',
}) => {
  if (mode === 'comment' && commentAuthor) {
    return (
      <div className="thread-user-sidebar" style={{ minWidth: 120, maxWidth: 160, textAlign: 'center', marginRight: 16, padding: '1rem 0.5rem' }}>
        <div style={{ width: 48, height: 48, margin: '0 auto 1rem auto' }}>
          {commentAuthor.avatar ? (
            <img src={commentAuthor.avatar} alt={commentAuthor.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          ) : (
            <span style={{ fontSize: 24 }}>{commentAuthor.name[0]}</span>
          )}
        </div>
        <div className="author name" style={{ fontWeight: 'bold' }}>{commentAuthor.name}</div>
        <div className="author date" style={{ fontSize: 12, color: '#777' }}>{commentAuthor.createdAt}</div>
      </div>
    );
  }

  // Default: thread sidebar
  return (
    <div className="thread-user-sidebar" style={{ minWidth: 260, maxWidth: 320 }}>
      <div className="leftContent">
        {threadAuthor && (
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="logoPlaceholder" style={{ width: 100, height: 100, margin: '0 auto 1rem auto' }}>
              {threadAuthor.avatar ? (
                <img src={threadAuthor.avatar} alt={threadAuthor.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                <span style={{ fontSize: 32 }}>{threadAuthor.name[0]}</span>
              )}
            </div>
            <div className="author name">{threadAuthor.name}</div>
            <div className="author role">Thread creator</div>
            <div className="author date">{threadAuthor.createdAt}</div>
          </div>
        )}
        <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Comment Users</div>
        <div style={{ maxHeight: 220, overflowY: 'auto' }}>
          {commentUsers.length === 0 && <div style={{ fontSize: 14 }}>No comments yet</div>}
          {commentUsers.map((user, idx) => (
            <div key={user.name + idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: '#fff', marginRight: 10 }}>
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: 18, color: '#333', lineHeight: '36px', textAlign: 'center', display: 'block' }}>{user.name[0]}</span>
                )}
              </div>
              <span style={{ fontSize: 15 }}>{user.name}</span>
            </div>
          ))}
        </div>
      </div>
  */}
export default ThreadUserSidebar; 