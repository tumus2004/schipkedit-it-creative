import { useEffect, useState } from 'react';
import { PlanetStats } from '../components/PlanetStats';
import SolarSystem from '../components/SolarSystem/SolarSystem';
import Header from '../components/Header/Header';
import { useMouseFeatureEffect } from '../hooks/useMouseFeatureEffect';

interface Props {
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

const SolarSystemWrapper: React.FC = ({ className }: Props) => {
	const [baseSpeed, setBaseSpeed] = useState<number>(480);
	const [showPlanetStats, setShowPlanetStats] = useState<boolean>(false);

	useMouseFeatureEffect('.planet-stats', '.feature');

	return (
		<>
			<Header />
			<div className='h-screen p-4 md:p-10 bg-gradient-to-br from-stone-900'>
				{showPlanetStats && (
					<div className='planet-stats'>
						{planetStats.map((planet) => (
							<PlanetStats
								planet={planet.planet}
								size={planet.size}
								radialVelocity={planet.radialVelocity}
								orbitalVelocity={planet.orbitalVelocity}
								orbitalPeriod={planet.orbitalPeriod}
								key={planet.planet}
							/>
						))}
					</div>
				)}
				<SolarSystem baseSpeed={baseSpeed} setBaseSpeed={setBaseSpeed} className='fixed top-0 left-0' />
				<div className='bg-center w-full bottom-16 left-0 absolute' style={{ background: `transparent` }}>
					<div className='text-3xl md:text-6xl font-extrabold relative w-full text-center'>
						<span className='bg-clip-text text-transparent bg-gradient-to-br from-red-700 to-sky-700'>
							1 Second = {baseSpeed / 60} {baseSpeed === 60 ? `hour` : `hours`}
						</span>
					</div>
				</div>
				
				<button 
					onClick={() => setShowPlanetStats(!showPlanetStats)}
					className="absolute bottom-4 left-4 z-10 bg-black bg-opacity-50 text-white px-3 py-1 rounded hover:bg-opacity-70 transition-all"
				>
					{showPlanetStats ? 'Hide Stats' : 'Show Stats'}
				</button>
			</div>
		</>
	);
};

export default SolarSystemWrapper;
