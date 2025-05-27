import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  avatar?: string;
}

export interface ThreadProps {
  id: string;
  title: string;
  content: string;
  author: string;
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
  const userId = sessionStorage.getItem('userId');
  const handleCommentSubmit = async (postId: string) => {
    const content = newCommentContentMap[postId]?.trim();
    if (!content) return;

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
        console.log('Timestamp:', newComment.createdAt);
        console.log('Is valid?', !isNaN(new Date(newComment.createdAt).getTime()));
        // setPosts(prevPosts =>
        //     prevPosts.map(post =>
        //         post.id === postId
        //             ? { ...post, comments: [...post.comments, newComment] }
        //             : post
        //     )
        // );

        // Clear input for this post only
        setNewCommentContentMap(prev => ({ ...prev, [postId]: '' }));
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div className="thread-container bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="thread-header mb-4">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <div className="flex items-center text-sm text-gray-600">
          <span>Posted by {author}</span>
          <span className="mx-2">•</span>
          <span>{createdAt}</span>
        </div>
      </div>

      <div className="thread-content mb-6">
        <p className="text-gray-800">{content}</p>
      </div>

      <div className="comments-section">
        <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item border-t pt-4 mt-4">
            <div className="flex items-start">
              {comment.avatar && (
                <img
                  src={comment.avatar}
                  alt={`${comment.author}'s avatar`}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">{comment.author}</span>
                  <span className="text-sm text-gray-500">{comment.createdAt}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="comment-form mt-6">
        <textarea
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
          placeholder="Write a comment..."
          value={newCommentContentMap[id] || ''}
          onChange={(e) =>
            setNewCommentContentMap(prev => ({ ...prev, [id]: e.target.value }))
          }
        />
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => handleCommentSubmit(id)}>
          Post Comment
        </button>
      </div>
    </div >
  );
};

export default Thread; 