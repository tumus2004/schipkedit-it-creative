import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dotenv from 'dotenv';

interface IndexProps {
  className?: string;
}

const Index: React.FC = ({ className }: IndexProps) => {
  return (
    <div className='bg-gray-900 min-h-screen'>
      <div
        className='bg-center w-full h-screen bg-no-repeat bg-cover md:bg-fixed'
        style={{ backgroundImage: `url('./background_image.jpg')` }}>
        <div className='container mx-auto px-6 py-16'>
          <h1 className='text-3xl font-bold text-gray-100 ml-4'>Schipked it</h1>
          <p className='text-gray-100 text-xl font-light ml-4 mt-4'>
            Work in progress
          </p>
          {/* <div className='flex flex-col lg:flex-row mt-12'>
            <Link
              href='/about'
              id='about-link'
              className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white duration-300'>
              About
            </Link>
            <Link
              href='/contact'
              id='contact-link'
              className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white duration-300'>
              Contact me
            </Link>
            <Link
              href='/works'
              id='works-link'
              className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white duration-300'>
              My works
            </Link>
            <Link
              href='/gallery'
              id='gallery-link'
              className='btn bg-gray-800 text-gray-100 font-bold py-2 px-4 rounded-full mt-4 lg:mt-0 lg:ml-4 hover:bg-white duration-300'>
              Gallery
            </Link>
          </div>
          <div className='flex flex-wrap w-full'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 w-full'>
              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  {Array.from(Array(3), (_, i) => (
                    <label
                      htmlFor={`item${i + 1}`}
                      className='inline-flex items-center'
                      key={i}>
                      <input
                        type='checkbox'
                        id={`item${i + 1}`}
                        className='form-checkbox h-5 w-5 text-green-600'
                      />
                      <span className='ml-2 text-white'>{`Rectangle ${
                        i + 1
                      }`}</span>
                    </label>
                  ))}
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  <p className='text-white'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    malesuada eget lorem ac suscipit.
                  </p>
                </div>
              </div>

              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 h-32 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  Rectangle 2
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  malesuada eget lorem ac suscipit.
                </div>
              </div>

              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 h-32 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  Rectangle 3
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  malesuada eget lorem ac suscipit.
                </div>
              </div>

              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 h-32 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  Rectangle 4
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  malesuada eget lorem ac suscipit.
                </div>
              </div>

              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 h-32 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  Rectangle 5
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  malesuada eget lorem ac suscipit.
                </div>
              </div>

              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 h-32 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  Rectangle 6
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  malesuada eget lorem ac suscipit.
                </div>
              </div>

              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 h-32 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  Rectangle 7
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  malesuada eget lorem ac suscipit.
                </div>
              </div>

              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 h-32 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  Rectangle 8
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  malesuada eget lorem ac suscipit.
                </div>
              </div>

              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 h-32 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  Rectangle 9
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  malesuada eget lorem ac suscipit.
                </div>
              </div>

              <div className='rounded-3xl bg-lime-800 border-2 border-lime-300 h-32 bg-opacity-60 hover:bg-green-400 hover:bg-opacity-60'>
                <div className='accordion-header cursor-pointer px-4 py-2'>
                  Rectangle 10
                </div>
                <div className='accordion-body hidden px-4 py-2'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  malesuada eget lorem ac suscipit.
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
