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
  return (
    <div className='rounded-xl bg-gray-800 bot-0 left-0 ml-4 md:ml-16 lg:ml-32 mt-16 md:mt-32 lg:mt-64 absolute p-4 gap-4 min-w-max bg-transparent border-solid border-gray-900 border-opacity-20 border-2'>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Planet</div>
        <div className='text-gray-100 text-xs'>{planet}</div>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Size</div>
        <div className='text-gray-100 text-xs'>{size}</div>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Radial Velocity</div>
        <div className='text-gray-100 text-xs'>{radialVelocity}</div>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Orbital Velocity</div>
        <div className='text-gray-100 text-xs'>{orbitalVelocity}</div>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Orbital Period</div>
        <div className='text-gray-100 text-xs'>{orbitalPeriod}</div>
      </div>
    </div>
  );
};
