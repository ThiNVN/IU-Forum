import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import '../styles/Main.css'; 

const Main: React.FC = () => {
  return (
    <div className="mainPage">
      <Header />
      <Navbar />

      <main className="mainContent">
      </main>
    </div>
  );
};

export default Main;
