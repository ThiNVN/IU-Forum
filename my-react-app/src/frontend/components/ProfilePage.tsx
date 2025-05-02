import React from 'react';
import '../styles/ProfilePage.css';


interface ProfilePageProps {
  isOwnProfile: boolean;
  user: {
    id: string;
    username: string;
    avatar?: string;
    title?: string;
    joined?: string;
    lastSeen?: string;
    stats?: {
      messages?: number;
      reactionScore?: number;
      points?: number;
    };
  };
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const then = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isOwnProfile, user }) => {
  const avatar = user.avatar || '/assets/img/guest_avatar.png';
  const title = user.title || 'Member';
  const joined = user.joined || 'Unknown';

  const lastSeen = user.lastSeen || 'Unknown';
  const displayTime = lastSeen ? timeAgo(lastSeen) : 'Unknown';
  const stats = user.stats || { messages: 0, reactionScore: 0, points: 0 };
  const userId = user.id;
  const baseProfileUrl = `/profile/${userId}`;
  const tabs = [
    { label: "Profile posts", path: baseProfileUrl },
    { label: "Latest activity", path: `${baseProfileUrl}/latest-activity` },
    { label: "Postings", path: `${baseProfileUrl}/recent-content` },
    { label: "About", path: `${baseProfileUrl}/about` },
  ];
  // You can use a prop or state to determine the active tab if needed
  const activeTab = 0; // For now, just highlight the first tab
  //     What does activeTab mean ?
  // activeTab is a variable(or state) that determines which tab is currently selected
  //           or highlighted in your tab navigation.
  // For example, if activeTab = 0, the first tab("Profile posts") is active; if activeTab = 1, 
  //          the second tab("Latest activity") is active, and so on.
  // In a real application, you would set activeTab based on the current URL or user interaction,
  //           so the correct tab is highlighted as the user navigates.

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={avatar} alt={user.username} />
          {isOwnProfile && <button className="edit-avatar">Edit</button>}
        </div>
        <div className="profile-info">
          <h1>{user.username}</h1>
          <div className="profile-title">{title}</div>
          <div className="profile-details">
            <div>Joined: {joined}</div>
            <div>Last seen: {displayTime}</div>
          </div>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <div className="stat-label">Messages</div>
          <div className="stat-value">{stats.messages}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Reaction Score</div>
          <div className="stat-value">{stats.reactionScore}</div>
        </div>
        <div className="stat">
          <div className="stat-label">Points</div>
          <div className="stat-value">{stats.points}</div>
        </div>

      </div>
      <h2 className="profile-tabs-header" role="tablist">
        <span className="profile-tabs-scroll">
          {tabs.map((tab, idx) => (
            <a
              key={tab.label}
              href={tab.path}
              className={`profile-tab${activeTab === idx ? " profile-tab--active" : ""}`}
              role="tab"
              aria-selected={activeTab === idx}
            >
              {tab.label}
            </a>
          ))}
        </span>
      </h2>
      <div className="profile-actions">
        {isOwnProfile ? (
          <button className="action-button">Edit Profile</button>
        ) : (
          <>
            <button className="action-button">Send Message</button>
            <button className="action-button">Report</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 