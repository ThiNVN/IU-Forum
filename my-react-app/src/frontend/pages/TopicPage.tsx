import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
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
  const { topicId } = useParams<{ topicId: string }>();
  const location = useLocation();
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const useSearchResults = location.state?.searchResults;

    if (useSearchResults) {

      const mappedTopics = useSearchResults.map((topic: any) => ({
        slug: topic.title.toLowerCase().replace(/\s+/g, '-'),
        title: topic.title,
        description: topic.description,
        threads: topic.threads?.map((thread: any) => ({
          id: thread.id,
          title: thread.title,
          author: thread.author || 'Unknown',
          createdAt: thread.createdAt ? new Date(thread.createdAt).toISOString().slice(0, 10) : 'Unknown',
          lastActivity: thread.lastActivity ? timeAgo(thread.lastActivity) : 'Unknown',
          replyCount: thread.replyCount || 0,
          description: thread.description
        })) || []
      }));
      setTopics(mappedTopics);
    } else {
      const fetchTopicAndAllThread = async () => {
        try {
          const response = await fetch(`https://localhost:8081/api/getTopicAndAllThread`);
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
          console.error('Failed to fetch topic:', error);
        }
      };

      fetchTopicAndAllThread();
    }
  }, [location.state]);

  // Show all topics + threads of each
  if (!topicId) {
    console.log("Homepage view — show all topics and their threads");

    return (
      <div className="forum-container">
        {topics.map((topic) => (
          <div key={topic.slug} className="mb-12 border-b pb-6">
            {/* Topic Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{topic.title}</h2>
                <p className="text-gray-600">{topic.description}</p>
              </div>
              <Link to={`/topic/${topic.slug}/new-thread`} className="forum-button">
                New Thread
              </Link>
            </div>

            {/* Thread List */}
            <div className="threads-list">
              {topic.threads.length > 0 ? (
                topic.threads.map((thread) => (
                  <Link key={thread.id} to={`/thread/${thread.id}`} className="thread-item">
                    <div className="thread-container">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="thread-title">{thread.title}</h3>
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
                ))
              ) : (
                <p className="text-gray-500 italic">No threads yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Show single topic and its threads
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
        <Link to={`/topic/${topic.slug}/new-thread`} className="forum-button">
          New Thread
        </Link>
      </div>

      <div className="threads-list">
        {topic.threads.map((thread) => (
          <Link key={thread.id} to={`/thread/${thread.id}`} className="thread-item">
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