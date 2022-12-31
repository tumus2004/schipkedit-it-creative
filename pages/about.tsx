import React from 'react';

const About: React.FC = () => {
  return (
    <div
      className='container mx-auto px-6 py-16'
      style={{ backgroundImage: `url('./background_image.jpg')` }}>
      <h1 className='text-3xl font-bold text-gray-800'>About Me</h1>
      <p className='text-gray-800 text-xl font-light mt-4'>
        Hi there! My name is Tom, and I am a passionate software engineer with a focus on building
        scalable and reliable applications. Originally being primarily involved in front-end web
        development, I have had the opportunity to work on a variety of projects across different
        domains and technologies. I am constantly seeking to learn and grow as a software engineer,
        and I am always open to new challenges and opportunities.
      </p>
      <p className='text-gray-800 text-xl font-light mt-4'>
        In my free time, I enjoy staying up to date on the latest developments in technology and
        exploring new programming languages and frameworks. I am excited to share some of my past
        projects with you and to explore new opportunities to collaborate and grow as a software
        engineer. Thank you for visiting my portfolio and I hope you find it informative and
        helpful.
      </p>
    </div>
  );
};

export default About;
