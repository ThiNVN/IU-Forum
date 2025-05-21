import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/forum.css';

interface Thread {
  id: string;
  title: string;
  author: string;
  createdAt: string;
  lastActivity: string;
  replyCount: number;
  description?: string;
}

interface Topic {
  slug: string | undefined;
  title: string;
  description: string;
  threads: Thread[];
}

// Mock data - replace with actual API calls later
// const mockTopics: Record<string, Topic> = {
//   'welcome-to-iu-forum': {
//     title: 'Welcome to IU Forum',
//     description: 'Introduce yourself and get to know other members',
//     threads: [
//       {
//         id: '1',
//         title: 'How to prepare for final exams?',
//         author: 'JohnDoe',
//         createdAt: '2024-03-15',
//         lastActivity: '2 hours ago',
//         replyCount: 12
//       },
//       {
//         id: '2',
//         title: 'Best study spots on campus',
//         author: 'JaneSmith',
//         createdAt: '2024-03-14',
//         lastActivity: '1 day ago',
//         replyCount: 8
//       }
//     ]
//   },
//   'campus-life': {
//     title: 'Campus Life',
//     description: 'Discuss campus events, activities, and student life at IU',
//     threads: [
//       {
//         id: '3',
//         title: 'Spring Festival 2024 - Event Details and Schedule',
//         author: 'EventCoordinator',
//         createdAt: '2024-03-10',
//         lastActivity: '3 hours ago',
//         replyCount: 45,
//         description: 'Complete schedule and information about the upcoming Spring Festival'
//       },
//       {
//         id: '4',
//         title: 'New Student Club: Photography Enthusiasts',
//         author: 'PhotoClub',
//         createdAt: '2024-03-12',
//         lastActivity: '5 hours ago',
//         replyCount: 23,
//         description: 'Join our new photography club! Weekly meetups and workshops'
//       },
//       {
//         id: '5',
//         title: 'Campus Food Court Renovation Updates',
//         author: 'CampusAdmin',
//         createdAt: '2024-03-13',
//         lastActivity: '1 day ago',
//         replyCount: 67,
//         description: 'Latest updates on the food court renovation project'
//       },
//       {
//         id: '6',
//         title: 'International Students Meet & Greet',
//         author: 'GlobalOffice',
//         createdAt: '2024-03-14',
//         lastActivity: '2 hours ago',
//         replyCount: 34,
//         description: 'Monthly meetup for international students'
//       },
//       {
//         id: '7',
//         title: 'Sports Complex Opening Hours',
//         author: 'SportsDept',
//         createdAt: '2024-03-15',
//         lastActivity: 'Just now',
//         replyCount: 12,
//         description: 'Updated opening hours and available facilities'
//       }
//     ]
//   }
// };

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

const TopicPage: React.FC = () => {


  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopicAndAllThread = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/getTopicAndAllThread`);
        if (response.ok) {
          const res = await response.json();
          const topicsData = res.result;
          const mappedTopics = topicsData.map((topic: any) => ({
            slug: topic.title.toLowerCase().replace(/\s+/g, '-'),
            title: topic.title,
            description: topic.description,
            threads: topic.threads.map((thread: any) => ({
              id: thread.id,
              title: thread.title,
              author: thread.author,
              createdAt: thread.createdAt ? new Date(thread.createdAt).toISOString().slice(0, 10) : 'Unknown',
              lastActivity: thread.lastActivity ? timeAgo(thread.lastActivity) : 'Unknown',
              replyCount: thread.replyCount,
              description: thread.description
            }))
          }));
          setTopics(mappedTopics);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchTopicAndAllThread();
  }, []);

  const { topicId } = useParams<{ topicId: string }>();
  const topic = topics.find(t => t.slug === topicId);
  if (!topic) {
    return (
      <div className="forum-container">
        <div className="error-message">Topic not found</div>
      </div>
    );
  }

  return (
    <div className="forum-container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{topic.title}</h1>
          <p className="text-gray-600 mt-2">{topic.description}</p>
        </div>
        <Link
          to={`/topic/${topicId}/new-thread`}
          className="forum-button"
        >
          New Thread
        </Link>
      </div>

      <div className="threads-list">
        {topic.threads.map((thread) => (
          <Link
            key={thread.id}
            to={`/thread/${thread.id}`}
            className="thread-item"
          >
            <div className="thread-container">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="thread-title">{thread.title}</h2>
                  {thread.description && (
                    <p className="text-sm text-gray-600 mt-1">{thread.description}</p>
                  )}
                  <p className="thread-meta mt-2">
                    Posted by {thread.author} on {thread.createdAt}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="thread-stats">{thread.replyCount} replies</p>
                  <p className="thread-meta">Last activity: {thread.lastActivity}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicPage; 