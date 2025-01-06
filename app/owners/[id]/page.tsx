import React from 'react';
import { getOwnerById } from '@/app/actions';

import SingleOwnerClient from '@/components/SingleOwnerClient';
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
    <SingleOwnerClient owner = {owner}/>
  );
};

export default SingleOwnerPage;
