import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header/Header';

interface IndexProps {
  className?: string;
}

const Index: React.FC = ({ className }: IndexProps) => {
  useEffect(() => {
    const featuresEl: HTMLDivElement | null =
      document.querySelector('.showcase');
    const featureEls: NodeListOf<HTMLDivElement> =
      document.querySelectorAll('.item');

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
    <div className='flex flex-col min-h-screen bg-stone-900 overflow-hidden relative'>
      <Header />
      <main className='flex-1 w-full mt-16 text-gray-300 px-6 md:px-8 lg:px-12 overflow-y-auto scrollbar-hide'>
        <section className='mb-12' id='about'>
          <h1 className='text-6xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:to-yellow-500 whitespace-nowrap'>
            Hello, I&apos;m Tom.
          </h1>
          <p className='mt-6 text-md'>
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
          <div className='h-screen mt-4 bg-gradient-to-br from-stone-900'>
            <div className='showcase'>
              {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'> */}
              <Link href='/solarSystem' className='item' id='item'>
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
                <div className='item-content'>
                  <h3 className='text-lg font-semibold text-white'>
                    Solar System
                  </h3>
                  <p className='mt-2 text-sm'>
                    Three.js project that displays the solar system. It features
                    a dynamic camera, planet stats, and a speed slider, along
                    with real time planet rotation and revolution controls. The
                    planet location is based on real NASA data, and the planet
                    rotation and logarithmic orbit are based on real physics.
                  </p>
                </div>
              </Link>
              {/* <div className='bg-gray-800 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg bg-opacity-30 hover:bg-gradient-to-r hover:from-gray-900 hover:to-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105'> */}
              <div className='item'>
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
                <div className='item-content'>
                  <h3 className='text-lg font-semibold text-white'>
                    Blog Platform
                  </h3>
                  <p className='mt-2 text-sm'>
                    A dynamic blogging platform developed using React
                    (Typescript), HTML and Tailwind. It supports user
                    authentication, post creation, image upload and display with
                    a responsive design.
                  </p>
                </div>
              </div>
              <div className='item'>
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
                <div className='item-content'>
                  <h3 className='text-lg font-semibold text-white'>
                    Weather App
                  </h3>
                  <p className='mt-2 text-sm'>
                    A weather forecasting app built with Next.js. It uses the
                    OpenWeatherMap API to fetch and display weather data based
                    on user&apos;s location.
                  </p>
                </div>
              </div>
              <div className='item'>
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
                <div className='item-content'>
                  <h3 className='text-lg font-semibold text-white'>
                    Task Manager App
                  </h3>
                  <p className='mt-2 text-sm'>
                    A task management application created with React. It allows
                    users to create, update, and organize tasks effectively.
                  </p>
                </div>
              </div>
              <div className='item'>
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
                <div className='item-content'>
                  <h3 className='text-lg font-semibold text-white'>
                    Restaurant Reservation System
                  </h3>
                  <p className='mt-2 text-sm'>
                    A restaurant reservation system developed using Next.js,
                    python for the backend and React. It features real-time
                    availability updates and email notifications.
                  </p>
                </div>
              </div>
              <div className='item'>
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
                <div className='item-content'>
                  <h3 className='text-lg font-semibold text-white'>JB HiFi</h3>
                  <p className='mt-2 text-sm'>
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
