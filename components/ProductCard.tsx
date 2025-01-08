import Link from 'next/link';
import React from 'react';

type Product = {
  id: string;
  name: string;
  category?: string;
  owner_name: string;
  owner_type: string;
};

const getOwnershipTypeClass = (owner_type: string) => {
  switch (owner_type) {
    case 'Founder or Family Owned':
      return 'text-green'; 
    case 'Megacorporation':
      return 'text-darkText';
    case 'Private Equity':
      return 'text-orange';
    case 'Co-Op or Employee Owned':
      return 'text-lightText'
    default:
      return 'text-gray-500'; 
  }
};

const ProductCard = ({ product }: { product: Product }) => {
  const ownershipTypeClass = getOwnershipTypeClass(product.owner_type);

  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="bg-white rounded-lg p-4 border-2 border-black">
        <h2 className="text-lg text-black font-bold">{product.name}</h2>
        <p className="text-sm text-gray-600">Category: {product.category}</p>
        <p className="text-sm md:text-md text-gray-600">Owner: {product.owner_name || 'Unknown'}</p>
        <p className="text-sm md:text-md text-gray-600">
          Ownership Type: <span className={ownershipTypeClass}>{product.owner_type || 'Unknown'}</span>
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
