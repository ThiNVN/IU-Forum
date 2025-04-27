import React from 'react';
import InputField from './InputField';
import '../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logoTitle">
        <img src="../assets/img/IUlogo.png" alt="IU Logo" className="logoImage" />
        <span className="forumTitle">IU Forum</span>
      </div>

      <div className="searchBar">
        <InputField
          label=""
          name="search"
          value=""
          onChange={() => {}}
          placeholder="Type here to search"
        />
        <button className="searchButton">🔍</button>
      </div>

      <div className="actions">
        <button className="iconButton">🔔</button>
        <button className="iconButton">✉️</button>
        <button className="createButton">+ Create</button>

        <div className="userProfile">
          <img src="../assets/img/avatar.png" alt="User Avatar" className="avatar" />
          <span className="userName">AR. Jakir</span>
        </div>

        <button className="iconButton">🎨</button>
        <button className="iconButton">🌙</button>
      </div>
    </header>
  );
};

export default Header;
