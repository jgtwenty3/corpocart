import React from 'react';
import { getProductById } from '@/app/actions';
import SingleProductClient from '@/components/SingleProductClient';
const SingleProductPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await getProductById(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <SingleProductClient product={product} />;
};

export default SingleProductPage;
