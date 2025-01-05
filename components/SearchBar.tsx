"use client"
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch, placeholder }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={onSearch}
      placeholder={placeholder}
      className="mb-4 p-2 border rounded w-full"
    />
  );
};

export default SearchBar;
