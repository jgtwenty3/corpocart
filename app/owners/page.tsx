import React from 'react';
import { createClient } from '@/utils/supabase/server';
import OwnerCard from '@/components/OwnerCard';
import Pagination from '@/components/Pagination';
import TableSearch from '@/components/TableSearch';
import CategoryFilter from '@/components/CategoryFilter';
import { ownerTypes } from '@/lib/data'; // Assuming this contains the predefined list of owner types

const ITEM_PER_PAGE = 24;

type SearchParams = Promise<{ [key: string]: string }> | undefined;

interface PageProps {
  searchParams: SearchParams;
}

const OwnersPage = async ({ searchParams }: PageProps) => {
  // Await searchParams if it's a Promise
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const { page, search, category } = resolvedSearchParams;

  const p = page ? parseInt(page) : 1;

  const supabase = await createClient();

  // Fetch all owners
  let query = supabase.from('owners').select('*', { count: 'exact' }).order('name', { ascending: true });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  if (category) {
    query = query.eq('owner_type', category);
  }

  const { data: owners = [], count } = await query.range((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE - 1);

  const totalOwners = count || 0;

  return (
    <div className="rounded-md flex-1 p-2 md:p-5">
      <div className="flex flex-wrap md:flex-nowrap justify-end gap-2 m-5">
        <TableSearch />
        <CategoryFilter categories={ownerTypes} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
        {owners!.map((owner) => (
          <OwnerCard key={owner.id} owner={owner} />
        ))}
      </div>
      <Pagination page={p} count={totalOwners} />
    </div>
  );
};

export default OwnersPage;
