import React from 'react';
import { createClient } from '@/utils/supabase/server';
import OwnerCard from '@/components/OwnerCard';
import Pagination from '@/components/Pagination';
import TableSearch from '@/components/TableSearch';
import CategoryFilter from '@/components/CategoryFilter';
import { ownerType } from '@/lib/data';
const ITEM_PER_PAGE = 24;

const OwnersPage = async ({ searchParams }: { searchParams: { [key: string]: string } | undefined }) => {
  const { page, search, category } = searchParams;
  const p = page ? parseInt(page) : 1;

  const supabase = await createClient();

  // Fetch all owners
  let query = supabase.from('owners').select('*');

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }
  if (category) {
    query = query.eq('owner_type', category);
  }

  const { data: owners = [], count } = await query.range((p - 1) * ITEM_PER_PAGE, p * ITEM_PER_PAGE - 1);

  const totalOwners = count || 0;

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-darkBlue hidden md:block text-lg font-semibold">All Owners</h1>
        <div className='flex flex-row'>
            <TableSearch />
            <CategoryFilter categories={ownerType} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {owners.map((owner) => (
          <OwnerCard key={owner.id} owner={owner} />
        ))}
      </div>
      <Pagination page={p} count={totalOwners} />
    </div>
  );
};

export default OwnersPage;
