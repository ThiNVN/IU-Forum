import React from 'react';
import '../../styles/footer.css';

interface FooterProps {
  headerFooterColor: string;
}

const Footer: React.FC<FooterProps> = ({ headerFooterColor }) => {
  return (
    <footer className="footer" style={{ backgroundColor: headerFooterColor }}>
      <div className="footer-left">
        <span>© 2024 IU Forum</span>
      </div>
      <div className="footer-right">
        <a href="/about" className="footer-link">About</a>
        <a href="/privacy" className="footer-link">Privacy</a>
        <a href="/terms" className="footer-link">Terms</a>
        <a href="/help" className="footer-link">Help</a>
      </div>
    </footer>
  );
};

export default Footer;