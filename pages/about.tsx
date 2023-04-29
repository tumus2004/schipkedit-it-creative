import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <section
      className='about-section'
      style={{
        margin: '16px',
        height: 'calc(100vh - 32px)',
        overflowY: 'auto',
      }}>
      <div className='header-section'>
        <h1 className='text-3xl font-bold text-gray-800'>About Me</h1>
      </div>
      <div
        style={{ backgroundImage: `url('./background_image.jpg')` }}
        className='about-content'>
        <div className='intro-section'>
          <p className='text-gray-800 text-xl font-light'>
            Hi there! My name is Tom, and I am a passionate software engineer
            with a focus on building scalable and reliable applications.
            Originally being primarily involved in front-end web development, I
            have had the opportunity to work on a variety of projects across
            different domains and technologies.
          </p>
          <p className='text-gray-800 text-xl font-light'>
            I am constantly seeking to learn and grow as a software engineer,
            and I am always open to new challenges and opportunities.
          </p>
        </div>
        <div className='skills-section'>
          <h2>Skills</h2>
          <ul>
            <li>React.js</li>
            <li>Node.js</li>
            <li>JavaScript/TypeScript</li>
            <li>HTML/CSS</li>
            <li>Python</li>
          </ul>
        </div>
        <div className='projects-section'>
          <h2>Projects</h2>
          <p>Some of my recent projects include:</p>
          <ul>
            <li>Project 1 - A React Native App for managing To-Do lists</li>
            <li>Project 2 - A Node.js backend for a social media platform</li>
            <li>Project 3 - A React web app for displaying weather data</li>
            <li>
              Project 4 - A Python script for automating data collection and
              processing
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
