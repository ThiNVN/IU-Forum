import React, { useEffect, useState } from 'react';
import ProfilePage from '../../components/ProfilePage';

interface UserProfile {
  id: string;
  username: string;
  fullname: string;
  avatar: string;
  age: string;
  schoole: string;
  major: string;
  bio: string;
  is_admin: string;

  joined: string;
  lastSeen: string;
  stats: {
    messages: number;
    reactionScore: number;
    points: number;
  };
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = sessionStorage.getItem('userId');

      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:8081/api/getUserProfile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          const res = await response.json();
          const data = res.userProfile;
          setUser({
            id: data.ID,
            username: data.username,
            fullname: data.fullname,
            avatar: data.avatar,
            age: data.age,
            schoole: data.school,
            major: data.major,
            bio: data.bio,
            is_admin: data.is_admin,
            joined: data.created_at,
            lastSeen: data.last_login,
            stats: {
              messages: data.messageCount,
              reactionScore: data.reactionScore,
              points: data.points
            }
          });
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) return <div>Loading...</div>;
  return <ProfilePage isOwnProfile={true} user={user} />;
};

export default Profile;
