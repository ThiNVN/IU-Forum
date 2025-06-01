import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Navbar from './Header/Navbar';
import Footer from './Header/Footer';
import Sidebar from './UI/Sidebar';
import '../styles/main.css'; 
import {Outlet} from 'react-router-dom';

const Main: React.FC = () => {
  const [headerFooterColor, setHeaderFooterColor] = useState<string>(() => localStorage.getItem('headerFooterColor') || '#2c2172');

  useEffect(() => {
    localStorage.setItem('headerFooterColor', headerFooterColor);
  }, [headerFooterColor]);

  return (
    <div className="mainPage">
      <header>
        <Header headerFooterColor={headerFooterColor} setHeaderFooterColor={setHeaderFooterColor} />
        <Navbar />
      </header>

      <div className="main-content">
        <main className="main-column">
          <Outlet />
        </main>
        <Sidebar />
      </div>

      <Footer headerFooterColor={headerFooterColor} />


      {/* <main className="mainContent">
        <h1>Welcome to IU Forum!</h1>
      </main> */}
    </div>
  );
};

export default Main;
