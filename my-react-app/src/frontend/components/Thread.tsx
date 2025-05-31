import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ThreadUserSidebar from './ThreadUserSidebar';
import RichTextEditor from './RichText/RichTextEditor';

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  avatar?: string;
}

type Author = {
  name: string;
  avatar?: string;
  createdAt: string;
};

export interface ThreadProps {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  comments: Comment[];
}
interface Thread {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  comments: Comment[];
}

const Thread: React.FC<ThreadProps> = ({ id, title, content, author, createdAt, comments }) => {
  const [newCommentContentMap, setNewCommentContentMap] = useState<{ [postId: string]: string }>({})
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const [userAvatar, setUserAvatar] = useState<string>('/img/avt/guest_avatar.png');
  useEffect(() => {
    if (!userId) return;

    const getUserAvatar = async () => {
      try {
        const response = await fetch(`https://localhost:8081/api/getUserAvatar?userID=${userId}`);
        if (response.ok) {
          const res = await response.json();
          setUserAvatar(res.useravatar[0].avatar);
        }
      } catch (error) {
        console.error('Failed to fetch avatar:', error);
      }
    };

    getUserAvatar();
  }, [userId]);
  const handleCommentSubmit = async (postId: string) => {
    const content = newCommentContentMap[postId]?.trim();
    const temp = document.createElement('div');
    temp.innerHTML = content;
    const text = temp.textContent?.trim();

    if (!text) return; // This means the content is effectively empty
    try {
      const response = await fetch('https://localhost:8081/api/addNewComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          thread_id: postId,
          user_id: userId,
          content: content,
        }),
      });
      if (response.ok) {
        const savedComment = await response.json();
        const newComment: Comment = {
          id: savedComment.newComment[0].ID,
          content: savedComment.newComment[0].content,
          author: savedComment.userData[0].username,
          createdAt: savedComment.newComment[0].create_at,
          avatar: savedComment.userData[0].avatar
        };
        setNewCommentContentMap(prev => ({ ...prev, [postId]: '' }));
        setShowCommentEditor(false);
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };
  return (
    <div className="thread-container bg-white rounded-lg shadow-md p-4 mb-4">
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
        <ThreadUserSidebar author={{ name: author.name, avatar: author.avatar, createdAt }} />
        <div style={{ flex: 1 }}>
          <div className="thread-header mb-4">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <div className="flex items-center text-sm text-gray-600">
              <span>Posted by {author.name}</span>
              <span className="mx-2">•</span>
              <span>{createdAt}</span>
            </div>
          </div>
          <div className="thread-content mb-6">
            <p className="text-gray-800">{content}</p>
          </div>
        </div>
      </div>
      <div className="comments-section">
        <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item border-t pt-4 mt-4">
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <ThreadUserSidebar author={{ name: comment.author, avatar: comment.avatar, createdAt: comment.createdAt }} />
              <div className="flex-1">
                <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: comment.content }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Beautified comment form */}
      <div className="comment-form mt-6 flex items-start">
        {/* Avatar */}
        {/* <img
          src={userAvatar}
          alt="Your avatar"
          className="w-12 h-12 rounded-full mr-4"
          style={{ marginTop: showCommentEditor ? 0 : 8 }}
        /> */}
        <div style={{ width: 48, height: 48, margin: '0 auto 1rem auto' }}>
          {userAvatar ? (
            <img src={userAvatar} alt={"Your avatar"} style={{ width: '100%', height: '100%', borderRadius: '50%', marginTop: showCommentEditor ? 0 : 8 }} />
          ) : (
            <span style={{ fontSize: 24 }}>{"Your avatar"}</span>
          )}
        </div>
        {/* Editor area */}
        <div style={{ flex: 1 }}>
          {!showCommentEditor ? (
            <button
              className="w-full flex items-center gap-2 text-lg border border-blue-200 rounded-xl px-6 py-4 bg-blue-50 hover:bg-blue-100 shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{ minHeight: 56 }}
              onClick={() => setShowCommentEditor(true)}
            >
              <span className="text-blue-700 font-medium">Click here to open comment...</span>
            </button>
          ) : (
            <div className="border rounded-lg p-2 bg-white shadow-sm" style={{ position: 'relative' }}>
              <RichTextEditor
                value={newCommentContentMap[id] || ''}
                onChange={val => setNewCommentContentMap(prev => ({ ...prev, [id]: val }))}
                placeholder="Write a comment..."
                showToolbar={true}
              />
              <div className="flex justify-between items-center mt-2">
                {/* Disabled follow topic toggle for future */}
                <label className="flex items-center text-gray-500 text-sm select-none">
                  <input type="checkbox" disabled className="mr-2" />
                  Follow topic
                </label>
                <button
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-xl shadow hover:from-blue-600 hover:to-blue-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  style={{ minWidth: 140, fontSize: '1.1rem' }}
                  onClick={() => handleCommentSubmit(id)}
                >
                  Submit Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Thread; 