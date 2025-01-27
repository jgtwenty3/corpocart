import React from 'react';
import { getProductById, getRecommendedProducts } from '@/app/actions';
import SingleProductClient from '@/components/SingleProductClient';

type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
}

export default async function SingleProductPage({ params }: PageProps) {
  const { id } = await params;  // Await the params Promise

  const product = await getProductById(id);
  if (!product) {
    return <div>Product not found</div>;
  }

  let recommendations: any[] = [];
  if (product.owner_type === 'Megacorporation' || product.owner_type === 'Private Equity') {
    const recommended = await getRecommendedProducts(product.category, ['Founder or Family Owned']);
    recommendations = recommended || []; 
  }
  

  return <SingleProductClient product={product} recommendations={recommendations} />;
}
