import React from 'react';

const Works: React.FC = () => {
  return (
    <div className='container mx-auto px-6 py-16'>
      <h1 className='text-3xl font-bold text-gray-800'>My Works</h1>
      <p className='text-gray-800 text-xl font-light mt-4'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac ligula a risus
        imperdiet tempus.
      </p>
      <div className='mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <div className='bg-gray-800 rounded-lg shadow-lg p-6'>
          <h2 className='text-2xl font-bold text-gray-100'>Project 1</h2>
          <p className='text-gray-100 mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac ligula a risus
            imperdiet tempus.
          </p>
        </div>
        <div className='bg-gray-800 rounded-lg shadow-lg p-6'>
          <h2 className='text-2xl font-bold text-gray-100'>Project 2</h2>
          <p className='text-gray-100 mt-2'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac ligula a risus
            imperdiet tempus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Works;
