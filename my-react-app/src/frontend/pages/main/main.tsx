import React, { useState } from 'react';
import { Card } from '../../components/UI/Card';
import Sidebar from '../../components/UI/Sidebar';
import Breadcrumb from '../../components/Breadcrumb';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../HomePage';
import TopicPage from '../Topic&Thread/TopicPage';
import ThreadPage from '../Topic&Thread/ThreadPage';
import '../../styles/main.css';


const MainPage: React.FC = () => {
  const [tags, setTags] = useState(['Tag1', 'Tag2', 'Tag3', 'Tag4']);
  // mock data

  return (
    <div className="mainPage">
      <Breadcrumb />
      <div className="main-content">
        <div className="main-column">


          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
            <Route path="/thread/:threadId" element={<ThreadPage />} />
          </Routes>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

interface TopicSectionProps {
  title: string;
  description: string;
  count: number;
  posts: number;
}

const TopicSection: React.FC<TopicSectionProps> = ({ title, description, count, posts }) => (
  <div className="topicSection">
    <h3 className="topicTitle">{title}</h3>
    <p className="topicDescription">{description}</p>
    <div className="topicStats">Topics: {count} • Posts: {posts}</div>
  </div>
);

export default MainPage;
