'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const TableSearch = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    const params = new URLSearchParams(window.location.search);
    if (event.target.value) {
      params.set('search', event.target.value);
    } else {
      params.delete('search');
    }
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <input
      type="text"
      value={search}
      onChange={handleSearchChange}
      placeholder="Search..."
      className="h-10 w-full md:w-56 border border-gray-300 rounded-lg px-4 py-2"
    />
  );
};

export default TableSearch;
