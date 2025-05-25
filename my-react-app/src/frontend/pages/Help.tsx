import React from 'react';

const Help: React.FC = () => {
  return (
    <div className="help-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Help Center</h1>

      <h2>Getting Started</h2>
      <div className="help-section">
        <h3>Creating an Account</h3>
        <p>To create an account:</p>
        <ol>
          <li>Click the "Register" button in the top right corner</li>
          <li>Fill in your email, username, and password</li>
          <li>Verify your email address</li>
          <li>Complete your profile</li>
        </ol>
      </div>

      <h2>Using the Forum</h2>
      <div className="help-section">
        <h3>Posting Content</h3>
        <ul>
          <li>Create new threads in appropriate categories</li>
          <li>Reply to existing discussions</li>
          <li>Use formatting tools to enhance your posts</li>
          <li>Add images and links when relevant</li>
        </ul>

        <h3>Managing Your Account</h3>
        <ul>
          <li>Update your profile information</li>
          <li>Change your password</li>
          <li>Set notification preferences</li>
          <li>Manage your privacy settings</li>
        </ul>
      </div>

      <h2>Common Issues</h2>
      <div className="help-section">
        <h3>Forgot Password</h3>
        <p>Click "Forgot Password" on the login page and follow the instructions sent to your email.</p>

        <h3>Account Locked</h3>
        <p>If your account is locked, contact support with your username and email address.</p>

        <h3>Technical Problems</h3>
        <p>Try clearing your browser cache and cookies, or try a different browser.</p>
      </div>

      <h2>Contact Support</h2>
      <div className="help-section">
        <p>Need additional help? Contact our support team:</p>
        <ul>
          <li>Email: support@iuforum.edu</li>
          <li>Hours: Monday-Friday, 9 AM - 5 PM EST</li>
          <li>Response time: Within 24 hours</li>
        </ul>
      </div>
    </div>
  );
};

export default Help; 