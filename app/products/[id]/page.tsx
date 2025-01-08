import React from 'react';
import { getProductById, getRecommendedProducts } from '@/app/actions';
import SingleProductClient from '@/components/SingleProductClient';

interface PageProps {
  params: {
    id: string;
  };
}

const SingleProductPage: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params; 
  const product = await getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  let recommendations = [];

  if (product.owner_type === 'Megacorporation' || product.owner_type === 'Private Equity') {
    recommendations = await getRecommendedProducts(product.category, ['Founder or Family Owned']);
    console.log('Recommendations:', recommendations);
  }

  return <SingleProductClient product={product} recommendations={recommendations} />;
};

export default SingleProductPage;
