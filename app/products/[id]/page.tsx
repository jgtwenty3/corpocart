import { createClient } from '@/utils/supabase/server';
import React from 'react'

const SingleProductPage = async ({
    params:{id},
    }:{
    params:{id:string};
}) => {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0 bg-white shadow-md">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg text-gray-600">Type: {product.category}</p>
      <p className="text-lg text-gray-600">Type: {product.owner}</p>
      <p className="text-lg text-gray-600">Type: {product.owner_type}</p>
      
    </div>
  )
}

export default SingleProductPage