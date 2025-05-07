// src/components/SearchBar.tsx
import React, { useState } from 'react';
import magnifyingGlass from '../../assets/img/magnifying-glass.png';
import '../../styles/header.css';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchText);
    // Future: You can trigger API search here
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { 
      handleSearch();
    }
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        name="search"
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here to search"
        className="searchInput"
      />
      <button className="searchButton" onClick={handleSearch}>
        <img src={magnifyingGlass} alt="Search" className="searchIcon" />
      </button>
    </div>
  );
};

export default SearchBar;
