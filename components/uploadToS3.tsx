import React from 'react';
import dotenv from 'dotenv';
import S3 from 'react-aws-s3';

declare let window: any;

export const uploadToS3 = async (
  file: any,
  newFilename: any,
  fileType: any
) => {
  window.Buffer = window.Buffer || require('buffer').Buffer;
  if (!file) return;

  const config = {
    bucketName: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    dirName: 'images',
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  };

  const ReactS3Client = new S3(config);

  const result = ReactS3Client.uploadFile(file, newFilename)
    .then((data: any) => data)
    .catch((err: any) => console.error(err));
  return result;
};
