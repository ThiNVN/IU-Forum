import React from 'react';

interface AboutProps {
  userId: string;
  userInfo: {
    biography?: string;
    location?: string;
    occupation?: string;
    interests?: string[];
    website?: string;
    socialLinks?: {
      [key: string]: string;
    };
  };
}

const About: React.FC<AboutProps> = ({ userId, userInfo }) => {
  // Filter out empty social links
  const socialLinks = userInfo.socialLinks ? Object.entries(userInfo.socialLinks).filter(([_, url]) => url && url.trim() !== '') : [];
  return (
    <div className="about-section">
      {userInfo.biography && (
        <div className="about-item">
          <h3>Biography</h3>
          <p>{userInfo.biography}</p>
        </div>
      )}

      <div className="about-details">
        {userInfo.location && (
          <div className="detail-item">
            <span className="detail-label">Location</span>
            <span className="detail-value">{userInfo.location}</span>
          </div>
        )}

        {userInfo.occupation && (
          <div className="detail-item">
            <span className="detail-label">Occupation</span>
            <span className="detail-value">{userInfo.occupation}</span>
          </div>
        )}

        {userInfo.website && userInfo.website.trim() !== '' && (
          <div className="detail-item">
            <span className="detail-label">Website</span>
            <a href={userInfo.website} target="_blank" rel="noopener noreferrer" 
               className="detail-value website-link">
              {userInfo.website}
            </a>
          </div>
        )}

        {socialLinks.length > 0 && (
          <div className="detail-item">
            <span className="detail-label">Social Links</span>
            <div className="detail-value social-links">
              {socialLinks.map(([platform, url]) => (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer" 
                   className="social-link">
                  {platform}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About; 