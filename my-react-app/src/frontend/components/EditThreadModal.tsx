import React, { useState } from 'react';
import RichTextEditor from './RichText/RichTextEditor';
import './EditThreadModal.css';

interface EditThreadModalProps {
  isOpen: boolean;
  onClose: () => void;
  threadId: string;
  initialTitle: string;
  initialContent: string;
  initialDescription: string;
  currentUserID: string | null;
}

const EditThreadModal: React.FC<EditThreadModalProps> = ({
  isOpen,
  onClose,
  threadId,
  initialTitle,
  initialContent,
  initialDescription,
  currentUserID
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [description, setDescription] = useState(initialDescription);
  const access_user_id = useState(currentUserID);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://localhost:8081/api/thread/${threadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          description,
          access_user_id
        }),
      });

      if (response.ok) {
        window.location.reload(); // Refresh the page to show updated content
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update thread');
      }
    } catch (error) {
      console.error('Error updating thread:', error);
      alert('Error updating thread');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={'edit-modalOverlay'}>
      <div className={'edit-modalContent'}>
        <div className={'edit-modalHeader'}>
          <h2>Edit Thread</h2>
          <button onClick={onClose} className={'edit-closeButton'}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={'edit-modalBody'}>
            <div className={'edit-formGroup'}>
              <label>Title <span className={'edit-required'}>REQUIRED</span></label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Thread title"
                required
              />
            </div>
            <div className={'edit-formGroup'}>
              <label>Description <span className={'edit-required'}>REQUIRED</span></label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your thread description here..."
                required
              />
            </div>
            <div className={'edit-formGroup'}>
              <label>Content <span className={'edit-required'}>REQUIRED</span></label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your thread content here..."
                showToolbar={true}
              />
            </div>
          </div>
          <div className={'edit-formActions'}>
            <button
              type="button"
              onClick={onClose}
              className={'edit-closeButton'}
              style={{ fontSize: '1.1rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={'edit-submitButton'}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditThreadModal; 