import React from 'react';
import { createClient } from '@/utils/supabase/server';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import TableSearch from '@/components/TableSearch';

const ITEM_PER_PAGE = 24;

const ProductsPage = async ({ searchParams }: { searchParams: { [key: string]: string } | undefined }) => {
  const { page, search } = searchParams;
  const p = page ? parseInt(page) : 1;

  const supabase = await createClient();

  let query = supabase.from('products').select('*');

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data: products = [], count } = await query.range((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE - 1);

  const totalProducts = count || 0;

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-darkBlue hidden md:block text-lg font-semibold">All Products</h1>
        <TableSearch />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination page={p} count={totalProducts} />
    </div>
  );
};

export default ProductsPage;
