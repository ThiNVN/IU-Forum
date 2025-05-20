import React from 'react';
import { Link } from 'react-router-dom';

interface Topic {
  id: string;
  title: string;
  description: string;
  threadCount: number;
  lastActivity: string;
}

interface CategoryProps {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

const Category: React.FC<CategoryProps> = ({ id, title, description, topics }) => {
  return (
    <div className="category-container">
      <h2 className="category-title">{title}</h2>
      <p className="category-description">{description}</p>
      
      <div className="topics-list">
        {topics.map((topic) => (
          <div key={topic.id} className="topic-item">
            <div className="flex justify-between items-center">
              <div>
                <Link 
                  to={`/topic/${topic.title.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="topic-title hover:text-blue-700"
                >
                  {topic.title}
                </Link>
                <p className="topic-description">{topic.description}</p>
              </div>
              <div className="text-right">
                <p className="topic-stats">{topic.threadCount} threads</p>
                <p className="text-xs text-gray-400">Last activity: {topic.lastActivity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category; 