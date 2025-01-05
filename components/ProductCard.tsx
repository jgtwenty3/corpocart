import React from 'react';

type Product = {
  id: string;
  name: string;
  category?: string;
  owner_name: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-sm md:text-md text-gray-600">Owner: {product.owner_name || 'Unknown'}</p>
      <p className="text-sm text-gray-600">Category: {product.category}</p>
      
    </div>
  );
};

export default ProductCard;
