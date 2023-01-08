import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { uploadToS3 } from '../components/uploadToS3';
import dotenv from 'dotenv';
import AWS, { S3 } from 'aws-sdk';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUpload, setImageUpload] = useState<boolean>(false);
  const [listFiles, setListFiles] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = {
    bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    dirName: 'images',
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  };

  const params = {
    Bucket: 'schipkeditbucket',
    Delimiter: '',
    Prefix: 'images/',
  };

  AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
  });

  const s3 = new AWS.S3();

  useEffect(() => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        setListFiles((data as any).Contents);
        console.log(data.Contents);
      }
    });
  }, []);

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleImageUpload = async () => {
    const file = (inputRef.current?.files as any)[0];
    const result = await uploadToS3(file, null, null);
    if (result?.key) {
      console.log(result);
    } else {
      console.log('Error uploading image');
    }
    console.log(result);
  };

  const handleUploadOfImage = (event: any) => {
    if (event.target.value) {
      setImageUpload(event.target.value.length);
    }
  };

  return (
    <div className='container mx-auto px-6 py-16'>
      <h1 className='text-3xl font-bold'>Gallery</h1>
      <input
        id='file'
        type='file'
        name='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleUploadOfImage}
      />
      {!!imageUpload && <button onClick={handleImageUpload}>Upload</button>}
      {selectedImage ? (
        <div className='mt-12'>
          <Image width={`${25}`} height={25} src={selectedImage} alt='Selected image' />
          <button onClick={() => setSelectedImage(null)}>Close</button>
        </div>
      ) : (
        <div className='mt-12 grid grid-cols-2 gap-4'>
          {listFiles &&
            listFiles.length > 1 &&
            listFiles.map((file: any, index: any) => (
              <Image
                key={index}
                width={200}
                height={160}
                src={`https://schipkeditbucket.s3.ap-southeast-2.amazonaws.com/${file.Key}`}
                alt={file.Key}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
