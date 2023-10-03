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

  console.clear();
  box.current?.addEventListener('pointermove', (ev) => {
    const rect = box.current?.getBoundingClientRect();
    box.current?.style.setProperty(
      '--x',
      `${rect?.left && ev.clientX - rect?.left}`
    );
    box.current?.style.setProperty(
      '--y',
      `${rect?.top && ev.clientY - rect?.top}`
    );
    console.log(ev.clientX, ev.clientY);
  });

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
      id='planet-stats'
      className='planet-stats overflow-hidden rounded-xl p-2 border border-white border-opacity-50 transition ease-in duration-500 relative'>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Planet</div>
        <div className='text-gray-100 text-right text-xs'>{planet}</div>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Size</div>
        <div className='text-gray-100 text-right text-xs'>{size}</div>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Radial Velocity</div>
        <div className='text-gray-100 text-right text-xs'>{radialVelocity}</div>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Orbital Velocity</div>
        <div className='text-gray-100 text-right text-xs'>{orbitalVelocity}</div>
      </div>
      <div className='flex justify-between gap-4'>
        <div className='text-gray-300 text-xs'>Orbital Period</div>
        <div className='text-gray-100 text-right text-xs'>{orbitalPeriod}</div>
      </div>
    </div>
  );
};
