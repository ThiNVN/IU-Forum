import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';

interface ProfilePost {
    id: String;
    content: String;
    date: string;
    likes: number;
    comments: number;
    author:{
        username: String;
        avatar: String;
    }
}

interface ProfilePostsProps{
    userId: string;
}

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

const ProfilePosts: React.FC<ProfilePostsProps> = ({userId}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPostContent, setNewPostContent] = useState<string>('');
    //const [newCommentContent, setNewCommentContent] = useState<string>('');
    const [newCommentContentMap, setNewCommentContentMap] = useState<{[postId: string]: string}>({})

    const handlePostSubmit = () => {
        if (newPostContent.trim() === '') return;
        const newPost: Post = {
            id: Date.now().toString(),
            content: newPostContent,
            author: 'User', // Replace with actual user name
            timestamp: new Date().toISOString(),
            comments: []
        };
        setPosts([...posts, newPost]);
        setNewPostContent('');
    };

    const handleCommentSubmit = (postId: string) => {
        const commentContent = newCommentContentMap[postId];
        if (commentContent.trim() === '') return;
        const newComment: Comment = {
            id: Date.now().toString(),
            content: commentContent,
            author: 'User', // Replace with actual user name
            timestamp: new Date().toISOString()
        };
        setPosts(posts.map(post => 
            post.id === postId 
                ? { ...post, comments: [...post.comments, newComment] } 
                : post
        ));
        // setNewCommentContent('');
        setNewCommentContentMap(prev => ({...prev, [postId]: ''}));
    };

    return (
        <div className="profile-posts">
            <h2>Profile Posts</h2>
            <div className="new-post">
                <RichTextEditor
                    value={newPostContent}
                    onChange={setNewPostContent}
                    placeholder="Write a new post..."
                    showToolbar = {false}
                />
                <button onClick={handlePostSubmit}>Post</button>
            </div>
            <div className="posts-list">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                        <div className="post-meta">
                            <span>By {post.author}</span>
                            <span>{new Date(post.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="comments">
                            <h3>Comments</h3>
                            {post.comments.map(comment => (
                                <div key={comment.id} className="comment">
                                    <div className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />
                                    <div className="comment-meta">
                                        <span>By {comment.author}</span>
                                        <span>{new Date(comment.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                            {/* <div className="new-comment">
                                <RichTextEditor
                                    value={newCommentContent}
                                    onChange={setNewCommentContent}
                                    placeholder="Write a comment..."
                                />
                                <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
                            </div> */}
                            <div className="new-comment">
                                <RichTextEditor
                                    value={newCommentContentMap[post.id]}
                                    onChange={(content) => setNewCommentContentMap(prev => ({...prev, [post.id]: content}))}
                                    placeholder="Write a comment..."
                                    showToolbar={false}
                                />
                                <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePosts;