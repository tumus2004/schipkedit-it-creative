import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className='w-full z-10 relative px-6 py-4 flex items-center justify-between md:px-8 lg:px-12 bg-stone-900 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-30'>
      <Link href='/'>
        <div className='flex items-center space-x-2'>
          <svg
            className=' h-8 w-8 text-blue-400'
            fill='none'
            height='24'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            width='24'
            xmlns='http://www.w3.org/2000/svg'>
            <polyline points='16 18 22 12 16 6' />
            <polyline points='8 6 2 12 8 18' />
          </svg>
          <span className='text-2xl font-semibold text-white whitespace-nowrap'>
            Thomas Schipke
          </span>
        </div>
      </Link>
      <nav className='space-x-4'>
        <Link
          className='text-gray-300 hover:text-blue-500 transition-colors duration-300 whitespace-nowrap'
          href='#'>
          About
        </Link>
        <Link
          className='text-gray-300 hover:text-blue-500 transition-colors duration-300 whitespace-nowrap'
          href='#'>
          Projects
        </Link>
        <Link
          className='text-gray-300 hover:text-blue-500 transition-colors duration-300 whitespace-nowrap'
          href='#'>
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
