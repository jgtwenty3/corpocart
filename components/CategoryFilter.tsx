'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const CategoryFilter = ({ categories }: { categories: string[] }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(window.location.search);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    router.push(`${window.location.pathname}?${params}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-full md:w-56">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-full bg-black border border-black text-white hover:border-gray-500 px-4 py-2 rounded-lg shadow flex items-center justify-between"
      >
        {selectedCategory ? selectedCategory : "Categories"}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          ref={dropdownRef}
          className="absolute left-0 mt-2 max-h-60 w-full bg-black text-white border border-black rounded-lg shadow-lg z-10 overflow-y-auto"
        >
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleCategoryChange("")}
          >
            All Categories
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryFilter;
