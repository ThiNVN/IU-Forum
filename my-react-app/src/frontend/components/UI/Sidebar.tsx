import React, { useEffect, useState } from 'react';
import DateCard from './DateCard';
import DigitalClock from './DigitalClock';
import SpotifyPlayer from '../SpotifyPlayer';
import '../../styles/sidebar.css';

interface SidebarProps {
  className?: string;
}
interface Tag {
  id: string,
  name: string
}
const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    const fetch5MostThreadTag = async () => {
      try {
        const response = await fetch(`https://localhost:8081/api/5MostThreadTag`);

        if (response.ok) {
          const res = await response.json();
          const tags = res.result;

          const formattedTags: Tag[] = tags.map((tag: any) => ({
            id: tag.tag_id,
            name: tag.tag_name,
          }));

          setTags(formattedTags);
        } else {
          console.error('Fetch failed:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    fetch5MostThreadTag();
  }, []);

  console.log(tags)
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
          {tags.map(tag => (
            <span key={tag.id} className="tag" data-id={tag.id}>
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 