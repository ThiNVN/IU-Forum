import React from 'react';
import { Comment } from './Thread';
// import '../styles/register.css';
import '../styles/ThreadLeftSideBar.css';

interface ThreadUserSidebarProps {
  threadAuthor: {
    name: string;
    avatar?: string;
    createdAt: string;
  };
  commentUsers: { name: string; avatar?: string }[];
}

const ThreadUserSidebar: React.FC<ThreadUserSidebarProps> = ({ threadAuthor, commentUsers }) => {
  return (
    // <div className="leftPanel" style={{ minWidth: 260, maxWidth: 320 }}>
      <div className="thread-user-sidebar" style={{ minWidth: 260, maxWidth: 320 }}>
      <div className="leftContent">
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
        <div style={{ marginBottom: 24 }}>
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
      </div>
    </div>
  );
};

export default ThreadUserSidebar; 