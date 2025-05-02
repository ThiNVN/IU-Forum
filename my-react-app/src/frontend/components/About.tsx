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

        {userInfo.interests && userInfo.interests.length > 0 && (
          <div className="detail-item">
            <span className="detail-label">Interests</span>
            <div className="detail-value interests-list">
              {userInfo.interests.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>
        )}

        {userInfo.website && (
          <div className="detail-item">
            <span className="detail-label">Website</span>
            <a href={userInfo.website} target="_blank" rel="noopener noreferrer" 
               className="detail-value website-link">
              {userInfo.website}
            </a>
          </div>
        )}

        {userInfo.socialLinks && Object.keys(userInfo.socialLinks).length > 0 && (
          <div className="detail-item">
            <span className="detail-label">Social Links</span>
            <div className="detail-value social-links">
              {Object.entries(userInfo.socialLinks).map(([platform, url]) => (
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