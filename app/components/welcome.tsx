import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router';
import { getImagesFromServer } from '~/utils/fetchDB';

const Welcome = () => {

  return (
    <div className="flex items-center flex-row justify-center w-full h-full">
      <div className='w-1/2 flex items-center justify-center text-center px-5 flex-col h-full'>
        <span className='text-white text-8xl text-center mb-5 text-shadow'>Weird <br></br> Marketplace</span>
        <p className='text-white text-3xl text-justify'>Buy and sell weird things</p>
        <Link to='/gallery' className='bg-inputs text-white shadow-md text-2xl px-5 py-2 rounded-lg mt-5 hover:cursor-pointer hover:scale-105 transition-all'>Explore</Link>
      </div>
      <div className='w-1/2 flex items-center justify-center overflow-hidden'>
        <img src="/pics/bg_shadow.png" className=' w-3/5 drop-design glowing-text img-shadow' alt="" />
      </div>
    </div>
  );
};

export default Welcome;