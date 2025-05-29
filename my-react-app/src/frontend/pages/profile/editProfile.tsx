import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from '../../components/Auth/InputField';
import SubmitButton from '../../components/Auth/SubmitButton';
import '../../styles/EditProfile.css';

interface EditProfileProps {
  // Remove the user prop since we'll get it from the URL
}

const EditProfile: React.FC<EditProfileProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: id || '',
    username: '',
    displayName: '',
    title: '',
    biography: '',
    location: '',
    occupation: '',
    website: '',
    socialLinks: {
      Twitter: '',
      LinkedIn: '',
    },
  });

  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    title: '',
    biography: '',
    location: '',
    occupation: '',
    website: '',
    twitter: '',
    linkedin: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://localhost:8081/api/getUserProfile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: id }),
        });

        if (response.ok) {
          const res = await response.json();
          const data = res.userProfile;
          const userData = {
            id: id || '',
            username: data.username || 'TestUser',
            displayName: data.displayName || data.fullname || '',
            title: data.title || 'Unknown',
            biography: data.bio || '',
            location: data.location || '',
            occupation: data.occupation || '',
            website: data.website || '',
            socialLinks: {
              Twitter: data.Twitter || '',
              LinkedIn: data.LinkedIn || '',
            },
          };

          setUser(userData);

          // Sync form data too
          setFormData({
            username: userData.username,
            displayName: userData.displayName,
            title: userData.title,
            biography: userData.biography,
            location: userData.location,
            occupation: userData.occupation,
            website: userData.website,
            twitter: userData.socialLinks.Twitter,
            linkedin: userData.socialLinks.LinkedIn,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProfile = {
        id, // include user ID if your backend requires it
        displayName: formData.displayName,
        title: formData.title,
        biography: formData.biography,
        location: formData.location,
        occupation: formData.occupation,
        website: formData.website,
        socialLinks: {
          Twitter: formData.twitter,
          LinkedIn: formData.linkedin,
        },
      };
  
      const response = await fetch('https://localhost:8081/api/updateUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
  
      // Optionally confirm the server's response
      const result = await response.json();
      console.log('Profile updated successfully:', result);
  
      // Navigate after success
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <InputField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            readOnly
          />
        </div>
        <div className="form-group">
          <InputField
            label="Display Name"
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <InputField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="biography">Biography</label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="form-group">
          <InputField
            label="Location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <InputField
            label="Occupation"
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <InputField
            label="Website"
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <InputField
            label="Twitter"
            type="url"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <InputField
            label="LinkedIn"
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <SubmitButton type="submit" label="Save Changes" disabled={false} />
          <button
            type="button"
            onClick={() => navigate(`/profile/${id}`)}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;