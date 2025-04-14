// src/components/auth/LeftPanel.tsx
import React from 'react';
import logo from './logo.jpg';
import '../styles/register.css';

interface LeftPanelProps {
  title?: string;
  showBreakingNews?: boolean;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  title = 'Hệ thống diễn đàn Đại học Quốc Tế - Đại học Quốc Gia Hồ Chí Minh',
  showBreakingNews = true,
}) => {
  return (
    <div className="leftPanel">
      <div className="leftContent">
        <div className="logoPlaceholder">
            <img src={logo} alt="logo" />
        </div>
        
        <a
          href="https://IU.forum.edu.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          IU.forum.edu.vn
        </a>
        <h1 className= "title">{title} </h1>
        {showBreakingNews && (
          <div className="breakingNews">Breaking News Placeholder</div>
        )}
        <div className="footerLinks">
          <a href="#" className="link">Privacy Policy</a>
          <span>&nbsp;|&nbsp;</span>
          <a href="#" className="link">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
