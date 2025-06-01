import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThreadUserSidebar from './ThreadUserSidebar';
import RichTextEditor from './RichText/RichTextEditor';
import EditThreadModal from './EditThreadModal';

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  user_id: string;
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
  description: string;
  author: Author;
  createdAt: string;
  user_id: string;
  comments: Comment[];
}
interface Thread {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  comments: Comment[];
}

const Thread: React.FC<ThreadProps> = ({ id, title, content, description, author, createdAt, user_id, comments }) => {
  const [newCommentContentMap, setNewCommentContentMap] = useState<{ [postId: string]: string }>({})
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const [userAvatar, setUserAvatar] = useState<string>('/img/avt/guest_avatar.png');
  const navigate = useNavigate();
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
          user_id: savedComment.newComment[0].user_id,
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

  const handleEditThread = () => {
    //debug
    setShowEditModal(true);
  };

  const handleDeleteThread = async () => {
    if (!window.confirm('Are you sure you want to delete this thread? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`https://localhost:8081/api/thread/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to the topic page after successful deletion
        navigate(-1);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete thread');
      }
    } catch (error) {
      console.error('Error deleting thread:', error);
      alert('Error deleting thread');
    }
  };

  // Add click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('thread-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="thread-container bg-white rounded-lg shadow-md p-4 mb-4 relative">
      {/* Dropdown button at top right */}
      {userId == user_id && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="focus:outline-none text-gray-500 hover:text-blue-600 transition-colors p-1 bg-transparent"
            style={{ border: 'none', background: 'none', fontSize: 28, lineHeight: 1, borderRadius: '50%', boxShadow: showDropdown ? '0 2px 8px rgba(0,0,0,0.10)' : 'none' }}
            aria-label="Thread options"
          >
            &#8230;
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-30 border border-gray-200 animate-fadeIn"
                 style={{ minWidth: 160, top: 36, display: 'absolute' }}>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  handleEditThread();
                }}
                className="w-full text-left px-5 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2 transition-colors rounded-t-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Thread
              </button>
              <button
                onClick={() => {
                  setShowDropdown(false);
                  handleDeleteThread();
                }}
                className="w-full text-left px-5 py-3 text-base text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 transition-colors rounded-b-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete Thread
              </button>
            </div>
          )}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 24 }}>
        <ThreadUserSidebar author={{ id: user_id, name: author.name, avatar: author.avatar, createdAt }} />
        <div style={{ flex: 1 }}>
          <div className="thread-header mb-4">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold mb-2">{title}</h1>
            </div>
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
              <ThreadUserSidebar author={{ id: comment.user_id, name: comment.author, avatar: comment.avatar, createdAt: comment.createdAt }} />
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

      {showEditModal && (
        <EditThreadModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          threadId={id}
          initialTitle={title}
          initialContent={content}
          initialDescription={description}
        />
      )}
    </div>
  );
};

export default Thread; 