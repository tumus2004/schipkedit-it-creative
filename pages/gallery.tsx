import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { uploadToS3 } from '../components/uploadToS3';
import Modal from 'react-modal';
import AWS, { S3 } from 'aws-sdk';
import { ProgressBar } from 'react-bootstrap';

Modal.setAppElement('#__next');

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
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
      }
    });
  }, []);

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleImageUpload = async () => {
    const file = (inputRef.current?.files as any)[0];
    const result = await uploadToS3(file, setUploadProgress, null);
    if (result?.Location) {
      console.log(result.Location);
      window.location.reload();
    } else {
      console.log('Error uploading image');
    }
  };

  const handleUploadOfImage = (event: any) => {
    if (event.target.value) {
      setImageUpload(event.target.value.length);
    }
  };

  return (
    <div id='GalleryDiv' className='container mx-auto px-6 py-16'>
      <h1 className='text-3xl font-bold'>Gallery</h1>
      <input
        id='file'
        type='file'
        name='file'
        accept='image/*'
        ref={inputRef}
        onChange={handleUploadOfImage}
      />
      {!!imageUpload && (
        <>
          <button
            className='m-4 w-8 h-2 rounded-sm bg-blue-500 text-white p-2'
            onClick={handleImageUpload}>
            Upload
          </button>
          <ProgressBar now={uploadProgress} max={100} />
        </>
      )}
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={() => setSelectedImage(null)}
        contentLabel='Selected Image'>
        <div className='mt-12' style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
          {selectedImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
              src={selectedImage}
              alt='Selected image'
            />
          )}
          <button onClick={() => setSelectedImage(null)}>Close</button>
        </div>
      </Modal>

      <div className='mt-12 grid grid-cols-2 gap-4'>
        {listFiles &&
          listFiles.length > 0 &&
          listFiles.map((file: any, index: any) => (
            <Image
              id='image'
              key={index}
              width={250}
              height={250}
              style={{ cursor: 'pointer' }}
              src={`https://schipkeditbucket.s3.ap-southeast-2.amazonaws.com/${file.Key}`}
              alt={file.Key}
              className='w-full object-cover'
              onClick={() =>
                handleThumbnailClick(
                  `https://schipkeditbucket.s3.ap-southeast-2.amazonaws.com/${file.Key}`
                )
              }
            />
          ))}
      </div>
    </div>
  );
};

export default Gallery;
