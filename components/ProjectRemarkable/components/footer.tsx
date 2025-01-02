import { Mountain } from 'lucide-react';

export const Footer = () => {
	return (
		<footer className='bg-black text-white pb-12'>
			<div className='container mx-auto px-6'>
				<div className='flex flex-col md:flex-row justify-between items-center'>
					<div className='flex items-center mb-4 md:mb-0'>
						<Mountain className='h-8 w-8 text-white mr-2' />
						<span className='text-xl font-bold'>Project Remarkable</span>
					</div>
					<div className='flex space-x-6'>
						<a href='#' className='hover:text-gray-300 transition duration-300'>
							Privacy Policy
						</a>
						<a href='#' className='hover:text-gray-300 transition duration-300'>
							Terms of Service
						</a>
						<a href='#' className='hover:text-gray-300 transition duration-300'>
							Contact
						</a>
					</div>
				</div>
				<div className='mt-8 text-center text-gray-500 text-sm'>
					© {new Date().getFullYear()} Project Remarkable. All rights reserved.
				</div>
			</div>
		</footer>
	);
};
