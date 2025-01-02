import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
	return (
		<header className='bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-50'>
			<nav className='container mx-auto px-6 py-4 flex justify-between items-center'>
				<Link href='/' className='flex items-center space-x-2'>
					<Image
						src='/img/proj-remarkable-logo.webp'
						alt='Project Remarkable Logo'
						width={200}
						height={40}
						className='filter invert'
					/>
				</Link>
				<div className='hidden md:flex space-x-6'>
					<Link href='#story' className='text-white hover:text-gray-300 transition duration-300'>
						Story
					</Link>
					<Link href='#services' className='text-white hover:text-gray-300 transition duration-300'>
						Services
					</Link>
					<Link href='#testimonials' className='text-white hover:text-gray-300 transition duration-300'>
						Testimonials
					</Link>
					<Link href='#contact' className='text-white hover:text-gray-300 transition duration-300'>
						Contact
					</Link>
				</div>
				<button className='md:hidden text-white focus:outline-none'>
					<svg
						className='h-6 w-6'
						fill='none'
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='2'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path d='M4 6h16M4 12h16M4 18h16'></path>
					</svg>
				</button>
			</nav>
		</header>
	);
};
