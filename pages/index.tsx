import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dotenv from 'dotenv';
import SolarSystem from '../components/SolarSystem/SolarSystem';

interface IndexProps {
  className?: string;
}

const Index: React.FC = ({ className }: IndexProps) => {
  const [baseSpeed, setBaseSpeed] = useState<number>(480);

  const setBaseSpeedFunc = (speed: number) => {
    setBaseSpeed(speed);
  };

  return (
    <div className='min-h-screen z-100 relative bg-gradient-to-br from-stone-800'>
      <SolarSystem
        baseSpeed={baseSpeed}
        setBaseSpeedFunc={() => setBaseSpeedFunc(baseSpeed)}
        className='fixed top-0 left-0'
      />
      <div
        className='bg-center w-full h-screen relative'
        style={{ background: `transparent` }}>
        <div className='text-4xl md:text-6xl font-extrabold absolute top-16 w-full text-center'>
          <input
            type='number'
            value={baseSpeed}
            onChange={(e) => setBaseSpeedFunc(parseInt(e.target.value))}
          />
          <span className='bg-clip-text text-transparent bg-gradient-to-br from-red-700 to-sky-700'>
            1 Second = {baseSpeed / 60} {baseSpeed === 60 ? `hour` : `hours`}
          </span>
        </div>
        <div className='container pointer-events-none	mx-auto px-6 pt-32'>
          <h1 className='font-extrabold text-gray-100 ml-4'>Schipked it</h1>
          <p className='text-gray-300 text-2xs font-light ml-4 mt-0'>
            Work in progress
          </p>
          {/* <div className='flex relative flex-col z-50 lg:flex-row mt-12'>
            <div className='relative group mt-8'>
              <Link
                href='/works'
                id='works-link'
                className='btn bg-gray-800 text-gray-300 font-semibold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white hover:text-black duration-300'>
                Some random stuff
              </Link>
              <div className='absolute w-64 h-24 bg-white text-black left-4 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-4'>
                <p className='p-4'>
                  Explore various projects and creative works.
                </p>
              </div>
            </div>
            <div className='relative group mt-8'>
              <Link
                href='/gallery'
                id='gallery-link'
                className='btn bg-gray-800 text-gray-300 font-semibold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white hover:text-black duration-300'>
                Gallery
              </Link>
              <div className='absolute w-64 h-24 bg-white text-black rounded-lg opacity-0 group-hover:opacity-100 transition-all lg:ml-4 duration-300 transform group-hover:translate-y-4'>
                <p className='p-4'>
                  Browse through a collection of visual art and photography.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Index;
