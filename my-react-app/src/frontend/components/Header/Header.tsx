// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/img/UIlogo.png';
import defaultavt from '../../assets/img/avt/guest_avatar.png'
import SearchBar from './Searchbar';
import NotificationPanel from '../UI/NotificationPanel';
import UserMenu from './UserMenu';
import '../../styles/header.css';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import CreateThreadModal from '../CreateThreadModal';
// import { getUser } from '../services/userService'; // your API service

interface HeaderProps {
  headerFooterColor: string;
  setHeaderFooterColor: (color: string) => void;
}

const Header: React.FC<HeaderProps> = ({ headerFooterColor, setHeaderFooterColor }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [username, setUsername] = useState<string>('Loading...');
  const [avatar, setAvatar] = useState<string>(defaultavt);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'account' | 'bookmarks'>('account');
  const userProfileRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const navigate = useNavigate();
  //   useEffect(() => {
  //     const fetchUsername = async () => {
  //       try {
  //         const user = await getUser();
  //         setUsername(user.username);
  //       } catch (error) {
  //         console.error('Failed to fetch username:', error);
  //         setUsername('Guest');
  //       }
  //     };

  //     fetchUsername();
  //   }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        setUsername('Guest');
        setAvatar(defaultavt);
        return;
      }
      try {
        const response = await fetch('https://localhost:8081/api/getUserProfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        if (response.ok) {
          const res = await response.json();
          const data = res.userProfile;
          setUsername(data.username || 'Guest');
          setAvatar(data.avatar ? `../../assets/img/avt/${data.avatar}` : defaultavt);
        } else {
          setUsername('Guest');
          setAvatar(defaultavt);
        }
      } catch (error) {
        setUsername('Guest');
        setAvatar(defaultavt);
      }
    };
    fetchUserProfile();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    setActiveTab('account'); // Reset to account tab when opening
  };

  const isGuest = username === 'Guest';
  const handleLogout = async () => {
    try {
      const response = await fetch('https://localhost:8081/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (response.ok) {
        // Clear sessionStorage
        sessionStorage.removeItem('userId');
        // Redirect to login page
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Color picker handler
  const handleColorButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGuest) {
      navigate('/login');
      return;
    }
    setShowColorPicker((prev) => !prev);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setShowColorPicker(false);
    setHeaderFooterColor(color);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userProfileRef.current && !userProfileRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleCreateClick = () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }
    setIsCreateModalOpen(true);
  };

  return (
    <header>
      <div className='header' style={{ backgroundColor: headerFooterColor }}>
        <a href='/' className="logoTitle" style={{ textDecoration: 'none' }}>
          <img src={logo} alt="IU Logo" className="logoImage" />
          <span className="forumTitle">IU Forum</span>
        </a>

        <div className="searchBar">
          <SearchBar />
        </div>

        <div className="actions">
          <NotificationPanel />
          <button className="createButton" onClick={handleCreateClick}>+ Create</button>

          {/* User Avatar with dropdown */}
          <div className="userProfile" onClick={toggleDropdown} ref={userProfileRef} style={{ position: 'relative' }}>
            <img
              src={avatar}
              alt="User Avatar"
              className="avatar"
            />
            <span className="userName">{username}</span>

            {dropdownOpen && (
              <UserMenu
                username={username}
                avatarUrl={avatar}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
          </div>

          <button className="iconButton" onClick={handleColorButtonClick}>🎨</button>
          {showColorPicker && (
            <div className="color-picker-panel" style={{ position: 'absolute', top: '60px', right: '60px', background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', zIndex: 2000 }}>
              <label htmlFor="header-footer-color" style={{ color: 'black' }}>Pick header/footer color:</label>
              <input
                id="header-footer-color"
                type="color"
                value={headerFooterColor}
                onChange={handleColorChange}
                style={{ marginLeft: '1rem', width: '40px', height: '40px', border: 'none', background: 'none' }}
              />
            </div>
          )}
          <button 
            className="iconButton theme-toggle" 
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      <CreateThreadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </header>
  );
};

export default Header;