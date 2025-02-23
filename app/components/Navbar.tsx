import React, { Component } from 'react'
import { Link, NavLink } from 'react-router'

export class Navbar extends Component {
  render() {
    return (
      <header className='sticky w-full h-16 z-50  top-0 flex flex-row justify-between items-center px-4 nunito-font font-bold navbar-bg'>
        <div className=' w-1/3'></div>
        <div className=' w-1/3 text-center'>
          <h1 className='text-white text-3xl nunito-bold'>Weird marketplace</h1>
        </div>
        <div className='w-1/3 text-end'>
          <NavLink style={({isActive, isPending, isTransitioning}) => {return {fontWeight: isActive ? "bold" : "", scale: isActive ? 105 : 100}}} to="/" viewTransition className='text-white text-lg hover:cursor-pointer hover:scale-105 mx-3'>Home</NavLink>
          <NavLink style={({isActive, isPending, isTransitioning}) => {return {fontWeight: isActive ? "bold" : "", scale: isActive ? 105 : 100}}} to="/gallery" viewTransition className='text-white text-lg hover:cursor-pointer hover:scale-105 mx-3'>Gallery</NavLink>
        </div>
      </header>
    )
  }
}

export default Navbar