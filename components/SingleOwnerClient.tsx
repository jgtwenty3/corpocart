"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation';

type OwnerProps = {
  owner: {
    name: string;
    category: string;
    owner_name: string;
    owner_type: string;
  };
};

const SingleOwnerClient = ({ owner }: OwnerProps) => {
  const router = useRouter();

  return (
    <div className="p-4 rounded-md flex-1 m-4 shadow-md">
      
      <div className='mb-10'>
        <h1 className="text-4xl font-bold mb-2">{owner.name}</h1>
        <p className="text-2xl text-white">Type: {owner.owner_type}</p>
      </div>
     
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-darkText text-black rounded-md"
      >
        Back
      </button>
    </div>
  );
};

export default SingleOwnerClient;
