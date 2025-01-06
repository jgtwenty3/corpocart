import React from 'react';
import { createClient } from '@/utils/supabase/server';

const SingleOwnerPage = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
  const supabase = await createClient();

  // Fetch owner details
  const { data: owner } = await supabase
    .from('owners')
    .select('*')
    .eq('id', id)
    .single();

  if (!owner) {
    return <div>Owner not found</div>;
  }

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0 bg-white shadow-md">
      <h1 className="text-2xl font-bold">{owner.name}</h1>
      <p className="text-lg text-gray-600">Type: {owner.owner_type}</p>
      {owner.notes && <p className="text-md text-gray-600">Notes: {owner.notes}</p>}
      {/* Add any other owner details you want to display */}
    </div>
  );
};

export default SingleOwnerPage;
