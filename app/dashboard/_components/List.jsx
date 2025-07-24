"use client"
import { useUser } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';
import { Button } from "@heroui/react";
import EmptyState from './EmptyState';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

function List() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  // Log the user object to see if it has the expected properties
  // console.log('User object:', user);
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      if (!user) return;

      const { data, error } = await supabase.storage
        .from('images')
        .list('generated', { limit: 100 });

      // console.log("DATA:", data);
      // console.log("ERROR:", error);

      if (error) {
        console.error('Error fetching images:', error);
        return;
      }

      if (!data || data.length === 0) {
        console.warn('No images found in generated folder');
        return;
      }

      // Filter out placeholder and zero-byte files
      const validFiles = data.filter(
        (file) => file.name !== '.emptyFolderPlaceholder' && file.metadata?.size > 0
      );

      // Map to public URLs
      const urls = validFiles.map((file) =>
        supabase.storage.from('images').getPublicUrl(`generated/${file.name}`).data.publicUrl
      );

      // console.log('✅ Image URLs:', urls);
      setImages(urls);
    };

    fetchImages();
  }, [user]);

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

      <div className="mt-6">
        {images.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((url, i) => (
              <img key={i} src={url} alt={`Generated ${i}`} className="rounded shadow" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
