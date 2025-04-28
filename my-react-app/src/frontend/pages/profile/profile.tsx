import React from 'react';
import ProfilePage from '../../components/ProfilePage';

const Profile: React.FC = () => {
  const mockUser = {
    id: '1',
    username: 'Current User',
    title: 'Senior Member',
    joined: 'Jan 1, 2023',
    lastSeen: 'Just now',
    stats: {
      messages: 100,
      reactionScore: 50,
      points: 25
    }
  };

  return <ProfilePage isOwnProfile={true} user={mockUser} />;
};

export default Profile;