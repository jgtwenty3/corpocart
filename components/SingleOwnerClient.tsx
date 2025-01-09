'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; 

type Product = {
  id: string;
  name: string;
  category: string;
};

type Owner = {
  name: string;
  owner_type: string;
};

type OwnerProps = {
  owner: Owner;
  products?: Product[];
};

const SingleOwnerClient = ({ owner, products = [] }: OwnerProps) => {
  const router = useRouter();

  return (
    <div className="p-4 rounded-md flex-1 m-4 shadow-md">
      <div className='mb-10'>
        <h1 className="text-4xl font-bold mb-2">{owner.name}</h1>
        <p className="text-2xl text-white">Type: {owner.owner_type}</p>
      </div>

      {products.length > 0 && (
        <div className="mt-10 mb-5">
          <h2 className="text-3xl font-bold mb-4">Products by {owner.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className="p-4 border-2 rounded-md bg-white border-black text-black hover:bg-gray-100">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-lg">Category: {product.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

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
