import React, { useEffect, useState } from 'react';

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
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetch10LatestActivity = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`https://localhost:8081/api/get10LastedActivity?userId=${userId}`);

        if (response.ok) {
          const res = await response.json();
          const activities = res.activities;
          const formattedActivities: Activity[] = activities.map((activity: any) => ({
            id: activity.ID,
            type: activity.activity_type,
            content: activity.description,
            date: activity.created_at,
            target: "Later fix", // In What?
          }));

          setActivities(formattedActivities);
        } else {
          console.error('Fetch failed:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };

    fetch10LatestActivity();
  }, [userId]);

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
        {activities.length === 0 ? (
          <p>No recent activity.</p>
        ) : (
          activities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">{getActivityIcon(activity.type)}</div>
              <div className="activity-details">
                <div className="activity-content">{activity.content}</div>
                <div className="activity-meta">
                  <span className="activity-date">{new Date(activity.date).toLocaleString()}</span>
                  {activity.target && <span className="activity-target"> in {activity.target}</span>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestActivity;
