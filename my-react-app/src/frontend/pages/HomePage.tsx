import React from 'react';
import Category from '../components/Category';
import '../styles/forum.css';

// Mock data - replace with actual API calls later
const mockCategories = [
  {
    id: '1',
    title: 'General Discussion',
    description: 'General topics and discussions about IU',
    topics: [
      {
        id: '1',
        title: 'Welcome to IU Forum',
        description: 'Introduce yourself and get to know other members',
        threadCount: 15,
        lastActivity: '2 hours ago'
      },
      {
        id: '2',
        title: 'Campus Life',
        description: 'Discuss campus events, activities, and student life',
        threadCount: 23,
        lastActivity: '1 day ago'
      }
    ]
  },
  {
    id: '2',
    title: 'Academic',
    description: 'Academic discussions and course-related topics',
    topics: [
      {
        id: '3',
        title: 'Course Registration',
        description: 'Questions and discussions about course registration',
        threadCount: 45,
        lastActivity: '3 hours ago'
      },
      {
        id: '4',
        title: 'Study Groups',
        description: 'Find study partners and form study groups',
        threadCount: 12,
        lastActivity: '5 hours ago'
      }
    ]
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="forum-container">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">IU Forum</h1>
      
      <div className="categories-container">
        {mockCategories.map((category) => (
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