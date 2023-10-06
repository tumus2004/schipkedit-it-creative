import { useEffect, useRef, useState } from 'react';

interface PlanetStatsProps {
  planet: string;
  size: string;
  radialVelocity: string;
  orbitalVelocity: string;
  orbitalPeriod: string;
}

export const PlanetStates = ({
  planet,
  size,
  radialVelocity,
  orbitalVelocity,
  orbitalPeriod,
}: PlanetStatsProps): JSX.Element => {
  const box = useRef<HTMLDivElement>(null);

  return (
    <div ref={box} id='feature' className='feature'>
      <div className='feature-content'>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Planet</span>
          <span className='text-gray-100 text-right text-xs'>{planet}</span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Size</span>
          <span className='text-gray-100 text-right text-xs'>{size}</span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Radial Velocity</span>
          <span className='text-gray-100 text-right text-xs'>
            {radialVelocity}
          </span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Orbital Velocity</span>
          <span className='text-gray-100 text-right text-xs'>
            {orbitalVelocity}
          </span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Orbital Period</span>
          <span className='text-gray-100 text-right text-xs'>
            {orbitalPeriod}
          </span>
        </div>
      </div>
      {/* <div>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Planet</span>
          <span className='text-gray-100 text-right text-xs'>{planet}</span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Size</span>
          <span className='text-gray-100 text-right text-xs'>{size}</span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Radial Velocity</span>
          <span className='text-gray-100 text-right text-xs'>
            {radialVelocity}
          </span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Orbital Velocity</span>
          <span className='text-gray-100 text-right text-xs'>
            {orbitalVelocity}
          </span>
        </div>
        <div className='flex justify-between gap-4'>
          <span className='text-gray-300 text-xs'>Orbital Period</span>
          <span className='text-gray-100 text-right text-xs'>
            {orbitalPeriod}
          </span>
        </div>
      </div> */}
    </div>
  );
};
