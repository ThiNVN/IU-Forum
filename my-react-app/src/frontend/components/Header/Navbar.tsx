import React from 'react';
import '../../styles/navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <a href="/today" className="navLink">
        Today's posts
      </a>
      <a href="/latest" className="navLink">
        Lastest posts
      </a>
      <a href="/calendar" className="navLink">
        Calendar
      </a>
      <a href="/clubs" className="navLink">
        Clubs
      </a>
    </nav>
  );
};

export default Navbar;
