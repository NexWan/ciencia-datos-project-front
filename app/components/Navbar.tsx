import React, { Component } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

function Navbar() {
    const location = useLocation();
    React.useEffect(() => console.log(location.pathname), [location]);
    return (
      <header className={`${location.pathname == '/' ? 'sticky' : 'relative'} w-full h-16 z-50  top-0 flex flex-row justify-between items-center px-4 nunito-font font-bold navbar-bg`}>
        <div className=' md:w-1/3 hidden md:flex'></div>
        <div className=' 1/2 md:w-1/3 text-center'>
          <h1 className='text-white text-lg md:text-3xl nunito-bold'>Weird marketplace</h1>
        </div>
        <div className='w-1/3 text-end'>
          <NavLink style={({isActive, isPending, isTransitioning}) => {return {fontWeight: isActive ? "bold" : "", scale: isActive ? 105 : 100}}} to="/" viewTransition className='text-white text-md md:text-lg hover:cursor-pointer hover:scale-105 mx-3'>Home</NavLink>
          <NavLink style={({isActive, isPending, isTransitioning}) => {return {fontWeight: isActive ? "bold" : "", scale: isActive ? 105 : 100}}} to="/gallery" viewTransition className='text-white text-md md:text-lg hover:cursor-pointer hover:scale-105 mx-3'>Gallery</NavLink>
        </div>
      </header>
    )
  }


export default Navbar