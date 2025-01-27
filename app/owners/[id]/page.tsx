import React from 'react';
import { getOwnerById, getProductsByOwner } from '@/app/actions';
import SingleOwnerClient from '@/components/SingleOwnerClient';

type Params = Promise<{ id: string }>;

interface PageProps {
  params: Params;
}

export default async function SingleOwnerPage({ params }: PageProps) {
  const { id } = await params;  // Await the params Promise

  const owner = await getOwnerById(id);
  if (!owner) {
    return <div>Owner not found</div>;
  }

  const products = await getProductsByOwner(owner.name) || [];

  return <SingleOwnerClient owner={owner} products={products} />;
}
