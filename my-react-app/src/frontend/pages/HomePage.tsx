import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Category from '../components/Category';
import '../styles/forum.css';

interface Topic {
  id: string;
  title: string;
  description: string;
  threadCount: number;
  lastActivity: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

function timeAgo(dateString: string): string {
  const now = new Date();
  const then = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  return `${days} days ago`;
}

const HomePage: React.FC = () => {
  const location = useLocation();
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    if (location.state?.searchResults) {
      const mappedSections = location.state.searchResults.map((section: any) => ({
        id: section.id,
        title: section.title,
        description: section.description,
        topics: section.topics.map((topic: any) => ({
          id: topic.id,
          title: topic.title,
          description: topic.description,
          threadCount: topic.threadCount,
          lastActivity: topic.lastActivity ? timeAgo(topic.lastActivity) : 'Unknown',
        })),
      }));

      setSections(mappedSections);
    } else {
      // fallback to loading all categories and topics
      const fetchDefaultData = async () => {
        try {
          const response = await fetch(`http://localhost:8081/api/getAllCategoryAndTopic`);
          if (response.ok) {
            const res = await response.json();
            const sectionData = res.result;
            const mappedSections = sectionData.map((section: any) => ({
              id: section.ID,
              title: section.title,
              description: section.description,
              topics: section.topics.map((topic: any) => ({
                id: topic.id,
                title: topic.title,
                description: topic.description,
                threadCount: topic.count,
                lastActivity: topic.lastActivity ? timeAgo(topic.lastActivity) : 'Unknown',
              })),
            }));
            setSections(mappedSections);
          }
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      };

      fetchDefaultData();
    }
  }, [location.state]);

  return (
    <div className="forum-container">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">IU Forum</h1>
      <div className="categories-container">
        {sections.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            title={category.title}
            description={category.description}
            topics={category.topics}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
