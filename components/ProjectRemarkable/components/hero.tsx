import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
	return (
		<section className='relative flex items-center overflow-hidden min-h-[60vh] md:h-[50vh]'>
			<Image
				src='/img/hero-image.jpeg'
				alt='Mountain peak'
				layout='fill'
				objectFit='cover'
				className='z-0 opacity-50'
			/>
			<div className='absolute inset-0 bg-gradient-to-b from-black via-black to-transparent z-1'></div>
			<div className='container mx-auto px-6 relative z-10'>
				<div className='md:w-2/3'>
					<h1 className='text-4xl md:text-6xl font-bold text-gradient mb-4 leading-tight'>
						Elevate Your Business to New Heights
					</h1>
					<p className='text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed'>
						Unlock peak performance with our expert coaching. Scale your sales, leadership, and personal growth.
					</p>
					<div className='flex flex-col sm:flex-row gap-4'>
						<a
							href='#contact'
							className='bg-white text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300 flex items-center justify-center'
						>
							Start Your Ascent
							<ArrowRight className='ml-2 h-5 w-5' />
						</a>
						<a
							href='#services'
							className='border border-white text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition duration-300 flex items-center justify-center'
						>
							Own Your Summit
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};
