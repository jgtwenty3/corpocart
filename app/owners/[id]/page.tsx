import React from 'react';
import { getOwnerById } from '@/app/actions';
const SingleOwnerPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const owner = await getOwnerById(id);

  if (!owner) {
    return <div>Owner not found</div>;
  }

  return (
    <div className="p-4 rounded-md flex-1 m-4 mt-0">
      <h1 className="text-4xl font-bold mb-2">{owner.name}</h1>
      <p className="text-2xl text-white mb-5">Type: {owner.owner_type}</p>
      <p className="text-2xl text-white">Notes: {owner.notes}</p>
    </div>
  );
};

export default SingleOwnerPage;
