"use client"
import Link from 'next/link';
import React from 'react';
import { addToCart } from "@/app/actions";
import { useRouter } from 'next/navigation';

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
      return 'text-green text-lg'; 
    case 'Megacorporation':
      return 'text-darkText text-lg';
    case 'Private Equity':
      return 'text-orange text-lg';
    case 'Co-Op or Employee Owned':
      return 'text-lightText text-lg';
    default:
      return 'text-gray-500'; 
  }
};

const ProductCard = ({ product }: { product: Product }) => {
  const ownershipTypeClass = getOwnershipTypeClass(product.owner_type);
  const router = useRouter();

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await addToCart(productId);
  
      if (response.status === "error") {
        console.log('Redirecting to sign-in due to auth error');
        router.push('/sign-in');
      } else {
        console.log(response.message);
      }
    } catch (error: unknown) {
      const typedError = error as Error; // Cast the error to a regular Error
  
      if ((typedError as any).__isAuthError) {
        console.log('Redirecting to sign-in due to auth error');
        router.push('/sign-in');
      } else {
        console.error('Error adding product to cart:', typedError.message);
      }
    }
  };
  

  return (
    <div className="relative bg-white rounded-lg p-4 border-2 border-black">
      <Link href={`/products/${product.id}`} passHref>
        <div>
          <h2 className="text-2xl text-black font-bold">{product.name}</h2>
          <p className="text-lg md:text-md text-gray-600 mb-2">Category: {product.category}</p>
          <p className="text-lg md:text-md text-gray-600 mb-2">Owner: {product.owner_name || 'Unknown'}</p>
          <p className="text-lg md:text-md text-gray-600 mb-8">
            Ownership Type:<br /> <span className={ownershipTypeClass}>{product.owner_type || 'Unknown'}</span>
          </p>
        </div>
      </Link>
      <button
        className="absolute bottom-4 right-4"
        onClick={(e) => {
          e.preventDefault(); // Prevents the link from navigating away
          handleAddToCart(product.id);
        }}
      >
        <img src="/icons/cart.svg" alt="Add to cart" width={24} height={24} />
      </button>
    </div>
  );
};

export default ProductCard;
