// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/img/UIlogo.png';
import SearchBar from './Searchbar';
import '../../styles/header.css';
// import { getUser } from '../services/userService'; // your API service

const Header: React.FC = () => {
  const [username, setUsername] = useState<string>('Loading...');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const profileRef = useRef<HTMLDivElement>(null);

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
        <button className="iconButton">🔔</button>
        <button className="iconButton">✉️</button>
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
                <a href="/register" className="dropdownItem">Logout</a>
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