// src/components/auth/LeftPanel.tsx
import React, { useEffect, useRef } from 'react';
import logo from '../../assets/img/UIlogo.png';
// import SpotifyPlayer from './SpotifyPlayer';
import '../../styles/register.css';

interface LeftPanelProps {
  title?: string;
  showBreakingNews?: boolean;
}

const adItems = [
  { image: 'https://brand.assets.adidas.com/image/upload/f_gif,fl_lossy,q_auto/5752964_CAM_Onsite_SS_25_Adicolor_21_May_SEA_Masthead_V2_01_03_1642849ae5.gif', link: 'https://www.adidas.com.vn/en/adicolor' },
  { image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnI1cTFyenBneXFkOXh2anE4MGFmaXFyNWtxNnI1cDkzc3pkcWtwNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VRWfvs3Cs0BJSlvZrn/giphy.gif', link: 'https://www.asus.com/' },
  { image: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzhnbnE2NXRrOWwwN2ZvY29weXZkYzAyZmwzcGhkYmpiMnY5cDkwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Pv0tpZGHtwvgQ/giphy.gif', link: 'https://www.pepsi.com/' },
];

const LeftPanel: React.FC<LeftPanelProps> = ({
  title = 'Hệ thống diễn đàn Đại học Quốc Tế - Đại học Quốc Gia Hồ Chí Minh',
  showBreakingNews = true,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<number | undefined>(undefined);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scroll = () => {
      if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += 1;
      }
    };

    scrollInterval.current = window.setInterval(scroll, 2);

    return () => {
      if (scrollInterval.current) {
        window.clearInterval(scrollInterval.current);
      }
    };
  }, []);

  return (
    <div className="leftPanel">
      <div className="leftContent">
        <div className="logoPlaceholder">
          <img src={logo} alt="logo" />
        </div>

        <a
          href="https://IU.forum.edu.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          IU.forum.edu.vn
        </a>
        <h1 className="title">{title} </h1>
        {showBreakingNews && (
          <div className="carousel" ref={carouselRef}>
            {adItems.map((item, index) => (
              <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.image}
                  alt={`Ad ${index + 1}`}
                  style={{ width: '700px', height: '300px', objectFit: 'cover' }}
                  className="carouselImage"
                />
              </a>
            ))}
          </div>
        )}

        <div className="footerLinks">
          <a href="#" className="link">Privacy Policy</a>
          <span>&nbsp;|&nbsp;</span>
          <a href="#" className="link">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
