import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';
import { useNavigate } from 'react-router-dom';

interface CreateThreadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Topic {
    id: string;
    title: string;
    category_id: string;
}

interface Tag {
    id: string;
    name: string;
}

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [topics, setTopics] = useState<Topic[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);
    const [isPreview, setIsPreview] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch topics when modal opens
        if (isOpen) {
            fetchTopics();
            fetchTags();
        }
    }, [isOpen]);

    const fetchTopics = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/topics');
            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/tags');
            const data = await response.json();
            setTags(data);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTagInput(value);
        
        if (value.trim()) {
            const filtered = tags.filter(tag => 
                tag.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestedTags(filtered);
        } else {
            setSuggestedTags([]);
        }
    };

    const handleTagSelect = (tag: Tag) => {
        if (!selectedTags.find(t => t.id === tag.id)) {
            setSelectedTags([...selectedTags, tag]);
        }
        setTagInput('');
        setSuggestedTags([]);
    };

    const handleTagRemove = (tagId: string) => {
        setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
    };

    const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setAttachedFiles([...attachedFiles, ...newFiles]);
        }
    };

    const handleFileRemove = (index: number) => {
        setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        const formData = new FormData();
        formData.append('topic_id', selectedTopic);
        formData.append('user_id', userId);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', JSON.stringify(selectedTags.map(tag => tag.id)));
        formData.append('follow', isFollowing.toString());
        
        attachedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await fetch('http://localhost:8081/api/threads', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                onClose();
                navigate(`/thread/${data.threadId}`);
            } else {
                console.error('Failed to create thread');
            }
        } catch (error) {
            console.error('Error creating thread:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Create New Thread</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>Topic</label>
                        <select 
                            value={selectedTopic} 
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            required
                        >
                            <option value="">Select a topic</option>
                            {topics.map(topic => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Tags</label>
                        <div className="tag-input-container">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={handleTagInputChange}
                                placeholder="Type to search or add tags"
                            />
                            {suggestedTags.length > 0 && (
                                <div className="tag-suggestions">
                                    {suggestedTags.map(tag => (
                                        <div
                                            key={tag.id}
                                            className="tag-suggestion"
                                            onClick={() => handleTagSelect(tag)}
                                        >
                                            {tag.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="selected-tags">
                            {selectedTags.map(tag => (
                                <span key={tag.id} className="tag">
                                    {tag.name}
                                    <button onClick={() => handleTagRemove(tag.id)}>&times;</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter thread title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <RichTextEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Write your thread content here..."
                            showToolbar={true}
                        />
                    </div>

                    <div className="form-group">
                        <label>Attachments</label>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileAttach}
                            className="file-input"
                        />
                        <div className="attached-files">
                            {attachedFiles.map((file, index) => (
                                <div key={index} className="file-item">
                                    <span>{file.name}</span>
                                    <button onClick={() => handleFileRemove(index)}>&times;</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            className="preview-button"
                            onClick={() => setIsPreview(!isPreview)}
                        >
                            {isPreview ? 'Edit' : 'Preview'}
                        </button>
                        <label className="follow-checkbox">
                            <input
                                type="checkbox"
                                checked={isFollowing}
                                onChange={(e) => setIsFollowing(e.target.checked)}
                            />
                            Follow this thread
                        </label>
                        <button
                            className="submit-button"
                            onClick={handleSubmit}
                            disabled={!title || !content || !selectedTopic}
                        >
                            Create Thread
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateThreadModal; 