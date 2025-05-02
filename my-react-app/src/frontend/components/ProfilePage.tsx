import React from 'react';
import ProfilePosts from './ProfilePosts';
import LatestActivity from './LatestActivity';
import Postings from './Postings';
import About from './About';
import '../styles/ProfilePage.css';
import '../styles/ProfileTabs.css';


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

const ProfilePage: React.FC<ProfilePageProps> = ({ isOwnProfile, user }) => {
  const avatar = user.avatar || '/assets/img/guest_avatar.png';
  const title = user.title || 'Member';
  const joined = user.joined || 'Unknown';
  const lastSeen = user.lastSeen || 'Unknown';
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
    var activeTab = 0; // For now, just highlight the first tab
//     What does activeTab mean ?
// activeTab is a variable(or state) that determines which tab is currently selected
//           or highlighted in your tab navigation.
// For example, if activeTab = 0, the first tab("Profile posts") is active; if activeTab = 1, 
//          the second tab("Latest activity") is active, and so on.
// In a real application, you would set activeTab based on the current URL or user interaction,
//           so the correct tab is highlighted as the user navigates.

const renderActiveTab = () => {
  switch (activeTab) {
    case 0:
      return <ProfilePosts userId={userId} />;
    case 1:
      return <LatestActivity userId={userId} />;
    case 2:
      return <Postings userId={userId} />;
    case 3:
      return <About userId={userId} userInfo={{
        biography: "This is a sample biography...",
        location: "Sample Location",
        occupation: "Sample Occupation",
        interests: ["Technology", "Gaming", "Reading"],
        website: "https://example.com",
        socialLinks: {
          Twitter: "https://twitter.com/example",
          LinkedIn: "https://linkedin.com/in/example"
        }
      }} />;
    default:
      return <ProfilePosts userId={userId} />;
  }
};



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
            <div>Last seen: {lastSeen}</div>
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
          <div className="profile-content">
            {renderActiveTab()}
          </div>
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