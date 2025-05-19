// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/img/UIlogo.png';
import SearchBar from './Searchbar';
import NotificationPanel from '../UI/NotificationPanel';
import '../../styles/header.css';
import { useNavigate } from 'react-router-dom';
// import { getUser } from '../services/userService'; // your API service

const Header: React.FC = () => {
  const [username, setUsername] = useState<string>('Loading...');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const profileRef = useRef<HTMLDivElement>(null);

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
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const isGuest = username === 'Guest';
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
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
  return (
    <header>
      <div className='header'>
        <a href='/main' className="logoTitle">
          <img src={logo} alt="IU Logo" className="logoImage" />
          <span className="forumTitle">IU Forum</span>
        </a>

        <div className="searchBar">
          <SearchBar />
        </div>

        <div className="actions">
          <NotificationPanel />
          <button className="createButton">+ Create</button>

          {/* User Avatar with dropdown */}
          <div className="userProfile" onClick={toggleDropdown} ref={profileRef}>
            <img
              src={isGuest ? '../assets/img/guest_avatar.png' : '../assets/img/avatar.png'}
              alt="User Avatar"
              className="avatar"
            />
            <span className="userName">{username}</span>

            {dropdownOpen && (
              <div className="dropdownMenu">
                {!isGuest && <a href="/profile" className="dropdownItem">Profile</a>}
                <a href="/settings" className="dropdownItem">Settings</a>
                {isGuest ? (
                  <a href="/login" className="dropdownItem">Login</a>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="dropdownItem"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}
                  >
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

          <button className="iconButton">🎨</button>
          <button className="iconButton">🌙</button>
        </div>
      </div>
    </header>
  );
};

export default Header;