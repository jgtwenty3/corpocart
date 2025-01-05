import Table from '@/components/Table'
import { createClient } from '@/utils/supabase/server';
import React from 'react'
import { getAllProducts } from '../actions';
import Pagination from '@/components/Pagination';

type Product = {
  id: string;
  name: string;
  notes?: string;
  category?: string;
  owner?: string;
};

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Owner", accessor: "owner" },
  { header: "Notes", accessor: "notes" },
];

const renderRow = (product: Product) => (
  <tr key={product.id} className='flex'>
    <td className='flex items-center p-2 text-lg'>{product.name}</td>
    <td>{product.owner}</td>
    <td>{product.notes}</td>
  </tr>
);

const ITEM_PER_PAGE = 25;

const ProductsPage = async ({
  searchParams
}: { searchParams: { [key: string]: string } | undefined }) => {
  const supabase = await createClient();

  const products = await getAllProducts();

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // Calculate the start and end indices for slicing the data array
  const startIndex = (p - 1) * ITEM_PER_PAGE;
  const endIndex = startIndex + ITEM_PER_PAGE;

  // Slice the products array to get the current page items
  const currentPageProducts = products.slice(startIndex, endIndex);

  // Assuming that products.length gives you the total number of items
  const count = products.length;

  return (
    <div>
      <Table columns={columns} renderRow={renderRow} data={currentPageProducts} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ProductsPage;
