import React from 'react';

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

const ProfilePosts: React.FC<ProfilePostsProps> = ({userId}) => {
    //lấy data ở đây
    //bây giờ fake data trước
    const posts: ProfilePost[] = [
        {
        id: "1",
        content: 'a simple profile post',
        date: '2024-03-18',
        likes: 5,
        comments: 2,
        author: {
            username: 'thien',
            avatar: 'asdadajio.png'
            }
        }
    ];
    return (
        <div className="profile-posts">
            {posts.map(post => (
                <div key={post.id.toString()} className="profile-post">
                    <div className="post-header">
                        <img src={post.author.avatar.toString()} alt={post.author.username.toString()} className="post-avatar" />
                        <div className="post-meta">
                            <span className="post-author">{post.author.username.toString()}</span>
                            <span className="post-date">{post.date}</span>
                        </div>
                    </div>
                    <div className="post-content">{post.content}</div>
                    <div className="post-actions">
                        <button className="action-button">
                            <span>Like ({post.likes})</span>
                        </button>
                        <button className="action-button">
                            <span>Comment ({post.comments})</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProfilePosts;