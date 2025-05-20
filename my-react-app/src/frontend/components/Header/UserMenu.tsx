import React from 'react';
import '../../styles/userMenu.css';

interface UserMenuProps {
  username: string;
  avatarUrl: string;
  activeTab: 'account' | 'bookmarks';
  setActiveTab: (tab: 'account' | 'bookmarks') => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, avatarUrl, activeTab, setActiveTab }) => {
  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="user-menu-dropdown" onClick={handleMenuClick}>
      <div className="user-menu-tabs">
        <span
          className={activeTab === 'account' ? 'active' : ''}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('account');
          }}
        >Your account</span>
        <span
          className={activeTab === 'bookmarks' ? 'active' : ''}
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('bookmarks');
          }}
        >Bookmarks</span>
      </div>
      {activeTab === 'account' ? (
        <>
          <div className="user-menu-header">
            <img src={avatarUrl} alt="avatar" className="user-menu-avatar" />
            <div className="user-menu-info">
              <div className="user-menu-username">{username}</div>
              <div className="user-menu-rank">Senior Member</div>
              <div className="user-menu-stats">
                <span>Messages: 0</span>
                <span>Reaction score: 0</span>
                <span>Trophy points: 0</span>
              </div>
            </div>
          </div>
          <div className="user-menu-links">
            <div>
              <a href="#" onClick={(e) => e.stopPropagation()}>News feed</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Your content</a>
              <a href="/Profile" onClick={(e) => e.stopPropagation()}>Account details</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Password and security</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Privacy</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Preferences</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Signature</a>
            </div>
            <div>
              <a href="#" onClick={(e) => e.stopPropagation()}>Reactions received</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Alerts</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Account upgrades</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Connected accounts</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Following</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Ignoring</a>
              <a href="#" onClick={(e) => e.stopPropagation()}>Ads Manager</a>
            </div>
          </div>
          <div className="user-menu-logout">
            <a href="#" onClick={(e) => e.stopPropagation()}>Log out</a>
          </div>
          <div className="user-menu-status-box">
            <input type="text" placeholder="Update your status..." onClick={(e) => e.stopPropagation()} />
            <button onClick={(e) => e.stopPropagation()}>Post</button>
          </div>
        </>
      ) : (
        <div className="user-menu-bookmarks">
          <input className="user-menu-bookmarks-filter" type="text" placeholder="Filter by label..." disabled />
          <div className="user-menu-bookmarks-empty">You have not added any bookmarks yet.</div>
          <a href="#" className="user-menu-bookmarks-showall">Show all...</a>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 