import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
  fromUser?: {
    username: string;
    avatar: string;
  };
  threadId?: number;
  commentId?: number;
}

const NotificationPanel: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState({ notifications: 0, messages: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const handleGuestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/login');
  };

  const fetchNotifications = async () => {
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

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      fetchNotifications();
      // Set up polling for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
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
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      handleGuestClick(e);
      return;
    }
    setShowNotifications(!showNotifications);
    setShowMessages(false);
  };

  const toggleMessages = (e: React.MouseEvent) => {
    e.stopPropagation();
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      handleGuestClick(e);
      return;
    }
    setShowMessages(!showMessages);
    setShowNotifications(false);
  };

  const markAsRead = async (id: number) => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

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

  const markAllAsRead = async (type: 'notification' | 'message') => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/markAllNotificationsAsRead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(notification =>
            notification.type === type ? { ...notification, read: true } : notification
          )
        );
        // Update unread counts
        setUnreadCount(prev => ({
          ...prev,
          [type === 'notification' ? 'notifications' : 'messages']: 0
        }));
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const renderNotificationList = (type: 'notification' | 'message') => {
    const filteredNotifications = notifications.filter(n => n.type === type);
    
    if (filteredNotifications.length === 0) {
      return <div className="empty-state">No {type}s found</div>;
    }

    return (
      <div className="notification-list">
        <div className="notification-header">
          <h3>{type === 'notification' ? 'Notifications' : 'Messages'}</h3>
          {filteredNotifications.some(n => !n.read) && (
            <button 
              className="mark-all-read"
              onClick={() => markAllAsRead(type)}
            >
              Mark all as read
            </button>
          )}
        </div>
        {filteredNotifications.map(notification => (
          <div
            key={notification.id}
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            onClick={() => markAsRead(notification.id)}
          >
            {notification.fromUser && (
              <img 
                src={notification.fromUser.avatar} 
                alt={notification.fromUser.username}
                className="notification-avatar"
              />
            )}
            <div className="notification-content">
              <div className="notification-text">{notification.content}</div>
              <div className="notification-timestamp">
                {new Date(notification.timestamp).toLocaleString()}
              </div>
            </div>
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
          {sessionStorage.getItem('userId') && unreadCount.notifications > 0 && (
            <span className="badge">{unreadCount.notifications}</span>
          )}
        </div>
        <div className="icon-container" onClick={toggleMessages}>
          <img src={envelopeIcon} alt="Messages" className="icon" />
          {sessionStorage.getItem('userId') && unreadCount.messages > 0 && (
            <span className="badge">{unreadCount.messages}</span>
          )}
        </div>
      </div>

      {showNotifications && (
        <div className="popup notifications-popup">
          {renderNotificationList('notification')}
        </div>
      )}

      {showMessages && (
        <div className="popup messages-popup">
          {renderNotificationList('message')}
        </div>
      )}
    </div>
  );
};

export default NotificationPanel; 