import React from 'react';

type Product = {
  id: string;
  name: string;
  notes?: string;
  category?: string;
  owner?: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">Owner: {product.owner}</p>
      <p className="text-sm text-gray-600">Category: {product.category}</p>
      <p className="text-sm text-gray-600">Notes: {product.notes}</p>
    </div>
  );
};

export default ProductCard;
