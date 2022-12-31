import React from 'react';

interface PortfolioProps {
  id?: number;
  title?: string;
  description?: string;
}

const Portfolio = ({ id, title, description }: PortfolioProps): JSX.Element => {
  return (
    <div className='w-[100px] height=[100px]'>
      <h1>Portfolio</h1>
    </div>
  );
};

export default Portfolio;
