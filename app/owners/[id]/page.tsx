import React from 'react';
import { getOwnerById, getProductsByOwner } from '@/app/actions';
import SingleOwnerClient from '@/components/SingleOwnerClient';

const SingleOwnerPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const owner = await getOwnerById(id);

  if (!owner) {
    return <div>Owner not found</div>;
  }

  const products = await getProductsByOwner(owner.name) || [];

  return <SingleOwnerClient owner={owner} products={products} />;
};

export default SingleOwnerPage;
