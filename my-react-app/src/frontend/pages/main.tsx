import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import '../styles/main.css'; 

const Main: React.FC = () => {
  return (
    <div className="mainPage">
      <Header />
      <Navbar />

      <main className="mainContent">
        <h1>Welcome to IU Forum!</h1>
      </main>
    </div>
  );
};

export default Main;
