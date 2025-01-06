import Link from 'next/link';
import React from 'react';

type Product = {
  id: string;
  name: string;
  category?: string;
  owner_name: string;
  owner_type:string;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href = {`/products/${product.id}`} passHref>

    <div className="bg-white rounded-lg p-4 border-2 border-black">
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-sm text-gray-600">Category: {product.category}</p>
      <p className="text-sm md:text-md text-gray-600">Owner: {product.owner_name || 'Unknown'}</p>
      <p className="text-sm md:text-md text-gray-600">Ownership Type: {product.owner_type || 'Unknown'}</p>
    </div>
    </Link>
    
  );
};

export default ProductCard;
