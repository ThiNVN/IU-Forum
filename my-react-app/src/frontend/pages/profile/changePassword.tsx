import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        setError('User not logged in.');
        setLoading(false);
        return;
      }
      const response = await fetch('http://localhost:8081/api/changePassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to change password.');
      } else {
        setSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => navigate('/profile'), 1500);
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
        <div className="button-group">
          <button type="submit" className="submitButton" disabled={loading}>
            {loading ? 'Changing...' : 'Change Password'}
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/profile')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword; 