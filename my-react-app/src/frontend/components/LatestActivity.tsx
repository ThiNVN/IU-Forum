import React from 'react';

interface Activity {
  id: string;
  type: 'post' | 'comment' | 'like' | 'share';
  content: string;
  date: string;
  target?: string;
}

interface LatestActivityProps {
  userId: string;
}

const LatestActivity: React.FC<LatestActivityProps> = ({ userId }) => {
  // In a real app, you would fetch this data from an API
  const activities: Activity[] = [
    {
      id: '1',
      type: 'post',
      content: 'Created a new post in General Discussion',
      date: '2024-03-18',
      target: 'General Discussion'
    },
    {
      id: '2',
      type: 'comment',
      content: 'Commented on "Thread Title"',
      date: '2024-03-17',
      target: 'Thread Title'
    }
    // Add more sample activities as needed
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'post': return '📝';
      case 'comment': return '💬';
      case 'like': return '❤️';
      case 'share': return '🔄';
      default: return '📌';
    }
  };

  return (
    <div className="latest-activity">
      <div className="activity-timeline">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-details">
              <div className="activity-content">{activity.content}</div>
              <div className="activity-meta">
                <span className="activity-date">{activity.date}</span>
                {activity.target && (
                  <span className="activity-target">in {activity.target}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestActivity; 