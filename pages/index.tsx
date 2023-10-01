import React, { useState } from 'react';
import SolarSystem from '../components/SolarSystem/SolarSystem';

interface IndexProps {
  className?: string;
}

const Index: React.FC = ({ className }: IndexProps) => {
  const [baseSpeed, setBaseSpeed] = useState<number>(480);

  return (
    <div className='min-h-screen z-100 p-4 md:p-10 relative bg-gradient-to-br from-stone-800'>
      <SolarSystem
        baseSpeed={baseSpeed}
        setBaseSpeed={setBaseSpeed}
        className='fixed top-0 left-0'
      />
      <div
        className='bg-center w-full h-screen relative'
        style={{ background: `transparent` }}>
        <div className='text-4xl md:text-6xl font-extrabold absolute top-16 w-full text-center'>
          <span className='bg-clip-text text-transparent bg-gradient-to-br from-red-700 to-sky-700'>
            1 Second = {baseSpeed / 60} {baseSpeed === 60 ? `hour` : `hours`}
          </span>
        </div>
        {/* <div className='container pointer-events-none	mx-auto px-6 pt-32'>
          <h1 className='font-extrabold text-gray-100 ml-4'>Schipked it</h1>
          <p className='text-gray-300 text-2xs font-light ml-4 mt-0'>
            Work in progress
          </p>
        </div> */}
      </div>
    </div>
  );
};
export default Index;
