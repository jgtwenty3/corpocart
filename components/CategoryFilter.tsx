'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CategoryFilter = ({ categories }: { categories: string[] }) => {
  const router = useRouter();

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;

    const params = new URLSearchParams(window.location.search);
    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <select
      onChange={handleCategoryChange}
      className="mb-4 p-2 border rounded-lg w-full md:w-auto"
      defaultValue=""
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
