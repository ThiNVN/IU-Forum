import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="privacy-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Information We Collect</h2>
      <p>We collect information that you provide directly to us, including:</p>
      <ul>
        <li>Account information (username, email, password)</li>
        <li>Profile information (display name, avatar)</li>
        <li>Content you post on the forum</li>
        <li>Communication preferences</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide and maintain our services</li>
        <li>Process your transactions</li>
        <li>Send you technical notices and support messages</li>
        <li>Communicate with you about products, services, and events</li>
        <li>Monitor and analyze trends and usage</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
      <ul>
        <li>Service providers who assist in our operations</li>
        <li>Law enforcement when required by law</li>
        <li>Other users as part of the forum's public features</li>
      </ul>

      <h2>4. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your information</li>
        <li>Opt-out of marketing communications</li>
      </ul>

      <h2>5. Contact Us</h2>
      <p>If you have questions about this Privacy Policy, please contact us at privacy@iuforum.edu</p>
    </div>
  );
};

export default Privacy; 