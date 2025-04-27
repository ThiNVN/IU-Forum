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
        <h1>Welcome to IU Forum!</h1>
        <p>This is your main page content. 🚀</p>
      </main>
    </div>
  );
};

export default Main;
