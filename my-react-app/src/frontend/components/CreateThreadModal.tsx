import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichText/RichTextEditor';
import { useNavigate } from 'react-router-dom';
import './CreateThreadModal.css';
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

const processBase64Images = async (htmlContent: string): Promise<string> => {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;

    const images = Array.from(div.querySelectorAll('img'));

    for (const img of images) {
        const src = img.getAttribute('src');
        if (src && src.startsWith('data:image/')) {
            try {
                const blob = await fetch(src).then(res => res.blob());
                const formData = new FormData();
                formData.append('image', blob, 'image.png');

                const response = await fetch('http://localhost:8081/api/uploadImage', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    img.setAttribute('src', data.url); // update <img> src to the server URL
                }
            } catch (err) {
                console.error('Image upload failed', err);
            }
        }
    }

    return div.innerHTML; // waits until all images are processed
};

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'content' | 'poll'>('content');
    const [title, setTitle] = useState('');
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [topics, setTopics] = useState<Topic[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [descriptionHtml, setDescriptionHtml] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
    const [showQuickPost, setShowQuickPost] = useState(false);
    const [contentHtml, setContentHtml] = useState('');
    const [contentText, setContentText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            fetchTopics();
            fetchTags();
        }
    }, [isOpen]);

    const fetchTopics = async () => {
        try {
            const response = await fetch('https://localhost:8081/api/topics');
            if (response.ok) {
                const data = await response.json();
                setTopics(data.topics);
            }
        } catch (error) {
            console.error('Error fetching topics:', error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await fetch('https://localhost:8081/api/tags');
            if (response.ok) {
                const data = await response.json();
                setTags(data.tags);
            }
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTagInput(value);
        if (value.trim()) {
            const filtered = tags.filter(tag =>
                tag.name.toLowerCase().includes(value.toLowerCase()) &&
                !selectedTags.some(selected => selected.id === tag.id)
            );
            setSuggestedTags(filtered);
        } else {
            setSuggestedTags([]);
        }
    };

    const handleTagSelect = (tag: Tag) => {
        setSelectedTags([...selectedTags, tag]);
        setTagInput('');
        setSuggestedTags([]);
    };

    const handleTagRemove = (tagId: string) => {
        setSelectedTags(selectedTags.filter(tag => tag.id !== tagId));
    };

    const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files).map(file => {
                return new File([file], file.name, { type: file.type });
            });
            setAttachedFiles([...attachedFiles, ...files]);
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
        const content = await processBase64Images(contentHtml);
        const formData = new FormData();

        formData.append('topic_id', selectedTopic);
        formData.append('user_id', userId);
        formData.append('title', title);
        formData.append('description', descriptionText);
        formData.append('content', content);
        formData.append('tags', JSON.stringify(selectedTags.map(tag => tag.id)));
        formData.append('follow', isFollowing.toString());
        attachedFiles.forEach(file => {
            formData.append('files', file);
        });
        try {
            const response = await fetch('https://localhost:8081/api/threads', {
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

    function stripHtml(html: string) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content create-thread-panel">
                <div className="notice-bar">
                    <span>Your content will need to be reviewed &amp; approved by a moderator.</span>
                </div>
                <div className="tab-header">
                    <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}>Content</button>
                    <button className={activeTab === 'poll' ? 'active' : ''} onClick={() => setActiveTab('poll')}>Poll</button>
                </div>
                <div className="modal-header">
                    <h2>Create New Thread</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                {activeTab === 'content' && (
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title <span className="required">REQUIRED</span></label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Thread title"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Topic</label>
                            <select
                                value={selectedTopic}
                                onChange={(e) => setSelectedTopic(e.target.value)}
                                className="topic-select"
                            >
                                <option value="">
                                    {topics.length === 0 ? 'No topics available' : 'Select a topic...'}
                                </option>

                                {topics.map((topic) => (
                                    <option key={topic.id} value={topic.id}>
                                        {topic.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tags</label>
                            <div className="tag-input-container">
                                {selectedTags.map(tag => (
                                    <span key={tag.id} className="tag-pill">
                                        {tag.name}
                                        <button type="button" onClick={() => handleTagRemove(tag.id)}>&times;</button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={handleTagInputChange}
                                    placeholder="+ Add Tag"
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
                        </div>
                        <div className="form-group">
                            <label>Description <span className="required">REQUIRED</span></label>
                            <input
                                value={descriptionHtml}
                                onChange={(e) => {
                                    setDescriptionHtml(e.target.value);
                                    setDescriptionText(stripHtml(e.target.value));
                                }}
                                placeholder="Write your thread description here..."
                            />
                        </div>
                        <div className="form-group">
                            <label>Content <span className="required">REQUIRED</span></label>
                            <RichTextEditor
                                value={contentHtml}
                                onChange={(html) => {
                                    setContentHtml(html);
                                    setContentText(stripHtml(html));
                                }}
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
                                        <button type="button" onClick={() => handleFileRemove(index)}>&times;</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group follow-toggle">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={isFollowing}
                                    onChange={(e) => setIsFollowing(e.target.checked)}
                                />
                                Follow thread
                            </label>
                        </div>
                        <div className="form-actions">
                            <div className="quick-post-template">
                                <button type="button" onClick={() => setShowQuickPost(!showQuickPost)}>
                                    Quick Post Template
                                </button>
                                {showQuickPost && (
                                    <div className="quick-post-dropdown">
                                        <button type="button">Template 1</button>
                                        <button type="button">Template 2</button>
                                    </div>
                                )}
                            </div>
                            <button
                                className="submit-button"
                                onClick={handleSubmit}
                                disabled={!title || !contentHtml || !selectedTopic}
                            >
                                Submit Thread
                            </button>
                        </div>
                    </div>
                )}
                {activeTab === 'poll' && (
                    <div className="modal-body poll-tab">
                        <p>Poll creation coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateThreadModal; 