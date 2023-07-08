import React from 'react';
import dotenv from 'dotenv';
import AWS from 'aws-sdk';

declare let window: any;

export const uploadToS3 = async (
  file: File,
  setUploadProgress: React.Dispatch<React.SetStateAction<number>>,
  newFilename: string | null = null
) => {
  if (!file) return;

  const config = {
    bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME || '',
    dirName: 'images',
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  };

  AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region,
  });

  const s3 = new AWS.S3();

  const upload = s3.upload({
    Bucket: config.bucketName,
    Key: `${config.dirName}/${newFilename || file.name}`,
    Body: file,
    ContentType: file.type,
    ACL: 'public-read',
  });

  upload.on('httpUploadProgress', (progress) => {
    const percent = Math.round((progress.loaded / progress.total) * 100);
    console.log((progress.loaded * 100) / progress.total, 'percent');
    setUploadProgress(percent);
  });

  try {
    const result = await upload.promise();
    return result;
  } catch (error) {
    console.error('Error uploading file: ', error);
    throw error;
  }
};
