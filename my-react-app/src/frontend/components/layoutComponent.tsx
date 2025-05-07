import React from 'react';
import Header from './Header/Header';
import Navbar from './Header/Navbar';
import Footer from './Header/Footer';
import '../styles/main.css'; 
import {Outlet} from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <div className="mainPage">
      <header>
        <Header />
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />


      {/* <main className="mainContent">
        <h1>Welcome to IU Forum!</h1>
      </main> */}
    </div>
  );
};

export default Main;
