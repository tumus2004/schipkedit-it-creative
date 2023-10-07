import React, { useState, useEffect } from 'react';
import SolarSystem from '../components/SolarSystem/SolarSystem';
import { PlanetStates } from '../components/PlanetStats';

interface IndexProps {
  className?: string;
}

const planetStats = [
  {
    planet: 'Earth',
    size: '12,756 km',
    radialVelocity: '29.78 km/s',
    orbitalVelocity: '107,218 km/h',
    orbitalPeriod: '365.25 days',
  },
  {
    planet: 'Mercury',
    size: '4,879 km',
    radialVelocity: '47.36 km/s',
    orbitalVelocity: '172,440 km/h',
    orbitalPeriod: '88 days',
  },
  {
    planet: 'Venus',
    size: '12,104 km',
    radialVelocity: '35.02 km/s',
    orbitalVelocity: '126,072 km/h',
    orbitalPeriod: '224.7 days',
  },
  {
    planet: 'Mars',
    size: '6,779 km',
    radialVelocity: '24.13 km/s',
    orbitalVelocity: '86,904 km/h',
    orbitalPeriod: '687 days',
  },
  {
    planet: 'Jupiter',
    size: '139,822 km',
    radialVelocity: '13.06 km/s',
    orbitalVelocity: '47,016 km/h',
    orbitalPeriod: '11.9 years',
  },
  {
    planet: 'Saturn',
    size: '116,464 km',
    radialVelocity: '9.64 km/s',
    orbitalVelocity: '34,704 km/h',
    orbitalPeriod: '29.5 years',
  },
  {
    planet: 'Uranus',
    size: '50,724 km',
    radialVelocity: '6.81 km/s',
    orbitalVelocity: '24,516 km/h',
    orbitalPeriod: '84 years',
  },
  {
    planet: 'Neptune',
    size: '49,244 km',
    radialVelocity: '5.43 km/s',
    orbitalVelocity: '19,548 km/h',
    orbitalPeriod: '165 years',
  },
  {
    planet: 'Pluto',
    size: '2,370 km',
    radialVelocity: '4.74 km/s',
    orbitalVelocity: '17,064 km/h',
    orbitalPeriod: '248 years',
  },
  {
    planet: 'Moon',
    size: '3,474 km',
    radialVelocity: '1.022 km/s',
    orbitalVelocity: '3,679 km/h',
    orbitalPeriod: '27.3 days',
  },
];

const Index: React.FC = ({ className }: IndexProps) => {
  const [baseSpeed, setBaseSpeed] = useState<number>(480);

  useEffect(() => {
    const featuresEl: HTMLDivElement | null =
      document.querySelector('.planet-stats');
    const featureEls: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.feature');

    if (featuresEl && featuresEl != null) {
      featuresEl.addEventListener('pointermove', (ev) => {
        featureEls.forEach((featureEl) => {
          // Not optimized yet, I know
          const rect = featureEl.getBoundingClientRect();

          featureEl.style.setProperty(
            '--x',
            JSON.stringify(ev.clientX - rect.left)
          );
          featureEl.style.setProperty(
            '--y',
            JSON.stringify(ev.clientY - rect.top)
          );
        });
      });
    }
  }, []);

  return (
    <>
      <div className='h-screen p-4 md:p-10 bg-gradient-to-br from-stone-800'>
        <div className='planet-stats'>
          {/* <div className='planet-stats grid grid-cols-1 gap-1 md:grid-cols-4 p-4'> */}
          {planetStats.map((planet) => (
            <PlanetStates
              planet={planet.planet}
              size={planet.size}
              radialVelocity={planet.radialVelocity}
              orbitalVelocity={planet.orbitalVelocity}
              orbitalPeriod={planet.orbitalPeriod}
              key={planet.planet}
            />
          ))}
        </div>
        <SolarSystem
          baseSpeed={baseSpeed}
          setBaseSpeed={setBaseSpeed}
          className='fixed top-0 left-0'
        />
        <div
          className='bg-center w-full bottom-0 absolute'
          style={{ background: `transparent` }}>
          <div className='text-4xl md:text-6xl font-extrabold relative bottom-16 w-full text-center'>
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
    </>
  );
};
export default Index;
