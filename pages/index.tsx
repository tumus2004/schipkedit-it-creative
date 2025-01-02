import React, { useEffect } from 'react';
import { Showcase } from '../components/Showcase/Showcase';
import Header from '../components/Header/Header';
import { LandingHeader } from '../components/LandingHeader/LandingHeader';
import { useMouseFeatureEffect } from '../hooks/useMouseFeatureEffect';

interface IndexProps {
	className?: string;
}

const Index: React.FC = ({ className }: IndexProps) => {
	useMouseFeatureEffect('.showcase', '.item');

	return (
		<div className='flex flex-col bg-stone-900 overflow-hidden relative'>
			{/* <Header /> */}
			<main className='flex-1 w-full min-h-screen mt-20 lg:mt-0 text-gray-300 px-6 md:px-8 lg:px-0 lg:content-center overflow-y-auto scrollbar-hide'>
				<LandingHeader />
				{/* <Showcase /> */}
			</main>
		</div>
	);
};

export default Index;
