import React from 'react';
import Image from 'next/image';


export default function EmptyState() {
    return (
        <div className='flex items-center justify-center mt-16 flex-col'>
          <Image 
            src="/3d-room.png" 
            width={300} 
            height={300} 
            alt="Empty room illustration" 
          />
          <h2 className='font-medium text-xl text-gray-600'>
            Create new Interior Design for your Room with AI
          </h2>
        </div>
      );
}; 
