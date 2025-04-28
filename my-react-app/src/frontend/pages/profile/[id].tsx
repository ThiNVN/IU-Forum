import React from 'react';
import { useParams } from 'react-router-dom';
import ProfilePage from '../../components/ProfilePage';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const mockUser = {
    id: id || 'unknown',
    username: 'Other User',
    title: 'Member',
    joined: 'Feb 1, 2023',
    lastSeen: '2 hours ago',
    stats: {
      messages: 50,
      reactionScore: 25,
      points: 10
    }
  };

  return <ProfilePage isOwnProfile={false} user={mockUser} />;
};

export default UserProfile; 