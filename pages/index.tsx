import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dotenv from 'dotenv';
import SolarSystem from '../components/SolarSystem/SolarSystem';

interface IndexProps {
  className?: string;
}

const Index: React.FC = ({ className }: IndexProps) => {
  return (
    <div className='min-h-screen relative bg-gradient-to-br from-gray-900 to-gray-100'>
      <div className='bg-center w-full h-screen relative'>
        <SolarSystem className='fixed top-0 left-0' />
        <div className='container mx-auto px-6 py-16'>
          <h1 className='text-5xl font-bold text-gray-100 ml-4'>Schipked it</h1>
          <p className='text-gray-100 text-2xl font-light ml-4 mt-4'>
            Work in progress
          </p>
          <div className='flex flex-col lg:flex-row mt-12 space-y-4 lg:space-y-0'>
            <div className='relative group'>
              <Link
                href='/works'
                id='works-link'
                className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full lg:mt-0 lg:ml-4 hover:bg-white hover:text-black duration-300'>
                Some random stuff
              </Link>
              <div className='absolute w-64 h-24 bg-white text-black rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-12'>
                <p className='p-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className='relative group'>
              <Link
                href='/gallery'
                id='gallery-link'
                className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full lg:mt-0 lg:ml-4 hover:bg-white hover:text-black duration-300'>
                Gallery
              </Link>
              <div className='absolute w-64 h-24 bg-white text-black rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-12'>
                <p className='p-4'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
