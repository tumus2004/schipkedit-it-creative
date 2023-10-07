import { useEffect, useRef, useState } from 'react';

interface PlanetStatsProps {
  planet: string;
  size: string;
  radialVelocity: string;
  orbitalVelocity: string;
  orbitalPeriod: string;
}

export const PlanetStats = ({
  planet,
  size,
  radialVelocity,
  orbitalVelocity,
  orbitalPeriod,
}: PlanetStatsProps): JSX.Element => {
  const box = useRef<HTMLDivElement>(null);

  return (
    <div ref={box} id='feature' className='feature'>
      <div className='feature-content flex flex-col my-0 p-4'>
        <strong>{planet}</strong>
        <div className='flex justify-between'>
          <span className='text-gray-300 opacity-75 text-xs'>Size</span>
          <span className='text-gray-100 opacity-75 text-right text-xs'>
            {size}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-300 opacity-75 text-xs'>
            Radial Velocity
          </span>
          <span className='text-gray-100 opacity-75 text-right text-xs'>
            {radialVelocity}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-300 opacity-75 text-xs'>
            Orbital Velocity
          </span>
          <span className='text-gray-100 opacity-75 text-right text-xs'>
            {orbitalVelocity}
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='text-gray-300 opacity-75 text-xs'>
            Orbital Period
          </span>
          <span className='text-gray-100 opacity-75 text-right text-xs'>
            {orbitalPeriod}
          </span>
        </div>
      </div>
    </div>
  );
};
