import React, { useEffect, useState } from 'react';
import { Card } from '../../components/UI/Card';
import Breadcrumb from '../../components/Header/Breadcrumb';
import Sidebar from '../../components/UI/Sidebar';
import '../../styles/main.css';

interface Topic {
  id: number;
  title: string;
  description: string;
  count: number; //Set to 0 for all
  posts: number; //number of post in each thread
}

interface Section {
  id: number;
  title: string;
  topics: Topic[];
}

const MainPage: React.FC = () => {
  // const [breadcrumbs, setBreadcrumbs] = useState([]);
  // const [sections, setSections] = useState([]);
  // const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   fetch('/api/breadcrumb')
  //     .then(res => res.json())
  //     .then(setBreadcrumbs);

  //   fetch('/api/sections')
  //     .then(res => res.json())
  //     .then(setSections);

  //   fetch('/api/tags')
  //     .then(res => res.json())
  //     .then(setTags);
  // }, []);

  // mock data
  const [breadcrumbs, setBreadcrumbs] = useState([
    { name: 'Home', url: '/' },
    { name: 'Main', url: '/main' },
    { name: 'Section 1', url: '/main/section1' },
    { name: 'Topic 2', url: '/main/section1/topic2' },
  ]);


  // const [sections, setSections] = useState([
  //   {
  //     id: 1,
  //     title: 'Section 1',
  //     topics: [
  //       { id: 1, title: 'Topic 1', description: 'Description of Topic 1', count: 5, posts: 100 },
  //       { id: 2, title: 'Topic 2', description: 'Description of Topic 2', count: 8, posts: 150 },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: 'Section 2',
  //     topics: [
  //       { id: 3, title: 'Topic 3', description: 'Description of Topic 3', count: 2, posts: 30 },
  //       { id: 4, title: 'Topic 4', description: 'Description of Topic 4', count: 10, posts: 200 },
  //     ],
  //   },
  // ]);

  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/getAllSections`);
        if (response.ok) {
          const res = await response.json();
          const sectionData = res.result;
          const mappedSections = sectionData.map((section: any) => ({
            id: section.ID,
            title: section.title,
            topics: section.topics.map((topic: any) => ({
              id: topic.id,
              title: topic.title,
              description: topic.description,
              count: topic.count,
              posts: topic.posts
            }))
          }));

          setSections(mappedSections);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUserProfile();
  }, []);
  const [tags, setTags] = useState(['Tag1', 'Tag2', 'Tag3', 'Tag4']);
  // mock data

  return (
    <div className="mainPage">
      <Breadcrumb trail={breadcrumbs} />
      <div className="main-content">
        <div className="main-column">
          {sections.map(section => (
            <Card key={section.id} className="sectionCard">
              <h2 className="sectionTitle">{section.title}</h2>
              {section.topics.map(topic => (
                <TopicSection key={topic.id} {...topic} />
              ))}
            </Card>
          ))}
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

// mock data
interface TopicSectionProps {
  title: string;
  description: string;
  count: number;
  posts: number;
}
// mock data

const TopicSection: React.FC<TopicSectionProps> = ({ title, description, count, posts }) => (
  <div className="topicSection">
    <h3 className="topicTitle">{title}</h3>
    <p className="topicDescription">{description}</p>
    <div className="topicStats">Topics: {count} • Posts: {posts}</div>
  </div>
);

export default MainPage;
