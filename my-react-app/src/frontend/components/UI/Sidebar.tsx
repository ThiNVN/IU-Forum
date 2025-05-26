import React from 'react';
import DateCard from './DateCard';
import DigitalClock from './DigitalClock';
import SpotifyPlayer from '../SpotifyPlayer';
import '../../styles/sidebar.css';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  return (
    <aside className={`sidebar ${className}`}>
      {/* Spotify Player */}
      <SpotifyPlayer />
      
      <div className="sidebar-section">
        <h3>Calendar</h3>
        <DigitalClock />
        <DateCard onDateSelect={(date) => console.log('Selected date:', date)} />
      </div>
      <div className="sidebar-section">
        <h3>Popular Tags</h3>
        <div className="tags-container">
          <span className="tag">#discussion</span>
          <span className="tag">#help</span>
          <span className="tag">#announcement</span>
          <span className="tag">#question</span>
          <span className="tag">#news</span>
          <span className="tag">#event</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 