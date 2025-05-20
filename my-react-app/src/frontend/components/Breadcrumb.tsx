import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/forum.css';

interface BreadcrumbItem {
  name: string;
  path: string;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { name: 'Home', path: '/' }
    ];

    let currentPath = '';
    pathnames.forEach((value, index) => {
      currentPath += `/${value}`;
      
      // Format the name for display
      let name = value;
      if (value === 'topic') {
        name = 'Topics';
      } else if (value === 'thread') {
        name = 'Threads';
      } else {
        // Convert URL-friendly format back to readable text
        name = value
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }

      items.push({
        name,
        path: currentPath
      });
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <nav className="breadcrumb-container" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="breadcrumb-item">
            {index === breadcrumbItems.length - 1 ? (
              <span className="breadcrumb-current">{item.name}</span>
            ) : (
              <>
                <Link to={item.path} className="breadcrumb-link">
                  {item.name}
                </Link>
                <span className="breadcrumb-separator">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 