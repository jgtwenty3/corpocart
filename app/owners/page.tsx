import { createClient } from '@/utils/supabase/server';
import React from 'react';
import { getAllOwners } from '../actions';
import Table from '@/components/Table';
import Pagination from '@/components/Pagination';

type Owner = {
  id: string;
  name: string;
  owner_type: string;
  notes?: string;
  description?: string;
};

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Ownership Type", accessor: "owner_type" },
];

const renderRow = (owner: Owner) => (
  <tr key={owner.id}>
    <td className=' text-xl p-2'>{owner.name}</td>
    <td className=' text-xl'>{owner.owner_type}</td>
  </tr>
);

const ITEM_PER_PAGE = 25;

const OwnersPage = async ({
  searchParams
}: { searchParams: { [key: string]: string } | undefined }) => {
  const supabase = await createClient();

  const owners = await getAllOwners();
  console.log(owners);
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // Calculate the start and end indices for slicing the data array
  const startIndex = (p - 1) * ITEM_PER_PAGE;
  const endIndex = startIndex + ITEM_PER_PAGE;

  // Slice the owners array to get the current page items
  const currentPageOwners = owners.slice(startIndex, endIndex);

  // Assuming that owners.length gives you the total number of items
  const count = owners.length;

  return (
    <div>
      <Table columns={columns} renderRow={renderRow} data={currentPageOwners} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default OwnersPage;
