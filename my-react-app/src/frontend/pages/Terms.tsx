import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="terms-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using IU Forum, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

      <h2>2. User Conduct</h2>
      <p>You agree to:</p>
      <ul>
        <li>Provide accurate and complete information</li>
        <li>Maintain the security of your account</li>
        <li>Not engage in any illegal or harmful activities</li>
        <li>Respect other users and their rights</li>
        <li>Not post spam or malicious content</li>
      </ul>

      <h2>3. Content Guidelines</h2>
      <p>Users must not post content that:</p>
      <ul>
        <li>Is illegal, harmful, or threatening</li>
        <li>Infringes on intellectual property rights</li>
        <li>Contains hate speech or discrimination</li>
        <li>Is spam or commercial solicitation</li>
        <li>Contains personal information of others</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>You retain ownership of your content but grant IU Forum a license to use, modify, and display it on our platform.</p>

      <h2>5. Account Termination</h2>
      <p>We reserve the right to suspend or terminate accounts that violate these terms or engage in harmful behavior.</p>

      <h2>6. Disclaimer</h2>
      <p>IU Forum is provided "as is" without warranties of any kind, either express or implied.</p>

      <h2>7. Contact</h2>
      <p>For questions about these Terms, please contact us at terms@iuforum.edu</p>
    </div>
  );
};

export default Terms; 