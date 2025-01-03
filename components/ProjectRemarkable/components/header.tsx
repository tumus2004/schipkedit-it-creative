import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className='bg-black bg-opacity-50 backdrop-blur-md fixed w-full z-50'>
			<nav className='container mx-auto px-6 py-4 flex justify-between items-center'>
				{/* Logo / Home Link */}
				<Link href='/' className='flex items-center space-x-2'>
					<Image
						src='/img/proj-remarkable-logo.webp'
						alt='Project Remarkable Logo'
						width={200}
						height={40}
						className='filter invert'
					/>
				</Link>

				{/* Desktop Nav */}
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

				{/* Hamburger Button (mobile only) */}
				<button className='md:hidden text-white focus:outline-none' onClick={() => setMenuOpen(!menuOpen)}>
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

			{/* Mobile Slide-Out Menu */}
			<div
				className={`fixed top-0 right-0 w-full h-full bg-black z-50 transform ${
					menuOpen ? 'translate-x-0' : 'translate-x-full'
				} transition-transform duration-300 ease-in-out`}
			>
				{/* Close Button */}
				<button className='absolute top-4 right-4 text-white' onClick={() => setMenuOpen(false)}>
					✕
				</button>

				{/* Mobile Nav Links */}
				<nav className='flex flex-col items-center justify-center bg-black bg-opacity-90 z-9999 h-screen space-y-8'>
					<Link
						href='#story'
						className='text-white text-2xl hover:text-gray-300 transition duration-300'
						onClick={() => setMenuOpen(false)}
					>
						Story
					</Link>
					<Link
						href='#services'
						className='text-white text-2xl hover:text-gray-300 transition duration-300'
						onClick={() => setMenuOpen(false)}
					>
						Services
					</Link>
					<Link
						href='#testimonials'
						className='text-white text-2xl hover:text-gray-300 transition duration-300'
						onClick={() => setMenuOpen(false)}
					>
						Testimonials
					</Link>
					<Link
						href='#contact'
						className='text-white text-2xl hover:text-gray-300 transition duration-300'
						onClick={() => setMenuOpen(false)}
					>
						Contact
					</Link>
				</nav>
			</div>
		</header>
	);
};
