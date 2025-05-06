import React from 'react';
import '../../styles/breadcrumb.css'; 

const Breadcrumb = ({ trail }: { trail: { name: string; url: string }[] }) => (
  <ul className="p-breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList">
    {trail.map((item, index) => (
      <li key={index} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
        <a href={item.url} itemProp="item">
          <span itemProp="name">{item.name}</span>
        </a>
        <meta itemProp="position" content={(index + 1).toString()} />
      </li>
    ))}
  </ul>
);

export default Breadcrumb;
