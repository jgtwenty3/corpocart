import React from 'react';
import { getProductById, getRecommendedProducts } from '@/app/actions';
import SingleProductClient from '@/components/SingleProductClient';

// Define the Params and Props interfaces for correct typing
interface Params {
  id: string;
}

interface Props {
  params: Params;
}

export default async function SingleProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  let recommendations = [];
  if (product.owner_type === 'Megacorporation' || product.owner_type === 'Private Equity') {
    recommendations = await getRecommendedProducts(product.category, ['Founder or Family Owned']);
  }

  return <SingleProductClient product={product} recommendations={recommendations} />;
}
