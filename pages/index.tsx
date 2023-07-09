import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dotenv from 'dotenv';

interface IndexProps {
  className?: string;
}

const Index: React.FC = ({ className }: IndexProps) => {
  return (
    <div className='bg-gray-900 min-h-screen'>
      <div
        className='bg-center w-full h-screen bg-no-repeat bg-cover md:bg-fixed'
        style={{ backgroundImage: `url('./background_image.jpg')` }}>
        <div className='container mx-auto px-6 py-16'>
          <h1 className='text-3xl font-bold text-gray-100 ml-4'>Schipked it</h1>
          <p className='text-gray-100 text-xl font-light ml-4 mt-4'>
            Work in progress
          </p>
          <div className='flex flex-col lg:flex-row mt-12'>
            {/* <Link
              href='/about'
              id='about-link'
              className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white duration-300'>
              About
            </Link>
            <Link
              href='/contact'
              id='contact-link'
              className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white hover:text-black duration-300'>
              Contact me
            </Link> */}
            <Link
              href='/works'
              id='works-link'
              className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white hover:text-black duration-300'>
              Some random stuff
            </Link>
            <Link
              href='/gallery'
              id='gallery-link'
              className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white hover:text-black duration-300'>
              Gallery
            </Link>
            {/* <Link
              href='/baby-stuff'
              id='baby-link'
              className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white hover:text-black duration-300'>
              Baby stuff
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
