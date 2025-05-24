import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/userMenu.css';

interface UserMenuProps {
  username: string;
  avatarUrl: string;
  activeTab: 'account' | 'bookmarks';
  setActiveTab: (tab: 'account' | 'bookmarks') => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, avatarUrl, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const isGuest = username === 'Guest';

  const handleMenuClick = (e: React.MouseEvent, path?: string) => {
    e.stopPropagation();
    if (isGuest) {
      e.preventDefault();
      navigate('/login');
      return;
    }
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="user-menu-dropdown" onClick={e => e.stopPropagation()}>
      <div className="user-menu-tabs">
        <span
          className={activeTab === 'account' ? 'active' : ''}
          onClick={e => {
            e.stopPropagation();
            setActiveTab('account');
          }}
        >Your account</span>
        <span
          className={activeTab === 'bookmarks' ? 'active' : ''}
          onClick={e => {
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
              <a href="#" onClick={e => handleMenuClick(e, '/news-feed')}>News feed</a>
              <a href="#" onClick={e => handleMenuClick(e, '/your-content')}>Your content</a>
              <a href="/Profile" onClick={e => handleMenuClick(e, '/Profile')}>Account details</a>
              <a href="#" onClick={e => handleMenuClick(e, '/password-security')}>Password and security</a>
              <a href="#" onClick={e => handleMenuClick(e, '/privacy')}>Privacy</a>
              <a href="#" onClick={e => handleMenuClick(e, '/preferences')}>Preferences</a>
              <a href="#" onClick={e => handleMenuClick(e, '/signature')}>Signature</a>
            </div>
            <div>
              <a href="#" onClick={e => handleMenuClick(e, '/reactions-received')}>Reactions received</a>
              <a href="#" onClick={e => handleMenuClick(e, '/alerts')}>Alerts</a>
              <a href="#" onClick={e => handleMenuClick(e, '/account-upgrades')}>Account upgrades</a>
              <a href="#" onClick={e => handleMenuClick(e, '/connected-accounts')}>Connected accounts</a>
              <a href="#" onClick={e => handleMenuClick(e, '/following')}>Following</a>
              <a href="#" onClick={e => handleMenuClick(e, '/ignoring')}>Ignoring</a>
              <a href="#" onClick={e => handleMenuClick(e, '/ads-manager')}>Ads Manager</a>
            </div>
          </div>
          <div className="user-menu-logout">
            <a href="#" onClick={e => handleMenuClick(e, '/logout')}>Log out</a>
          </div>
          <div className="user-menu-status-box">
            <input type="text" placeholder="Update your status..." onClick={e => handleMenuClick(e)} readOnly={isGuest} />
            <button onClick={e => handleMenuClick(e)}>Post</button>
          </div>
        </>
      ) : (
        <div className="user-menu-bookmarks">
          <input className="user-menu-bookmarks-filter" type="text" placeholder="Filter by label..." disabled />
          <div className="user-menu-bookmarks-empty">You have not added any bookmarks yet.</div>
          <a href="#" className="user-menu-bookmarks-showall" onClick={e => handleMenuClick(e, '/bookmarks')}>Show all...</a>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 