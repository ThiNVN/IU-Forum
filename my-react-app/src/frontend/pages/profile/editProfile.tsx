import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import SubmitButton from '../../components/SubmitButton';
import '../../styles/EditProfile.css';

interface EditProfileProps {
  // Remove the user prop since we'll get it from the URL
}

const EditProfile: React.FC<EditProfileProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock user data - replace this with actual API call
  const [user, setUser] = useState({
    id: id || '',
    username: '',
    title: '',
    biography: '',
    location: '',
    occupation: '',
    website: '',
    socialLinks: {
      Twitter: '',
      LinkedIn: ''
    }
  });

  useEffect(() => {
    // TODO: Replace with actual API call to get user data
    const fetchUserData = async () => {
      try {
        // Mock data for now
        setUser({
          id: id || '',
          username: 'TestUser',
          title: 'Member',
          biography: '',
          location: '',
          occupation: '',
          website: '',
          socialLinks: {
            Twitter: '',
            LinkedIn: ''
          }
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const [formData, setFormData] = useState({
    username: user.username,
    title: user.title || '',
    biography: user.biography || '',
    location: user.location || '',
    occupation: user.occupation || '',
    website: user.website || '',
    twitter: user.socialLinks?.Twitter || '',
    linkedin: user.socialLinks?.LinkedIn || '',
  });

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
        ...formData,
        socialLinks: {
          Twitter: formData.twitter,
          LinkedIn: formData.linkedin
        }
      };
      
      // TODO: Add your API call here to update the profile
      console.log('Updated profile:', updatedProfile);
      
      // Navigate back to profile page after successful update
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