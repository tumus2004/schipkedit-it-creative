import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

interface IndexProps {
  className?: string;
}

const Index: React.FC = ({ className }: IndexProps) => {
  
  useEffect(() => {
    const featuresEl: HTMLDivElement | null =
      document.querySelector('.planet-stats');
    const featureEls: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.feature');

    if (featuresEl) {
      featuresEl.addEventListener('pointermove', (ev) => {
        featureEls.forEach((featureEl) => {
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

      // Add the mouseleave event listener
      featuresEl.addEventListener('mouseleave', () => {
        featureEls.forEach((featureEl) => {
          // Use a value outside possible bounds to hide the glow
          featureEl.style.setProperty('--x', '-9999px');
          featureEl.style.setProperty('--y', '-9999px');
        });
      });
    }
  }, []);


  return (
    <div className='flex flex-col min-h-screen bg-stone-900 overflow-hidden relative lg:min-w-[1440px]'>
      <header className='w-full px-6 py-4 flex items-center justify-between md:px-8 lg:px-12 bg-stone-900 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-30'>
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
      <main className='flex-1 w-full mt-16 text-gray-300 px-6 md:px-8 lg:px-12 overflow-y-auto scrollbar-hide'>
        <section className='mb-12' id='about'>
          <h1 className='text-6xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:to-yellow-500 whitespace-nowrap'>
            Hello, I&apos;m Tom.
          </h1>
          <p className='mt-6 text-lg'>
            I&apos;m a software engineer and web developer with a passion for
            creating beautiful and responsive websites. With over 5 years of
            experience in various programming languages and frameworks, I can
            help bring your ideas to life.
          </p>
        </section>
        <section className='mb-12' id='projects'>
          <h2 className='text-4xl font-bold bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:from-pink-500 hover:to-yellow-500 whitespace-nowrap'>
            Showcase
          </h2>
          <div className='h-screen p-4 md:p-10 bg-gradient-to-br from-stone-900'>
            <div className='planet-stats'>
              {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'> */}
              <Link href='/solarSystem' className='feature' id='feature'>
                {/* 
              // className='bg-gray-800 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-30 hover:bg-gradient-to-r hover:from-gray-900 hover:to-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105'> 
                <Image
                alt='E-commerce Website Image'
                className='rounded-t-lg'
                height='200'
                src='/placeholder.svg'
                style={{
                  aspectRatio: '200/200',
                  objectFit: 'cover',
                }}
                width='200'
              /> */}
                <div className='feature-content'>
                  <h3 className='text-2xl font-semibold text-white'>
                    Solar System
                  </h3>
                  <p className='mt-2 text-lg'>
                    Three.js project that displays the solar system. It features
                    a dynamic camera, planet stats, and a speed slider, along
                    with real time planet rotation and revolution controls. The
                    planet location is based on real NASA data, and the planet
                    rotation and logarithmic orbit are based on real physics.
                  </p>
                </div>
              </Link>
              {/* <div className='bg-gray-800 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-30 hover:bg-gradient-to-r hover:from-gray-900 hover:to-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105'> */}
              <div className='feature'>
                {/* <Image
                alt='Blog Platform Image'
                className='rounded-t-lg'
                height='200'
                src='/placeholder.svg'
                style={{
                  aspectRatio: '200/200',
                  objectFit: 'cover',
                }}
                width='200'
              /> */}
                <div className='feature-content'>
                  <h3 className='text-2xl font-semibold text-white'>
                    Blog Platform
                  </h3>
                  <p className='mt-2 text-lg'>
                    A dynamic blogging platform developed using React
                    (Typescript), HTML and Tailwind. It supports user
                    authentication, post creation, image upload and display with
                    a responsive design.
                  </p>
                </div>
              </div>
              <div className='feature'>
                {/* <Image
                alt='Weather App Image'
                className='rounded-t-lg'
                height='200'
                src='/placeholder.svg'
                style={{
                  aspectRatio: '200/200',
                  objectFit: 'cover',
                }}
                width='200'
              /> */}
                <div className='feature-content'>
                  <h3 className='text-2xl font-semibold text-white'>
                    Weather App
                  </h3>
                  <p className='mt-2 text-lg'>
                    A weather forecasting app built with Next.js. It uses the
                    OpenWeatherMap API to fetch and display weather data based
                    on user&apos;s location.
                  </p>
                </div>
              </div>
              <div className='feature'>
                {/* <Image
                alt='Task Manager App Image'
                className='rounded-t-lg'
                height='200'
                src='/placeholder.svg'
                style={{
                  aspectRatio: '200/200',
                  objectFit: 'cover',
                }}
                width='200'
              /> */}
                <div className='feature-content'>
                  <h3 className='text-2xl font-semibold text-white'>
                    Task Manager App
                  </h3>
                  <p className='mt-2 text-lg'>
                    A task management application created with React. It allows
                    users to create, update, and organize tasks effectively.
                  </p>
                </div>
              </div>
              <div className='feature'>
                {/* <Image
                alt='Restaurant Reservation System Image'
                className='rounded-t-lg'
                height='200'
                src='/placeholder.svg'
                style={{
                  aspectRatio: '200/200',
                  objectFit: 'cover',
                }}
                width='200'
              /> */}
                <div className='feature-content'>
                  <h3 className='text-2xl font-semibold text-white'>
                    Restaurant Reservation System
                  </h3>
                  <p className='mt-2 text-lg'>
                    A restaurant reservation system developed using Next.js,
                    python for the backend and React. It features real-time
                    availability updates and email notifications.
                  </p>
                </div>
              </div>
              <div className='feature'>
                {/* <Image
                alt='Social Media Dashboard Image'
                className='rounded-t-lg'
                height='200'
                src='/placeholder.svg'
                style={{
                  aspectRatio: '200/200',
                  objectFit: 'cover',
                }}
                width='200'
              /> */}
                <div className='feature-content'>
                  <h3 className='text-2xl font-semibold text-white'>JB HiFi</h3>
                  <p className='mt-2 text-lg'>
                    Australia&apos;s leading retail electronics brand and one of
                    the most widely used e-commerce sites in Australia, and the
                    world. Using liquid (old-school shopify) but fully
                    customised into a React environment with CSS-in-JS, styled
                    components and using various technology stacks at an
                    enterprise level, this was an incredible experience to be a
                    part of.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent w-full flex items-center justify-center border-t border-gray-700 px-6 md:px-8 lg:px-12 bg-gray-800 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-30'>
          <p className='text-gray-300 whitespace-nowrap'>
            © 2023 Schipke&apos;d it Creative
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
