// src/components/SearchBar.tsx
import React, { useState } from 'react';
import magnifyingGlass from '../../assets/img/magnifying-glass.png';
import '../../styles/header.css';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('category');
  const [username, setUsername] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const navigate = useNavigate();
  const handleSearch = async () => {
    const searchData = {
      searchText,
      searchType,
      ...(searchType === 'thread title' && { username })
    };

    console.log('Searching with:', searchData);

    const params = new URLSearchParams(searchData).toString();
    if (searchType === 'category') {
      try {
        const response = await fetch(`http://localhost:8081/api/search?${params}`);
        const result = await response.json();
        if (response.ok && result.result.length > 0) {
          navigate('/home', { state: { searchResults: result.result } });
        } else {
          alert('No results found.');
        }
      } catch (error) {
        console.error('Failed to search:', error);
      }
    } else if (searchType === 'topic') {
      try {
        const response = await fetch(`http://localhost:8081/api/search?${params}`);
        const result = await response.json();
        console.log(result);
        if (response.ok && result.result.length > 0) {
          navigate('/topic', { state: { searchResults: result.result } });
        } else {
          alert('No results found.');
        }
      } catch (error) {
        console.error('Failed to search:', error);
      }
    }

  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="searchBar">
      <select
        className="searchDropdown"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="category">Category</option>
        <option value="topic">Topic</option>
        <option value="tag">Tag</option>
        <option value="thread title">Thread Title</option>
        <option value="user">User</option>
      </select>

      <input
        type="text"
        name="search"
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here to search"
        className="searchInput"
      />

      {searchType === 'thread title' && (
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter username"
          className="searchInput additionalInput"
        />
      )}

      <button className="searchButton" onClick={handleSearch}>
        <img src={magnifyingGlass} alt="Search" className="searchIcon" />
      </button>
    </div>
  );
};

export default SearchBar;
