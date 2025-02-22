"use client"
import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import { Button } from "@heroui/react";
import EmptyState from './EmptyState';
import Link from 'next/link';


function List() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  // Log the user object to see if it has the expected properties
  // console.log('User object:', user);

  return (
    <div>
      <div className='flex items-center justify-between gap-2'>
        <h2 className='font-bold text-3xl'>
          Hello, {user?.fullName || 'Guest'}
        </h2>
        <Link href={'/dashboard/newDesign'}>
          <Button color="primary" variant="shadow" className="border rounded p-2 hover:shadow-lg">
            + Design Room
          </Button>
        </Link>

      </div>

      {userRoomList?.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
          {/* Render your content here */}
        </div>
      )}

    </div>
  );
}

export default List;
