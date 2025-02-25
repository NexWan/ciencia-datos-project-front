import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router';
import { getImagesFromServer } from '~/utils/fetchDB';

const Welcome = () => {

  return (
    <div className="flex items-center flex-row justify-center w-full h-full">
      <div className='w-1/2 flex items-center justify-center text-center px-5 flex-col h-full'>
        <span className='text-white lg:text-8xl text-6xl text-center mb-5 text-shadow'>Weird <br></br> Marketplace</span>
        <p className='text-white md:text-3xl text-xl text-justify'>Buy and sell weird things</p>
        <Link to='/gallery' className='bg-inputs text-white shadow-md text-2xl px-5 py-2 rounded-lg mt-5 hover:cursor-pointer hover:scale-105 transition-all'>Explore</Link>
      </div>
      <div className='w-1/2 md:flex items-center justify-center overflow-hidden hidden'>
      <div className='bg-logo absolute md:w-80 md:h-80 lg:w-100 lg:h-100 xl:w-120 xl:h-120 rounded-full md:flex hidden'>&nbsp;</div>
        <img src="/pics/mp.svg" className=' w-4/8 drop-design glowing-text img-shadow' alt="" />
      </div>
    </div>
  );
};

export default Welcome;