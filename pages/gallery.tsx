import React, { useState } from 'react';
import Image from 'next/image';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className='container mx-auto px-6 py-16'>
      <h1 className='text-3xl font-bold'>Gallery</h1>
      {selectedImage ? (
        <div className='mt-12'>
          <Image width={`${25}`} height={25} src={selectedImage} alt='Selected image' />
          <button onClick={() => setSelectedImage(null)}>Close</button>
        </div>
      ) : (
        <div className='mt-12 grid grid-cols-2 gap-4'>
          <Image width={`${25}`} height={25} src='/foggy_morning_mountain.png' alt='Image 1 thumbnail' onClick={() => handleThumbnailClick('/foggy_morning_mountain.png')} />
          <Image width={`${25}`} height={25} src='/godrays_unyoked.png' alt='Image 2 thumbnail' onClick={() => handleThumbnailClick('/godrays_unyoked.png')} />
          <Image width={`${25}`} height={25} src='/Remy_cabin_and_milkyway.png' alt='Image 3 thumbnail' onClick={() => handleThumbnailClick('/Remy_cabin_and_milkyway.png')} />
          <Image width={`${25}`} height={25} src='/unyoked_glorious.png' alt='Image 4 thumbnail' onClick={() => handleThumbnailClick('/unyoked_glorious.png')} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
