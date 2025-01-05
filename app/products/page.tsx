import React from 'react';
import { createClient } from '@/utils/supabase/server';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import TableSearch from '@/components/TableSearch';
import CategoryFilter from '@/components/CategoryFilter';
import { categories } from '@/lib/data';

const ITEM_PER_PAGE = 24;

const ProductsPage = async ({ searchParams }: { searchParams: { [key: string]: string } | undefined }) => {
  const { page, search, category } = searchParams;
  const p = page ? parseInt(page) : 1;

  const supabase = await createClient();

  let query = supabase.from('products_with_owners').select('*', { count: 'exact' });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  if (category) {
    query = query.eq('category', category);
  }

  const { data: products = [], count } = await query.range((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE - 1);

  const totalProducts = count || 0;

  return (
    <div className="p-4 rounded-md flex-1 mt-0 w-full border-2 border-red-500">
      <div className="flex items-center justify-between">
        <h1 className="text-darkBlue hidden md:block text-lg font-semibold">All Products</h1>
        <div className="flex flex-row w-fit">
          <TableSearch />
          <CategoryFilter categories={categories} />
        </div>
      </div>
      <div className="grid-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination page={p} count={totalProducts} />
    </div>
  );
};

export default ProductsPage;
