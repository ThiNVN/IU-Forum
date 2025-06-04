import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/Auth/InputField';
import SubmitButton from '../../components/Auth/SubmitButton';
import '../../styles/register.css';

interface ValidationState {
  password: {
    isValid: boolean;
    message: string;
    requirements: {
      length: boolean;
      uppercase: boolean;
      lowercase: boolean;
      number: boolean;
    };
  };
  confirmPassword: {
    isValid: boolean;
    message: string;
  };
}

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationState>({
    password: {
      isValid: false,
      message: '',
      requirements: {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false
      }
    },
    confirmPassword: {
      isValid: false,
      message: ''
    }
  });
  const navigate = useNavigate();

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8 && password.length <= 16,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    };

    const isValid = Object.values(requirements).every(Boolean);

    setValidation(prev => ({
      ...prev,
      password: {
        isValid,
        message: isValid ? '' : 'Password does not meet requirements',
        requirements
      }
    }));

    // Also validate confirm password when password changes
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword, password);
    }
  };

  const validateConfirmPassword = (confirmPassword: string, password: string = newPassword) => {
    const isValid = confirmPassword === password;
    setValidation(prev => ({
      ...prev,
      confirmPassword: {
        isValid,
        message: isValid ? '' : 'Passwords do not match'
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validation.password.isValid) {
      setError('New password does not meet requirements.');
      return;
    }

    if (!validation.confirmPassword.isValid) {
      setError('Passwords do not match.');
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
      const response = await fetch('https://localhost:8081/api/changePassword', {
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
          <InputField
            label="Current Password"
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className={`password-wrapper ${focusedField === 'newPassword' ? 'focused' : ''}`}>
          <InputField
            label="New Password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={e => {
              setNewPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            onFocus={() => handleFocus('newPassword')}
            onBlur={handleBlur}
            isFocused={focusedField === 'newPassword'}
            required
          />
          <div className="password-requirements">
            <div className={`requirement ${validation.password.requirements.length ? 'met' : ''}`}>
              • 8-16 characters
            </div>
            <div className={`requirement ${validation.password.requirements.uppercase ? 'met' : ''}`}>
              • At least one uppercase letter
            </div>
            <div className={`requirement ${validation.password.requirements.lowercase ? 'met' : ''}`}>
              • At least one lowercase letter
            </div>
            <div className={`requirement ${validation.password.requirements.number ? 'met' : ''}`}>
              • At least one number
            </div>
          </div>
        </div>
        <div className="form-group">
          <InputField
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
              validateConfirmPassword(e.target.value);
            }}
            error={validation.confirmPassword.message}
            required
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
        <div className="button-group">
          <SubmitButton type="submit" label={loading ? 'Changing...' : 'Change Password'} disabled={loading} />
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