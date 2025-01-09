'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ProductProps = {
  product: {
    name: string;
    category: string;
    owner_name: string;
    owner_type: string;
  };
  recommendations?: Array<{
    id: string;
    name: string;
    category: string;
    owner_name: string;
    owner_type: string;
  }>;
};


const SingleProductClient = ({ product, recommendations }: ProductProps) => {
  const router = useRouter();

  return (
    <div className="p-4 rounded-md flex-1 m-4 shadow-md ">
      <div className='mb-10 flex flex-col'>
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl text-white mb-5">Category: {product.category}</p>
        <p className="text-2xl text-white mb-2">Owner: {product.owner_name}</p>
        <p className="text-2xl text-white">Type: {product.owner_type}</p>
      </div>

      {recommendations && recommendations.length > 0 && (
        <div className="mt-10 mb-5">
          <h2 className="text-3xl font-bold mb-4">Recommended Alternatives</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <Link href={`/products/${rec.id}`} key={rec.id}>
                <div className="p-4 border-2 rounded-md bg-white border-black hover:bg-gray-100">
                  <h3 className="text-2xl font-bold text-black">{rec.name}</h3>
                  <p className="text-lg text-gray-600">Category: {rec.category}</p>
                  <p className="text-lg text-gray-600">Owner: {rec.owner_name}</p>
                  <p className="text-lg text-gray-600">Owner Type: <span className='text-green'>{rec.owner_type}</span> </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 rounded-md"
      >
        Back
      </button>
    </div>
  );
};

export default SingleProductClient;
