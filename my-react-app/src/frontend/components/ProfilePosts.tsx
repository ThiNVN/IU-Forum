import React, { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';

interface ProfilePost {
    id: String;
    content: String;
    date: string;
    likes: number;
    comments: number;
    author: {
        username: String;
        avatar: String;
    }
}

interface ProfilePostsProps {
    userId: string;
}

interface Thread {
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

const ProfilePosts: React.FC<ProfilePostsProps> = ({ userId }) => {
    const [posts, setPosts] = useState<Thread[]>([]);
    const [newPostContent, setNewPostContent] = useState<string>('');
    //const [newCommentContent, setNewCommentContent] = useState<string>('');
    const [newCommentContentMap, setNewCommentContentMap] = useState<{ [postId: string]: string }>({})

    useEffect(() => {
        const fetchUserProfilePost = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`https://localhost:8081/api/getUserProfileThread?userId=${userId}`);

                if (response.ok) {
                    const res = await response.json();
                    const data = res.threads;
                    const userdata = res.user;
                    const formattedPosts: Thread[] = await Promise.all(
                        data.map(async (post: any) => {
                            try {
                                const response = await fetch(`https://localhost:8081/api/getAllCommentOfThread?thread_id=${post.ID}`);
                                const commentData = await response.json();
                                const formattedComments: Comment[] = (commentData.comments || []).map((cmt: any) => ({
                                    id: cmt.ID,
                                    content: cmt.content,
                                    author: cmt.username, // or replace with username if needed
                                    timestamp: cmt.create_at,
                                }));

                                return {
                                    id: post.ID,
                                    content: post.content,
                                    author: userdata.username, // assuming the same author for all posts
                                    timestamp: post.create_at,
                                    comments: formattedComments,
                                };
                            } catch (err) {
                                console.error(`Failed to fetch comments for post ${post.ID}:`, err);
                                return {
                                    id: post.ID,
                                    content: post.content,
                                    author: userdata.username,
                                    timestamp: post.create_at,
                                    comments: [],
                                };
                            }
                        })
                    );

                    setPosts(formattedPosts);
                } else {
                    console.error('Fetch failed:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            }
        };

        fetchUserProfilePost();
    }, [userId]);
    const handlePostSubmit = async () => {
        if (newPostContent.trim() === '') return;

        try {
            const response = await fetch('https://localhost:8081/api/addNewThread', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: userId,             // make sure you have this available
                    content: newPostContent,
                    topic_id: null,
                    image: null
                }),
            });

            if (response.ok) {
                const savedThread = await response.json(); // expect backend to return the inserted post
                const newThread: Thread = {
                    id: savedThread.newThread[0].ID,                     // from DB
                    content: savedThread.newThread[0].content,
                    author: savedThread.userData[0].username,             // returned from backend or locally known
                    timestamp: savedThread.newThread[0].create_at,      // returned from backend
                    //add image if need!
                    comments: []
                };
                setPosts(prev => [...prev, newThread]);
                setNewPostContent('');
            } else {
                console.error('Failed to add post');
            }
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    // DUKE'S LOCAL FILE
    // const handleCommentSubmit = (postId: string) => {
    //     const commentContent = newCommentContentMap[postId];
    //     if (commentContent.trim() === '') return;
    //     const newComment: Comment = {
    //         id: Date.now().toString(),
    //         content: commentContent,
    //         author: 'User', // Replace with actual user name
    //         timestamp: new Date().toISOString()
    //     };
    //     setPosts(posts.map(post => 
    //         post.id === postId 
    //             ? { ...post, comments: [...post.comments, newComment] } 
    //             : post
    //     ));
    //     // setNewCommentContent('');
    //     setNewCommentContentMap(prev => ({...prev, [postId]: ''}));

    //fROM github
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
                    timestamp: savedComment.newComment[0].create_at,
                };
                console.log('Timestamp:', newComment.timestamp);
                console.log('Is valid?', !isNaN(new Date(newComment.timestamp).getTime()));
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId
                            ? { ...post, comments: [...post.comments, newComment] }
                            : post
                    )
                );

                // Clear input for this post only
                setNewCommentContentMap(prev => ({ ...prev, [postId]: '' }));
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };
    // const handlePostSubmit = () => {
    //     if (newPostContent.trim() === '') return;
    //     const newPost: Post = {
    //         id: Date.now().toString(),
    //         content: newPostContent,
    //         author: 'User', // Replace with actual user name
    //         timestamp: new Date().toISOString(),
    //         comments: []
    //         setPosts([...posts, newPost]);
    //         setNewPostContent('');
    //     };
    // const handleCommentSubmit = (postId: string) => {
    //     if (newCommentContent.trim() === '') return;
    //     const newComment: Comment = {
    //         id: Date.now().toString(),
    //         content: newCommentContent,
    //         author: 'User', // Replace with actual user name
    //         timestamp: new Date().toISOString()
    //     };
    //     setPosts(posts.map(post =>
    //         post.id === postId
    //             ? { ...post, comments: [...post.comments, newComment] }
    //             : post
    //     ));
    //     // setNewCommentContent('');
    //     setNewCommentContentMap(prev => ({ ...prev, [postId]: '' }));
    // };
    return (
        <div className="profile-posts">
            <h2>Profile Posts</h2>
            <div className="new-post">
                <RichTextEditor
                    value={newPostContent}
                    onChange={setNewPostContent}
                    placeholder="Write a new post..."
                    showToolbar={false}
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
                                        <span>By {comment.author} </span>
                                        <span>{new Date(comment.timestamp).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}

                            <div className="new-comment">

                                <RichTextEditor
                                    value={newCommentContentMap[post.id] || ""}
                                    onChange={(content) =>
                                        setNewCommentContentMap((prev) => ({
                                            ...prev,
                                            [post.id]: content,
                                        }))
                                    }
                                    placeholder="Write a comment..."
                                    showToolbar={false}
                                />

                            </div>
                            <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePosts;