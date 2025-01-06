import React from 'react';
import { getProductById } from '@/app/actions';

const SingleProductPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 rounded-md flex-1 m-4 shadow-md">
      <div>
        <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl text-white mb-5">Category: {product.category}</p>
        <p className="text-2xl text-white">Owner: {product.owner_name}</p>
        <p className="text-2xl text-white">Type: {product.owner_type}</p>
      </div>
    </div>
  );
};

export default SingleProductPage;
