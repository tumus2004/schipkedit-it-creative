import { set } from 'lodash';
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
  const [mousePosX, setMousePosX] = useState<number>(0);
  const [mousePosY, setMousePosY] = useState<number>(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentBox = box.current;

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      const rect = currentBox?.getBoundingClientRect();
      if (rect && currentBox) {
        const x = e.clientX - rect.left;
        setMousePosX(x);
        const y = e.clientY - rect.top;
        setMousePosY(y);
        currentBox.style.setProperty('--x', `${x}px`);
        currentBox.style.setProperty('--y', `${y}px`);
      }
    };

    if (currentBox) {
      currentBox.addEventListener('mouseenter', () => {
        if (currentBox) {
          currentBox.style.setProperty('--alpha', '1');
        }
      });

      currentBox.addEventListener('mousemove', handleMouseMove);

      currentBox.addEventListener('mouseleave', () => {
        if (currentBox) {
          currentBox.style.setProperty('--alpha', '0');
          setMousePosX(0);
          setMousePosY(0);
        }
      });
    }

    return () => {
      currentBox &&
        currentBox.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    console.log(mousePosX);
  }, [mousePosX, mousePosY]);

  return (
    <div
      ref={box}
      className={`planet-stats overflow-hidden rounded-xl bot-0 left-0 ml-4 md:ml-16 lg:ml-32 mt-16 md:mt-32 lg:mt-64 border ${
        mousePosX > 0 ? 'border-[#fff]/50' : 'border-[#fff]/25'
      } transition ease transition-duration-500 absolute p-4 gap-4 min-w-max ease-in`}>
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
