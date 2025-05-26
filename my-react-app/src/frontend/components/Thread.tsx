import React from 'react';
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

const Thread: React.FC<ThreadProps> = ({ id, title, content, author, createdAt, comments }) => {
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
        />
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default Thread; 