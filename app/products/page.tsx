import React from 'react';
import { createClient } from '@/utils/supabase/server';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import TableSearch from '@/components/TableSearch';
import CategoryFilter from '@/components/CategoryFilter';
import OwnerTypeFilter from '@/components/OwnerTypeFilter';
import { categories, ownerTypes } from '@/lib/data';

const ITEM_PER_PAGE = 24;

type SearchParams = Promise<{ page?: string; search?: string; category?: string; ownerType?: string }>;

const ProductsPage = async ({ searchParams }: { searchParams?: SearchParams }) => {

  const { page, search, category, ownerType } = (await searchParams) ?? {};

  const p = page ? parseInt(page) : 1;

  const supabase = await createClient();

  let query = supabase.from('products_with_owners').select('*', { count: 'exact' });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  if (category) {
    query = query.eq('category', category);
  }
  if (ownerType) {
    query = query.eq('owner_type', ownerType);
  }

  const { data: products = [], count } = await query.range((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE - 1);

  const totalProducts = count || 0;

  return (
    <div className="rounded-md flex-1 p-2 md:p-5">
      <div className="flex flex-wrap md:flex-nowrap justify-end gap-2 mt-5">
        <TableSearch />
        <CategoryFilter categories={categories} />
        <OwnerTypeFilter ownerTypes={ownerTypes} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-4">
        {products!.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination page={p} count={totalProducts} />
    </div>
  );
};

export default ProductsPage;
