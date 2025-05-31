import React from 'react';
import '../../styles/navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <a href="/recent" className="navLink">
        Recent activity
      </a>
      <a href="/clubs" className="navLink">
        Clubs
      </a>
      <a href="/chatbot" className="navLink">
        Chatbot
      </a>
    </nav>
  );
};

export default Navbar;
