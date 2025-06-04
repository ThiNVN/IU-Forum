import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import '../../styles/userMenu.css';

interface UserMenuProps {
  username: string;
  avatarUrl: string;
  activeTab: 'account' | 'bookmarks';
  setActiveTab: (tab: 'account' | 'bookmarks') => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, avatarUrl, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const isGuest = username === 'Guest';

  const handleMenuClick = (e: React.MouseEvent, path?: string) => {
    e.stopPropagation();
    if (path) {
      navigate(path);
    }
  };

  function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
  }

  const handleLogout = async () => {
    sessionStorage.clear();
    await fetch('https://localhost:8081/api/logout', { method: 'POST', credentials: 'include' });
    deleteAllCookies();
    console.log('Session storage and cookies cleared, redirecting to login page.');
    navigate('/login');
  };

  return (
    <div className="user-menu-dropdown" onClick={e => e.stopPropagation()}>
      {isGuest ? (
        <div className="user-menu-guest">
          <div className="user-menu-header">
            <img src={avatarUrl} alt="avatar" className="user-menu-avatar" />
            <div className="user-menu-info">
              <div className="user-menu-username">Guest</div>
              <div className="user-menu-guest-message">Please log in or sign up to access all features</div>
            </div>
          </div>
          <div className="user-menu-guest-actions">
            <button className="user-menu-login-btn" onClick={e => handleMenuClick(e, '/login')}>Log in</button>
            <button className="user-menu-register-btn" onClick={e => handleMenuClick(e, '/register')}>Register</button>
          </div>
        </div>
      ) : (
        <>
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
                  <a href="#" onClick={e => handleMenuClick(e, '/changePassword')}>Password and security</a>
                  <a href="#" onClick={e => handleMenuClick(e, '/privacy')}>Privacy</a>
                  <a href="#" onClick={e => handleMenuClick(e, '/preferences')}>Preferences</a>
                  <a href="#" onClick={e => handleMenuClick(e, '/signature')}>Signature</a>
                  {isAdmin && (
                    <a href="#" onClick={e => handleMenuClick(e, '/admin')} className="admin-link">Admin Dashboard</a>
                  )}
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
                <a href="#" onClick={e => { e.preventDefault(); handleLogout(); }}>Log out</a>
              </div>
              <div className="user-menu-status-box">
                <input type="text" placeholder="Update your status..." />
                <button>Post</button>
              </div>
            </>
          ) : (
            <div className="user-menu-bookmarks">
              <input className="user-menu-bookmarks-filter" type="text" placeholder="Filter by label..." />
              <div className="user-menu-bookmarks-empty">You have not added any bookmarks yet.</div>
              <a href="#" className="user-menu-bookmarks-showall" onClick={e => handleMenuClick(e, '/bookmarks')}>Show all...</a>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserMenu; 