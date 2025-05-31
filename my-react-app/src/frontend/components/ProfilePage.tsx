import React, { useState, useRef } from 'react';
import ProfilePosts from './ProfilePosts';
import LatestActivity from './LatestActivity';
import Postings from './Postings';
import About from './About';
import '../styles/ProfilePage.css';
import '../styles/ProfileTabs.css';
import defaultAvatar from '../assets/img/avt/guest_avatar.png';

interface ProfilePageProps {
  isOwnProfile: boolean;
  user: {
    id: string;
    username: string;
    avatar?: string;
    title?: string;
    joined?: string;
    lastSeen?: string;
    location?: string;
    occupation?: string;
    website?: string,
    Twitter?: string,
    bio?: string;
    LinkedIn?: string,
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
  const [avatarError, setAvatarError] = useState(false);
  const [avatar, setAvatar] = useState(!avatarError && user.avatar ? user.avatar : defaultAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const title = user.title || '';
  var joined = user.joined || 'Unknown';
  if (joined !== 'Unknown') {
    const date = new Date(joined);
    const formatted = `${date.toLocaleDateString('en-CA')} at ${date.toLocaleTimeString('en-US')}`;
    joined = formatted;
  }
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
  // Use state for the active tab
  const [activeTab, setActiveTab] = useState(0);

  const isGuest = !sessionStorage.getItem('userId');

  const handleAvatarError = () => {
    setAvatarError(true);
    setAvatar(defaultAvatar);
  };
  const handleAvatarClick = () => {
    if (!isGuest && isOwnProfile && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, WebP, HEIC, or GIF)');
      return;
    }

    try {
      // Create a unique filename using username
      const fileExtension = file.name.split('.').pop();
      const newFileName = `${user.username}_avatar.${fileExtension}`;

      // Here you would typically upload the file to your server
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      setAvatarError(false);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("image", blob, "image.png");
      formData.append("userId", userId);
      const uploadresponse = await fetch("https://localhost:8081/api/uploadAvatar", {
        method: "POST",
        body: formData,
      });
      if (uploadresponse.ok) {
        alert('Successful update avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    }
  };

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
          biography: user.bio || "This is a sample biography...",
          location: user.location || "Sample Location",
          occupation: user.occupation || "Sample Occupation",
          interests: ["Technology", "Gaming", "Reading"],//Need or not
          website: user.website || "https://example.com",
          socialLinks: {
            Twitter: user.Twitter || "https://twitter.com/example",
            LinkedIn: user.LinkedIn || "https://linkedin.com/in/example"
          }
        }} />;
      default:
        return <ProfilePosts userId={userId} />;
    }
  };



  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar" onClick={handleAvatarClick}>
          <img
            src={avatar}
            alt={user.username}
            onError={handleAvatarError}
          />
          {!isGuest && isOwnProfile && (
            <>
              <button className="edit-avatar">Edit</button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/gif"
                style={{ display: 'none' }}
              />
            </>
          )}
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
            <button
              key={tab.label}
              type="button"
              className={`profile-tab${activeTab === idx ? " profile-tab--active" : ""}`}
              role="tab"
              aria-selected={activeTab === idx}
              onClick={() => setActiveTab(idx)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {tab.label}
            </button>
          ))}
        </span>
      </h2>
      <div className="profile-content">
        {renderActiveTab()}
      </div>
      <div className="profile-actions">
        {isOwnProfile ? (
          <a href={`/profile/${userId}/edit`} className="action-button">
            Edit Profile
          </a>
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