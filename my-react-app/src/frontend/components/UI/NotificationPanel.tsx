import React, { useState, useEffect, useRef } from 'react';
import '../../styles/notification.css';

// Import icon images
import bellIcon from '../../assets/icons/bell.svg';
import envelopeIcon from '../../assets/icons/envelope.svg';

interface Notification {
  id: number;
  type: 'notification' | 'message';
  content: string;
  timestamp: string;
  read: boolean;
}

const NotificationPanel: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState({ notifications: 0, messages: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch notifications and messages from the backend
    const fetchData = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) return;

      try {
        const response = await fetch(`http://localhost:8081/api/getNotifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          const data = await response.json();
          setNotifications(data.notifications || []);
          // Update unread counts
          const unreadNotifs = data.notifications?.filter((n: Notification) => !n.read && n.type === 'notification').length || 0;
          const unreadMsgs = data.notifications?.filter((n: Notification) => !n.read && n.type === 'message').length || 0;
          setUnreadCount({ notifications: unreadNotifs, messages: unreadMsgs });
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
        setShowMessages(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotifications = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    setShowMessages(false);
  };

  const toggleMessages = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMessages(!showMessages);
    setShowNotifications(false);
  };

  const markAsRead = async (id: number) => {
    try {
      const response = await fetch('http://localhost:8081/api/markNotificationAsRead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId: id }),
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === id ? { ...notification, read: true } : notification
          )
        );
        // Update unread counts
        const unreadNotifs = notifications.filter(n => !n.read && n.type === 'notification').length;
        const unreadMsgs = notifications.filter(n => !n.read && n.type === 'message').length;
        setUnreadCount({ notifications: unreadNotifs, messages: unreadMsgs });
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const renderNotificationList = (type: 'notification' | 'message') => {
    const filteredNotifications = notifications.filter(n => n.type === type);
    
    if (filteredNotifications.length === 0) {
      return <div className="empty-state">No {type}s found</div>;
    }

    return (
      <div className="notification-list">
        {filteredNotifications.map(notification => (
          <div
            key={notification.id}
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="notification-content">{notification.content}</div>
            <div className="notification-timestamp">{notification.timestamp}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="notification-panel" ref={panelRef}>
      <div className="notification-icons">
        <div className="icon-container" onClick={toggleNotifications}>
          <img src={bellIcon} alt="Notifications" className="icon" />
          {unreadCount.notifications > 0 && (
            <span className="badge">{unreadCount.notifications}</span>
          )}
        </div>
        <div className="icon-container" onClick={toggleMessages}>
          <img src={envelopeIcon} alt="Messages" className="icon" />
          {unreadCount.messages > 0 && (
            <span className="badge">{unreadCount.messages}</span>
          )}
        </div>
      </div>

      {showNotifications && (
        <div className="popup notifications-popup">
          <h3>Notifications</h3>
          {renderNotificationList('notification')}
        </div>
      )}

      {showMessages && (
        <div className="popup messages-popup">
          <h3>Messages</h3>
          {renderNotificationList('message')}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel; 