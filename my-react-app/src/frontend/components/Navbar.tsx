import React from 'react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <a href="#" className="navLink">
        Today's posts
      </a>
      <a href="#" className="navLink">
        Lastest posts
      </a>
      <a href="#" className="navLink">
        Calendar
      </a>
      <a href="#" className="navLink">
        Clubs
      </a>
    </nav>
  );
};

export default Navbar;
