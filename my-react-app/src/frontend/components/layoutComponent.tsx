import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
// import Footer from '../components/Footer';
import '../styles/main.css'; 
import {Outlet} from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <div className="mainPage">
      <header>
        <Header />
        <Navbar />
      </header>

      {/* <Footer /> */}
      <main>
        <Outlet />
      </main>

      {/* <main className="mainContent">
        <h1>Welcome to IU Forum!</h1>
      </main> */}
    </div>
  );
};

export default Main;
