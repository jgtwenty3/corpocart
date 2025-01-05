import React from 'react';

type Owner = {
  id: string;
  name: string;
  owner_type: string;
  notes?: string;
  description?: string;
};

const OwnerCard = ({ owner }: { owner: Owner }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{owner.name}</h2>
      <p className="text-sm text-gray-600">Type: {owner.owner_type}</p>
      <p className="text-sm text-gray-600">Notes: {owner.notes}</p>
      <p className="text-sm text-gray-600">Description: {owner.description}</p>
    </div>
  );
};

export default OwnerCard;
