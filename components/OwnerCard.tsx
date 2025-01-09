import React from 'react';
import Link from 'next/link';

type Owner = {
  id: string;
  name: string;
  owner_type: string;
  notes?: string;
};

const getOwnershipTypeClass = (owner_type: string) => {
  switch (owner_type) {
    case 'Founder or Family Owned':
      return 'text-green'; 
    case 'Megacorporation':
      return 'text-darkText'; 
    case 'Private Equity':
      return 'text-orange'; 
    case 'Co-Op or Employee Owned':
      return 'text-lightText'
    default:
      return 'text-gray-500'; 
  }
};

const OwnerCard = ({ owner }: { owner: Owner }) => {
  const ownershipTypeClass = getOwnershipTypeClass(owner.owner_type);

  return (
    <Link href={`/owners/${owner.id}`} passHref>
      <div className="bg-white p-4 rounded-lg shadow-md cursor-pointer border-2 border-black">
        <h2 className="text-xl md:text-lg text-black font-bold">{owner.name}</h2>
        <p className="text-sm md:text-md text-gray-600">
          Ownership Type: <span className={ownershipTypeClass}>{owner.owner_type || 'Unknown'}</span>
        </p>
       
      </div>
    </Link>
  );
};

export default OwnerCard;
