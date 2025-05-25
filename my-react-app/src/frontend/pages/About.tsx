import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About IU Forum</h1>
      <p>Welcome to IU Forum, a vibrant community platform designed for Indiana University students, faculty, and alumni.</p>
      
      <h2>Our Mission</h2>
      <p>Our mission is to create a safe, engaging, and informative space where the IU community can connect, share knowledge, and discuss topics relevant to campus life and beyond.</p>
      
      <h2>What We Offer</h2>
      <ul>
        <li>Discussion forums for various academic departments</li>
        <li>Student life and campus events</li>
        <li>Academic support and resources</li>
        <li>Career development and networking</li>
        <li>Community engagement opportunities</li>
      </ul>

      <h2>Our Team</h2>
      <p>IU Forum is maintained by a dedicated team of developers and moderators committed to ensuring a positive and productive community experience.</p>

      <h2>Contact Us</h2>
      <p>Have questions or suggestions? We'd love to hear from you! Reach out to us at support@iuforum.edu</p>
    </div>
  );
};

export default About; 