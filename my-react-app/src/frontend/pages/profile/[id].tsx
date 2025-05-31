import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePage from '../../components/ProfilePage';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const myUserId = sessionStorage.getItem('userId');
  const isOwnProfile = id === myUserId;

  useEffect(() => {
    if (id) {
      fetch(`https://localhost:8081/api/user/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('User not found');
          return res.json();
        })
        .then(data => {
          setUser(data.userProfile);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found.</div>;

  return <ProfilePage isOwnProfile={isOwnProfile} user={user} />;
};

export default UserProfile; 