import React, { useState, useEffect } from 'react';
import '../styles/recentActivity.css';

interface Thread {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  lastActivity: string;
  replyCount: number;
  description: string;
}

interface Topic {
  id: number;
  title: string;
  description: string;
  threadCount: number;
  lastActivity: string;
}

const RecentActivity: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        // Fetch recent threads
        const threadsResponse = await fetch('http://localhost:8081/api/getTopicAndAllThread');
        if (!threadsResponse.ok) {
          throw new Error('Failed to fetch threads');
        }
        const threadsData = await threadsResponse.json();
        
        // Flatten and sort threads by last activity
        const allThreads = threadsData.result.flatMap((topic: any) => 
          topic.threads.map((thread: any) => ({
            ...thread,
            topicTitle: topic.title
          }))
        ).sort((a: any, b: any) => 
          new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        );

        setThreads(allThreads.slice(0, 10)); // Get top 10 most recent threads

        // Fetch recent topics
        const topicsResponse = await fetch('http://localhost:8081/api/getAllCategoryAndTopic');
        if (!topicsResponse.ok) {
          throw new Error('Failed to fetch topics');
        }
        const topicsData = await topicsResponse.json();
        
        // Flatten and sort topics by last activity
        const allTopics = topicsData.result.flatMap((category: any) => 
          category.topics.map((topic: any) => ({
            ...topic,
            categoryTitle: category.title
          }))
        ).sort((a: any, b: any) => 
          new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        );

        setTopics(allTopics.slice(0, 5)); // Get top 5 most recent topics
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  if (loading) {
    return <div className="loading">Loading recent activity...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="recent-activity">
      <div className="recent-threads">
        <h2>Recent Threads</h2>
        {threads.map(thread => (
          <div key={thread.id} className="thread-card">
            <h3>{thread.title}</h3>
            <div className="thread-meta">
              <span>Posted by {thread.author}</span>
              <span>•</span>
              <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span>{thread.replyCount} replies</span>
            </div>
            <p className="thread-description">{thread.description}</p>
            <div className="thread-footer">
              <span className="last-activity">
                Last activity: {new Date(thread.lastActivity).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-topics">
        <h2>Recent Topics</h2>
        {topics.map(topic => (
          <div key={topic.id} className="topic-card">
            <h3>{topic.title}</h3>
            <p className="topic-description">{topic.description}</p>
            <div className="topic-meta">
              <span>{topic.threadCount} threads</span>
              <span>•</span>
              <span>Last activity: {new Date(topic.lastActivity).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity; 