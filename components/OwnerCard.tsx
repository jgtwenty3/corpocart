import React from 'react';
import Link from 'next/link';

type Owner = {
  id: string;
  name: string;
  owner_type: string;
  notes?: string;
};

const OwnerCard = ({ owner }: { owner: Owner }) => {
  return (
    <Link href={`/owners/${owner.id}`} passHref>
      <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer">
        <h2 className="text-xl font-bold">{owner.name}</h2>
        <p className="text-sm text-gray-600">Type: {owner.owner_type}</p>
        <p className="text-sm text-gray-600">Notes: {owner.notes}</p>
      </div>
    </Link>
  );
};

export default OwnerCard;
